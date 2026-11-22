document.documentElement.classList.add('js');
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Original behaviour (unchanged): menu, solid nav, scroll progress, year ── */
const burger=document.getElementById('burger');
if(burger){burger.addEventListener('click',()=>{const open=document.body.classList.toggle('menu-open');burger.setAttribute('aria-expanded',String(open));});}
document.querySelectorAll('#sheet a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('menu-open')));
const nav=document.getElementById('nav');
addEventListener('scroll',()=>nav?.classList.toggle('solid',scrollY>40),{passive:true});
const progress=document.getElementById('scrollProgress');
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;if(progress)progress.style.width=(max>0?scrollY/max*100:0)+'%';}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const year=document.getElementById('yearNow');if(year)year.textContent=new Date().getFullYear();

/* In-page anchors (e.g. "View sample work") glide through the smooth-scroll layer. */
document.addEventListener('click',e=>{
  const a=e.target.closest('a[href^="#"]');if(!a||!window.mgScroll)return;
  const t=a.getAttribute('href').length>1&&document.getElementById(a.getAttribute('href').slice(1));
  if(!t)return;e.preventDefault();window.mgScroll.to(t,{offset:-90});
});

/* ── Per-service video briefs (what footage each slot should show) ── */
const slug=(location.pathname.split('/').pop()||'').replace(/\.html$/,'');
const BRIEF={
 'ai-videos':'AI-generated visuals, cinematic video creation, creative production',
 'ai-automation-systems':'Automation workflows, connected systems, AI interfaces',
 'website-development':'Website interfaces, coding environments, digital experiences',
 'app-development':'Mobile applications and app interactions',
 'software-development':'Software interfaces, development, technology',
 'performance-marketing':'Campaign dashboards, advertising, analytics',
 'branding':'Visual identity, brand systems, creative direction',
 'influencer-marketing':'Content creators, social media, collaborations',
 'google-ads':'Search advertising, campaign dashboards, analytics',
 'seo-aeo-geo':'Search engines, rankings, discovery, digital visibility',
 'brand-kit':'Brand guidelines, typography, logos, visual assets',
 'business-development':'Business meetings, strategy, growth'
};
const brief=BRIEF[slug]||'Footage relevant to this service';
/* Set to false at launch to hide the file-name hints; placeholders then show only a neutral dashed frame. */
const SHOW_SLOT_LABELS=true;

/* ── Videos: placeholders on failure, play only while visible, respect reduced-motion / data-saver ── */
const saveData=!!(navigator.connection&&navigator.connection.saveData);
const calm=reduceMotion||saveData;
const hero=document.querySelector('.service-hero');
const heroVideo=hero&&hero.querySelector('.service-video');
const fileOf=v=>((v.querySelector('source')||v).getAttribute('src')||'').replace(/^(\.\.\/)+/,'');

function fail(v){
  if(v._failed)return;v._failed=true;v.pause&&v.pause();
  const file=fileOf(v);
  if(v===heroVideo){
    v.remove();
    if(SHOW_SLOT_LABELS){
      const n=document.createElement('div');n.className='service-video-missing';n.setAttribute('role','note');
      n.innerHTML='<b>Hero video slot — file not added yet</b><code></code><small></small>';
      n.querySelector('code').textContent=file;
      n.querySelector('small').textContent=brief+' · 16:9, 1920×1080, MP4 (H.264), 8–15 s seamless loop, no audio, under 8 MB';
      hero.querySelector('.service-video-wrap').appendChild(n);
    }
    return;
  }
  const host=v.closest('.service-video-card')||v.closest('.service-sample');if(!host)return;
  const slot=document.createElement('div');slot.className='video-slot';slot.setAttribute('role','img');
  slot.setAttribute('aria-label','Video placeholder. Expected file: '+file);
  if(SHOW_SLOT_LABELS){
    const isHeroFile=file.split('/').pop()===slug+'.mp4';
    slot.innerHTML='<b>Video slot — file not added yet</b><code></code><small></small>';
    slot.querySelector('code').textContent=file;
    slot.querySelector('small').textContent=brief+(isHeroFile?' · same file as the hero video (shown cropped).':' · 9:16, 1080×1920, MP4 (H.264), under 12 MB.');
  }
  host.classList.add('has-slot');v.replaceWith(slot);
}
function watch(v){
  // Real failures arrive as `error` events. The state check is only a backstop for a 404 that landed before this script ran:
  // networkState is NO_SOURCE briefly at the *start* of resource selection too, so it is only trusted after load + a settle delay.
  v.addEventListener('error',()=>fail(v));
  v.querySelectorAll('source').forEach(s=>s.addEventListener('error',()=>fail(v)));
  addEventListener('load',()=>setTimeout(()=>{if(v.error||(v.networkState===3&&v.readyState===0))fail(v)},400));
}
document.querySelectorAll('video').forEach(watch);

