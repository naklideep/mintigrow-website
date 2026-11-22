const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
document.documentElement.classList.add('js');
/* Programmatic scrolling goes through scroll-fx.js (Lenis) when available, otherwise the original native behaviour. */
const mgTo=(t,o)=>window.mgScroll?window.mgScroll.to(t,o):(typeof t==='number'?scrollTo({top:t,behavior:(o&&o.immediate)||RM?'auto':'smooth'}):t.scrollIntoView({behavior:RM?'auto':'smooth'}));
const S=[
["AI Videos","Scripted, generated and edited with AI, finished by people.",["Concept and script","AI-generated footage and voice","Edit, captions and delivery"]],
["AI Automation Systems","Workflows that take repetitive work off your team.",["Process mapping","Automations and AI agents","Monitoring and handover"]],
["Website Development","Fast, considered sites built to be found and to convert.",["Design and build","CMS and integrations","Performance and launch"]],
["App Development","Mobile and web apps from first screen to store release.",["Product scoping","iOS, Android and web builds","Release and iteration"]],
["Software Development","Custom software shaped around how your business runs.",["Architecture and planning","Engineering and testing","Deployment and support"]],
["Performance Marketing","Paid campaigns measured against revenue, not clicks.",["Channel strategy","Creative and landing pages","Tracking and optimisation"]],
["Branding","A name, a voice and a look people can recognise.",["Positioning and naming","Visual identity","Guidelines and rollout"]],
["Influencer Marketing","Creators who fit your audience, briefed and managed end to end.",["Creator sourcing","Briefs and content approval","Campaign reporting"]],
["Google Ads","Search, Shopping and YouTube campaigns, tuned continuously.",["Account audit and structure","Campaign build","Ongoing bidding and testing"]],
["SEO / AEO / GEO","Visibility in search engines and in AI-generated answers.",["Technical and content audit","Answer-engine optimisation","Authority and reporting"]],
["Brand Kit","Everything your team needs to stay consistent.",["Logo suite and colour","Type and templates","Usage guide"]],
["Business Development","Pipelines, partnerships and outreach that open doors.",["Market and offer review","Outreach systems","Pipeline tracking"]]
].map((s,i)=>({n:String(i+1).padStart(2,'0'),t:s[0],d:s[1],b:s[2],id:'s-'+s[0].toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,'')}));
const P=[["Free audit","We analyse your digital presence and find the exact gaps."],["Custom strategy","A plan built around your goals, budget and audience in Surat."],["Execution","Content, ads, SEO and GMB — one integrated system."],["Report & scale","Monthly numbers; double down on what works."]];
const SP=[["Discover","We learn the brand, the audience and the numbers before proposing anything."],["Strategize","We choose the channels, the message and the order of work."],["Create","Design, film, code and copy are produced and reviewed with you."],["Grow","We launch, measure and keep improving what works."]];
const C=[
{id:'c-ai-films',n:'01',t:'AI Films & Creative',d:'Films, campaigns and creator content, made with AI and finished by people.',s:['AI Videos','Influencer Marketing']},
{id:'c-digital-experiences',n:'02',t:'Digital Experiences',d:'Websites, apps and software designed to be used, not just launched.',s:['Website Development','App Development','Software Development']},
{id:'c-brand-identity',n:'03',t:'Brand Identity',d:'The name, look and voice that make you recognisable.',s:['Branding','Brand Kit']},
{id:'c-growth-performance',n:'04',t:'Growth & Performance',d:'Paid, search and outreach, measured against revenue.',s:['Performance Marketing','Google Ads','SEO / AEO / GEO','Business Development']},
{id:'c-ai-automation',n:'05',t:'AI & Automation',d:'Systems that take repetitive work off your team.',s:['AI Automation Systems']}];
const sv=['<circle cx="50" cy="50" r="12" class="hl" fill="currentColor"/><circle cx="50" cy="50" r="26"/><circle cx="50" cy="50" r="40"/>','<path d="M10 30h80M10 50h80M10 70h80M30 10v80M50 10v80M70 10v80"/><path class="hl" d="M30 70L50 50L70 30" stroke-width="2"/>','<rect x="14" y="56" width="20" height="30"/><rect x="40" y="38" width="20" height="48"/><rect x="66" y="20" width="20" height="66" class="hl"/>','<path class="hl" d="M10 84C30 80 38 60 52 52S78 30 90 14" stroke-width="2"/><path d="M10 90h80M10 90V10"/>'];
const svg=(v,vb='0 0 100 100')=>`<svg viewBox="${vb}" fill="none" stroke="currentColor" stroke-width="1.2"><g>${v}</g></svg>`;
const pvs=[
'<g class="a1">'+[0,48,96,144,192,240].map(x=>`<rect x="${x}" y="45" width="40" height="60" rx="4"/>`).join('')+'</g><rect class="hl" x="76" y="38" width="48" height="74" rx="6" stroke-width="2"/><circle class="hl" cx="100" cy="75" r="5" fill="currentColor" stroke="none"/>',
'<rect class="a2" x="50" y="22" width="110" height="74" rx="8"/><rect class="a2" x="40" y="42" width="110" height="74" rx="8"/><rect class="a2 hl" x="30" y="62" width="110" height="74" rx="8" stroke-width="2"/><circle class="a2c hl" cx="80" cy="95" r="4" fill="currentColor" stroke="none"/>',
'<circle class="a3c" cx="100" cy="75" r="56" stroke-dasharray="2 7"/><rect class="a3" x="70" y="45" width="60" height="60" rx="10"/><circle class="a3b hl" cx="100" cy="75" r="20" stroke-width="2"/>',
'<path d="M20 125H190M20 125V20"/><path class="a4 hl" pathLength="100" d="M20 115C50 110 60 85 90 80S130 60 150 40 175 28 190 22" stroke-width="2.4"/>',
'<path class="a5l" d="M40 40L100 75L160 40M100 75V125M40 110L100 75L160 110"/><circle class="a5n" cx="40" cy="40" r="8"/><circle class="a5n" cx="160" cy="40" r="8"/><circle class="a5n" cx="40" cy="110" r="8"/><circle class="a5n" cx="160" cy="110" r="8"/><circle class="a5n" cx="100" cy="125" r="8"/><circle class="a5n hl" cx="100" cy="75" r="13" stroke-width="2"/>'];
$('#rows').innerHTML=C.map((c,i)=>`<a class="fr rv" href="#${c.id}" aria-label="Explore ${c.t}"><span class="no" aria-hidden="true">${c.n}</span><div class="m"><b>${c.n}</b><span>/ 05</span></div><h3>${c.t}</h3><div class="d"><div><p>${c.d}</p><div class="chips">${c.s.map(x=>`<span>${x}</span>`).join('')}</div></div><span class="go fgo" aria-hidden="true"><span class="ar">→</span></span></div></a>`).join('');
$('#pvw').insertAdjacentHTML('afterbegin',pvs.map(v=>`<div class="pv">${svg(v,'0 0 200 150')}</div>`).join(''));
if($('#service-directory')) $('#service-directory').innerHTML=S.map(x=>`<a class="row" href="services/${x.id.replace(/^s-/ , '')}.html"><span class="n">${x.n}</span><h3>${x.t}</h3><p>${x.d}</p><span class="go" aria-hidden="true"><span class="ar">→</span></span></a>`).join('');
{const fr=[...document.querySelectorAll('.fr')],pv=[...document.querySelectorAll('.pv')];
const on=i=>{fr.forEach((e,k)=>e.classList.toggle('on',k===i));pv.forEach((e,k)=>e.classList.toggle('on',k===i));$('#pcap').textContent=C[i].n+' / '+C[i].t};
fr.forEach((e,i)=>{e.addEventListener('pointerenter',()=>on(i));e.addEventListener('focus',()=>on(i))});on(0)}
function allHTML(){return `<a class="back" href="#services"><span class="ar" style="transform:scaleX(-1)">→</span> Back</a><div class="lab" style="margin-top:50px">MintiGrow / All services</div><h1>All twelve services.</h1><p class="lead">Five disciplines, one team. Open any service to see what it includes.</p>`+C.map(c=>{const L=S.filter(x=>c.s.includes(x.t));return `<div class="ag" id="g-${c.id}"><div class="agh"><span class="lab">${c.n}</span><h2>${c.t}</h2></div><div class="list">${L.map(s=>`<a class="row" href="services/${s.id.replace(/^s-/ , '')}.html" aria-label="Explore ${s.t}"><span class="n">${s.n}</span><h3>${s.t}</h3><p>${s.d}</p><span class="go" aria-hidden="true"><span class="ar">→</span></span></a>`).join('')}</div></div>`}).join('')}

/* marquee */
const names=['Google Ads','Meta','YouTube','Shopify','WordPress','OpenAI','Zapier','Google Analytics'];
$('#trk').innerHTML=[...names,...names].map(n=>`<span>${n}</span>`).join('');

let mx=0,sp=1,tg=1;const trk=$('#trk');
trk.parentElement.addEventListener('pointerenter',()=>tg=.2);trk.parentElement.addEventListener('pointerleave',()=>tg=1);
if(!RM)(function f(){sp+=(tg-sp)*.06;mx-=sp*.7;const h=trk.scrollWidth/2;if(-mx>=h)mx+=h;trk.style.transform=`translate3d(${mx}px,0,0)`;requestAnimationFrame(f)})();
/* shader */
(function(){const c=$('#bg'),gl=c.getContext('webgl',{antialias:false,alpha:false});if(!gl){$('#hero').classList.add('nogl');c.remove();return}
const vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const fs=`precision highp float;uniform float t;uniform vec2 r;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y)*1.5;float k=t*.05;
vec2 q=vec2(fbm(p+vec2(0.,k)),fbm(p+vec2(5.2,1.3)-k));
vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+k*1.3),fbm(p+3.*q+vec2(8.3,2.8)-k*.9));
float f=fbm(p+2.5*w);
vec3 c=vec3(.02,.03,.03);
c=mix(c,vec3(.02,.12,.14),smoothstep(.3,.7,f)*.95);
c=mix(c,vec3(.05,.34,.32),smoothstep(.35,.85,q.x)*smoothstep(.4,.7,f)*.8);
c=mix(c,vec3(.12,.55,.48),smoothstep(.55,.95,w.y)*smoothstep(.5,.75,f)*.7);
float r2=smoothstep(.62,.8,f)*smoothstep(.45,.85,w.x);
c+=vec3(.28,.78,.69)*pow(r2,2.)*.55;
c*=.45+.75*smoothstep(.0,.8,1.-length(gl_FragCoord.xy/r-.5)*.8);
gl_FragColor=vec4(c,1.);}`;
function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){$('#hero').classList.add('nogl');c.remove();return}
gl.useProgram(pr);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const a=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
const ut=gl.getUniformLocation(pr,'t'),ur=gl.getUniformLocation(pr,'r');let vis=true;
const sc=Math.min(devicePixelRatio,1)*(innerWidth<700?.5:.6);
function rs(){c.width=c.clientWidth*sc;c.height=c.clientHeight*sc;gl.viewport(0,0,c.width,c.height)}rs();addEventListener('resize',rs);
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(c);
const t0=performance.now()+4000;function draw(){gl.uniform1f(ut,(performance.now()-t0)/1000);gl.uniform2f(ur,c.width,c.height);gl.drawArrays(gl.TRIANGLES,0,3)}
if(RM){draw();return}(function f(){if(vis&&!document.hidden)draw();requestAnimationFrame(f)})()})();
/* Services hero shader: original newer-version animation, isolated from Home. */
/* shader */
(function(){const c=$('#service-bg'),gl=c.getContext('webgl',{antialias:false,alpha:false});if(!gl){$('#service-hero').classList.add('nogl');c.remove();return}
const vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const fs=`precision highp float;uniform float t;uniform vec2 r;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){vec2 p=(gl_FragCoord.xy-.5*r)/min(r.x,r.y)*1.5;float k=t*.05;
vec2 q=vec2(fbm(p+vec2(0.,k)),fbm(p+vec2(5.2,1.3)-k));
vec2 w=vec2(fbm(p+3.*q+vec2(1.7,9.2)+k*1.3),fbm(p+3.*q+vec2(8.3,2.8)-k*.9));
float f=fbm(p+2.5*w);
vec3 c=vec3(.02,.03,.03);
c=mix(c,vec3(.02,.12,.14),smoothstep(.3,.7,f)*.95);
c=mix(c,vec3(.05,.34,.32),smoothstep(.35,.85,q.x)*smoothstep(.4,.7,f)*.8);
c=mix(c,vec3(.12,.55,.48),smoothstep(.55,.95,w.y)*smoothstep(.5,.75,f)*.7);
float r2=smoothstep(.62,.8,f)*smoothstep(.45,.85,w.x);
c+=vec3(.28,.78,.69)*pow(r2,2.)*.55;
c*=.45+.75*smoothstep(.0,.8,1.-length(gl_FragCoord.xy/r-.5)*.8);
gl_FragColor=vec4(c,1.);}`;
function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return o}
const pr=gl.createProgram();gl.attachShader(pr,sh(gl.VERTEX_SHADER,vs));gl.attachShader(pr,sh(gl.FRAGMENT_SHADER,fs));gl.linkProgram(pr);
if(!gl.getProgramParameter(pr,gl.LINK_STATUS)){$('#service-hero').classList.add('nogl');c.remove();return}
gl.useProgram(pr);const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const a=gl.getAttribLocation(pr,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
const ut=gl.getUniformLocation(pr,'t'),ur=gl.getUniformLocation(pr,'r');let vis=true;
const sc=Math.min(devicePixelRatio,1)*(innerWidth<700?.5:.6);
function rs(){c.width=c.clientWidth*sc;c.height=c.clientHeight*sc;gl.viewport(0,0,c.width,c.height)}rs();addEventListener('resize',rs);
new IntersectionObserver(e=>vis=e[0].isIntersecting).observe(c);
const t0=performance.now()+4000;function draw(){gl.uniform1f(ut,(performance.now()-t0)/1000);gl.uniform2f(ur,c.width,c.height);gl.drawArrays(gl.TRIANGLES,0,3)}
if(RM){draw();return}(function f(){if(vis&&!document.hidden)draw();requestAnimationFrame(f)})()})();
/* starfield */
(function(){const c=$('#stars'),x=c.getContext('2d'),col=getComputedStyle(document.documentElement).getPropertyValue('--paper').trim();let st=[],W,H;
function rs(){W=c.width=c.clientWidth;H=c.height=c.clientHeight;st=Array.from({length:Math.round(W*H/9000)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.2+.2,s:Math.random()*.12+.02,p:Math.random()*6}))}rs();addEventListener('resize',rs);
function d(t){x.clearRect(0,0,W,H);x.fillStyle=col;for(const s of st){s.y-=RM?0:s.s;if(s.y<0)s.y=H;x.globalAlpha=.25+.55*Math.abs(Math.sin(t/1800+s.p));x.beginPath();x.arc(s.x,s.y,s.r,0,6.3);x.fill()}if(!RM)requestAnimationFrame(d)}requestAnimationFrame(d)})();
/* hero reveal */
const h1=$('#h1');
if(!RM){const tl=gsap.timeline({delay:.2,defaults:{ease:'power3.out'}});
tl.to('.hero-stamp',{opacity:1,y:0,duration:.65}).fromTo('#h1',{opacity:0,y:34,rotateX:8},{opacity:1,y:0,rotateX:0,duration:1.05},'-=.25').fromTo('.hero p',{opacity:0,y:18},{opacity:1,y:0,duration:.75},'-=.45').fromTo('.acts',{opacity:0,y:12},{opacity:1,y:0,duration:.65},'-=.35');
}else{document.querySelectorAll('.hero-stamp,.hero h1,.hero p,.hero .acts').forEach(e=>{e.style.opacity=1;e.style.transform='none'})}
/* Services hero reveal: isolated copy of the original service-page entrance. */
(function(){const h=$('#service-h1');if(!h)return;const txt=h.textContent;h.setAttribute('aria-label',txt);h.innerHTML=txt.split(' ').map(w=>`<span class="w" aria-hidden="true">${[...w].map(c=>`<span class="ch">${c}</span>`).join('')}</span>`).join(' ');if(!RM){gsap.set('#service-hero .ch',{y:22});gsap.set('#service-hero p',{y:14});const tl=gsap.timeline({delay:.25,defaults:{ease:'power3.out'}});tl.to('#service-hero .lab',{opacity:1,duration:.7}).to('#service-hero .ch',{opacity:1,y:0,duration:.9,stagger:.022},'-.3').to('#service-hero p',{opacity:1,y:0,duration:.8},'-.4').to('#service-hero .acts',{opacity:1,duration:.7},'-.4')}else{document.querySelectorAll('#service-hero .lab,#service-hero .ch,#service-hero p,#service-hero .acts').forEach(e=>{e.style.opacity=1;e.style.transform='none'})}})();