if(heroVideo){
  heroVideo.classList.add('fx-wait');
  const show=()=>heroVideo.classList.remove('fx-wait');
  heroVideo.addEventListener('loadeddata',show,{once:true});heroVideo.addEventListener('playing',show,{once:true});
}
/* Autoplaying videos (hero + intro card): run only while on screen and tab visible; never fight a manual pause. */
const autos=[...document.querySelectorAll('.service-video,.service-video-card video')];
autos.forEach(v=>{
  if(calm){v.removeAttribute('autoplay');v.pause();return;}
  if(v!==heroVideo)v.pause(); // off-screen intro video should not decode until seen
  v.addEventListener('pause',()=>{if(!v._auto)v._user=true;v._auto=false});
  v.addEventListener('play',()=>{v._user=false});
});
function setPlay(v,on){if(v._failed||!v.isConnected)return;if(on){if(!v._user&&v.paused)v.play().catch(()=>{})}else if(!v.paused){v._auto=true;v.pause()}}
if(!calm&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{e.target._vis=e.isIntersecting;setPlay(e.target,e.isIntersecting&&!document.hidden)}),{threshold:.15});
  autos.forEach(v=>io.observe(v));
  document.addEventListener('visibilitychange',()=>autos.forEach(v=>setPlay(v,!!v._vis&&!document.hidden)));
}
/* Sample reels: one at a time, and stop when scrolled away. */
const samples=[...document.querySelectorAll('.service-sample video')];
samples.forEach(v=>v.addEventListener('play',()=>samples.forEach(o=>{if(o!==v&&!o.paused)o.pause()})));
if('IntersectionObserver' in window){const so=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting&&!e.target.paused)e.target.pause()}),{threshold:0});samples.forEach(v=>so.observe(v));}

/* ── Hero entrance: words pull into focus, then copy, then the footage settles ── */
function splitWords(el){
  el.setAttribute('aria-label',el.textContent.replace(/\s+/g,' ').trim());
  const words=[];
  (function walk(node){[...node.childNodes].forEach(n=>{
    if(n.nodeType===3){
      const f=document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part=>{
        if(!part)return;
        if(/^\s+$/.test(part))f.appendChild(document.createTextNode(part));
        else{const s=document.createElement('span');s.className='fx-w';s.setAttribute('aria-hidden','true');s.textContent=part;f.appendChild(s);words.push(s)}
      });
      n.replaceWith(f);
    }else if(n.nodeType===1)walk(n);
  })})(el);
  return words;
}
if(!reduceMotion&&window.gsap&&hero){
  const h1=hero.querySelector('h1'),words=h1?splitWords(h1):[];
  const lab=hero.querySelector('.lab'),p=hero.querySelector('p'),acts=hero.querySelector('.acts');
  gsap.set(lab,{opacity:0,y:14});
  gsap.set(words,{opacity:0,yPercent:55,filter:'blur(10px)'});
  gsap.set([p,acts],{opacity:0,y:22});
  gsap.timeline({delay:.2,defaults:{ease:'power3.out'}})
    .to(lab,{opacity:1,y:0,duration:.8})
    .to(words,{opacity:1,yPercent:0,filter:'blur(0px)',duration:1.15,stagger:.085},'-=.4')
    .to(p,{opacity:1,y:0,duration:.9},'-=.7')
    .to(acts,{opacity:1,y:0,duration:.8},'-=.65')
    .set(words,{clearProps:'filter,transform'});
  if(heroVideo)gsap.fromTo(heroVideo,{scale:1.14},{scale:1,duration:2.8,ease:'power2.out'});
}

/* ── Scroll scenes (run inside scroll-fx's single gsap.context, so they are cleaned up with it) ── */
if(window.MGFX&&window.gsap){
  MGFX.scene(h=>{
    const ST=window.ScrollTrigger;
    if(hero){
      const wrap=hero.querySelector('.service-video-wrap'),inn=hero.querySelector('.in');
      // Footage drifts slower than the page and melts into the dark next section.
      if(wrap)gsap.to(wrap,{yPercent:14,opacity:.2,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:true}});
      if(inn)gsap.to(inn,{y:-70,opacity:.1,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom 25%',scrub:.6}});
    }
    const card=document.querySelector('.service-video-card');
    if(card){
      const R='round 4px 22px 22px 22px';let shown=false;
      gsap.set(card,{opacity:0,clipPath:'inset(10% 7% 10% 7% '+R+')'});
      const play=()=>{if(shown)return;shown=true;gsap.to(card,{opacity:1,clipPath:'inset(0% 0% 0% 0% '+R+')',duration:1.3,ease:'power3.out',onComplete:()=>gsap.set(card,{clearProps:'clipPath'})})};
      ST.create({trigger:card,start:'top 86%',onEnter:play,onEnterBack:play});
      const v=card.querySelector('video');
      if(v)gsap.fromTo(v,{scale:1.2},{scale:1,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom 30%',scrub:true}});
      if(h.desk)h.parallax([card],18);
    }
    h.reveal(document.querySelectorAll('.service-deliverable'),{y:40,stagger:.12});
    const sm=[...document.querySelectorAll('.service-sample')];
    h.reveal(sm,{y:54,stagger:.14});
    if(h.desk&&sm.length===3){h.parallax([sm[0],sm[2]],14);h.parallax([sm[1]],38);}
  });
  MGFX.build();
}