/* Services process: original newer-version pinned, scrubbed timeline. */
gsap.registerPlugin(ScrollTrigger);
const deskQ=matchMedia('(min-width:861px) and (prefers-reduced-motion: no-preference)');let ctx;
function bind(){ctx&&ctx.revert();ctx=gsap.context(()=>{
if(!RM)ScrollTrigger.batch('.page-view.active .rv',{start:'top 90%',once:true,onEnter:e=>gsap.to(e,{opacity:1,y:0,duration:.9,stagger:.07,ease:'power3.out'})});
});}
document.fonts&&document.fonts.ready.then(()=>ScrollTrigger.refresh());
deskQ.addEventListener('change',()=>{if($('#services-page').classList.contains('active'))bind()});
addEventListener('scroll',()=>$('#nav').classList.toggle('solid',scrollY>40),{passive:true});
/* nav + menu */
const go=id=>{mgTo($('#'+id),{offset:-90});document.body.classList.remove('menu-open')};
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){e.preventDefault();if(location.hash&&location.hash!=='#services'&&location.hash!==''){location.hash='services';setTimeout(()=>go(g.dataset.go),500)}else go(g.dataset.go)}});
$('#burger').onclick=()=>{const o=document.body.classList.toggle('menu-open');$('#burger').setAttribute('aria-expanded',o)};
/* Page routing: Home, About, Services, Work and Contact are separate views. */
let first=true;
const pageMap={home:'home',about:'about-page',services:'services-page',work:'work-page',contact:'contact-page'};
function route(){
 const id=location.hash.slice(1)||'home';
 const service=S.find(x=>x.id===id);
 const category=C.find(x=>x.id===id);
 const isAll=id==='all'||!!category;
 const isDetail=!!service||isAll;
 const veil=$('#veil');
 const apply=()=>{
  document.body.classList.remove('menu-open');
  const views=[...document.querySelectorAll('.page-view')];
  views.forEach(v=>v.classList.remove('active'));
  $('#detail').style.display='none';
  $('#allv').style.display='none';
  if(isDetail){
   views.forEach(v=>v.classList.remove('active'));
   if(service){
    ctx&&ctx.revert();ctx=null;
    $('#detail').style.display='block';
    const i=S.indexOf(service),next=S[(i+1)%S.length];
    $('#dt').innerHTML=`<a class="back" href="#services"><span class="ar" style="transform:scaleX(-1)">→</span> All services</a><div class="lab" style="margin-top:50px">${service.n} / ${S.length}</div><h1>${service.t}</h1><p class="lead">${service.d}</p><div class="dl">${service.b.map((b,k)=>`<div><span class="n">0${k+1}</span><span>${b}</span></div>`).join('')}</div><a class="pill" href="#contact">Start a project <span class="ar">→</span></a> <a class="ghost" href="#${next.id}">Next: ${next.t} <span class="ar">→</span></a>`;
    document.title=service.t+' — MintiGrow';
   }else{
    ctx&&ctx.revert();ctx=null;
    $('#allv').style.display='block';$('#av').innerHTML=allHTML();
    document.title='All services — MintiGrow';
    if(category){requestAnimationFrame(()=>{const g=$('#g-'+category.id);g&&mgTo(g,{offset:-90})});}
   }
  }else{
   const target=pageMap[id]||'home';
   const view=document.getElementById(target);
   (view||$('#home')).classList.add('active');
   document.title=(id.charAt(0).toUpperCase()+id.slice(1))+' — MintiGrow';
   if(target==='home'||target==='about-page'||target==='services-page'||target==='work-page'||target==='contact-page'){
    bind();
   }else if(ctx){ctx.revert();ctx=null;}
   if(!first)mgTo(0);
  }
  document.querySelectorAll('.links a.l,.sheet a.l').forEach(a=>{
   const key=(a.getAttribute('href')||'').slice(1);
   a.classList.toggle('on',key===(isDetail?'services':id));
  });
  $('#burger').setAttribute('aria-expanded','false');
  veil.classList.remove('on');
  if(isDetail&&!category)mgTo(0,{immediate:true});
  requestAnimationFrame(()=>{dispatchEvent(new Event('resize'));ScrollTrigger.refresh();dispatchEvent(new CustomEvent('mg:route',{detail:{id}}))});
  if(id==='services')playServiceHero();
  first=false;
 };
 if(first||RM){apply();}else{veil.classList.add('on');setTimeout(apply,260);}
}
addEventListener('hashchange',route);route();
/* audit form: opens WhatsApp with the submitted details */
$('#auditForm')?.addEventListener('submit',e=>{e.preventDefault();const f=new FormData(e.currentTarget);const msg=['Hello MintiGrow! I would like to book a free audit.','Name: '+f.get('name'),'Phone: '+f.get('phone'),'Business: '+(f.get('business')||'Not provided'),'Business type: '+(f.get('type')||'Not provided'),'Help needed: '+(f.get('help')||'Not provided')].join('\n');window.open('https://wa.me/91XXXXXXXXXX?text='+encodeURIComponent(msg),'_blank','noopener');});


/* MintiGrow interactions: pointer ambience, magnetic CTAs, counters and active navigation */
const yearNode=$('#yearNow');if(yearNode)yearNode.textContent=new Date().getFullYear();
const progressBar=$('#scrollProgress');
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progressBar.style.width=(max>0?(scrollY/max)*100:0)+'%'}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
const hero=$('#hero');
if(hero&&!RM&&matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hero.style.setProperty('--mx',((e.clientX-r.left)/r.width*100)+'%');hero.style.setProperty('--my',((e.clientY-r.top)/r.height*100)+'%')});}
document.querySelectorAll('.magnetic').forEach(el=>{if(RM||!matchMedia('(pointer:fine)').matches)return;el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;el.style.transform=`translate(${x*.09}px,${y*.12}px)`});el.addEventListener('pointerleave',()=>el.style.transform='')});
const navLinks=[...document.querySelectorAll('.links a.l[href^="#"]')];
const observed=['home','about','services','work','contact'].map(id=>document.getElementById(id)).filter(Boolean);
if('IntersectionObserver' in window){const navObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+entry.target.id))}})},{rootMargin:'-35% 0px -55% 0px'});observed.forEach(el=>navObserver.observe(el));}
/* Reveal elements gently; keep all content visible when motion is reduced. */
if(!RM&&'IntersectionObserver' in window){const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.content-section,.feature,.why-card,.case,.quote,.fr').forEach(el=>{el.classList.add('reveal-ready');revealObserver.observe(el)})}

/* Services page fixes */
$('#proc-grid').innerHTML=SP.map((s,i)=>`<div class="proc-step"><span class="big">0${i+1}</span><div><h3>${s[0]}</h3><p>${s[1]}</p></div></div>`).join('');
function playServiceHero(){if(RM)return;
 gsap.fromTo('#service-hero .lab,#service-hero p,#service-hero .acts',{opacity:0,y:14},{opacity:1,y:0,duration:.7,stagger:.12,delay:.15,ease:'power3.out'});
 gsap.fromTo('#service-hero .ch',{opacity:0,y:22},{opacity:1,y:0,duration:.9,stagger:.022,ease:'power3.out'})}
