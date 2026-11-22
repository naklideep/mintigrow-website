# MintiGrow — video & poster assets needed

Drop these files into the folders shown (paths are relative to the project root, next to `index.html`). Nothing else needs editing — the pages already point at these exact names. Until a file exists, its slot shows a labelled dashed placeholder; the page never breaks.

Per service you need **3 videos + 1 poster**:

| File | Used for | Recommended spec |
|---|---|---|
| `assets/videos/<service>.mp4` | Full-screen hero background **and** the intro video card **and** sample 3 ("featured") — one file, three uses | 16:9, 1920×1080, MP4 H.264, 8–15 s seamless loop, **no audio**, under ~8 MB |
| `assets/videos/<service>-sample-1.mp4` | Work-sample reel 1 | 9:16, 1080×1920, MP4 H.264, under ~12 MB (audio allowed — plays only when the visitor presses play) |
| `assets/videos/<service>-sample-2.mp4` | Work-sample reel 2 | same as above |
| `assets/images/<service>-poster.jpg` | Frame shown before the hero video loads / when motion is reduced | 1920×1080 JPG, under ~250 KB (export a good frame from the hero video) |

Tip: encode with `ffmpeg -i in.mov -c:v libx264 -crf 24 -preset slow -movflags +faststart -an out.mp4` (drop `-an` for sample reels) so playback starts before the download finishes.

## Exact filenames, per service

### ai-automation-systems
*Footage brief: Automation workflows, connected systems, AI interfaces*

- `assets/videos/ai-automation-systems-sample-1.mp4`
- `assets/videos/ai-automation-systems-sample-2.mp4`
- `assets/videos/ai-automation-systems.mp4`
- `assets/images/ai-automation-systems-poster.jpg`

### ai-videos
*Footage brief: AI-generated visuals, cinematic video creation, creative production*

- `assets/videos/ai-videos-sample-1.mp4`
- `assets/videos/ai-videos-sample-2.mp4`
- `assets/videos/ai-videos.mp4`
- `assets/images/ai-videos-poster.jpg`

### app-development
*Footage brief: Mobile applications and app interactions*

- `assets/videos/app-development-sample-1.mp4`
- `assets/videos/app-development-sample-2.mp4`
- `assets/videos/app-development.mp4`
- `assets/images/app-development-poster.jpg`

### brand-kit
*Footage brief: Brand guidelines, typography, logos, visual assets*

- `assets/videos/brand-kit-sample-1.mp4`
- `assets/videos/brand-kit-sample-2.mp4`
- `assets/videos/brand-kit.mp4`
- `assets/images/brand-kit-poster.jpg`

### branding
*Footage brief: Visual identity, brand systems, creative direction*

- `assets/videos/branding-sample-1.mp4`
- `assets/videos/branding-sample-2.mp4`
- `assets/videos/branding.mp4`
- `assets/images/branding-poster.jpg`

### business-development
*Footage brief: Business meetings, strategy, growth*

- `assets/videos/business-development-sample-1.mp4`
- `assets/videos/business-development-sample-2.mp4`
- `assets/videos/business-development.mp4`
- `assets/images/business-development-poster.jpg`

### google-ads
*Footage brief: Search advertising, campaign dashboards, analytics*

- `assets/videos/google-ads-sample-1.mp4`
- `assets/videos/google-ads-sample-2.mp4`
- `assets/videos/google-ads.mp4`
- `assets/images/google-ads-poster.jpg`

### influencer-marketing
*Footage brief: Content creators, social media, collaborations*

- `assets/videos/influencer-marketing-sample-1.mp4`
- `assets/videos/influencer-marketing-sample-2.mp4`
- `assets/videos/influencer-marketing.mp4`
- `assets/images/influencer-marketing-poster.jpg`

### performance-marketing
*Footage brief: Campaign dashboards, advertising, analytics*

- `assets/videos/performance-marketing-sample-1.mp4`
- `assets/videos/performance-marketing-sample-2.mp4`
- `assets/videos/performance-marketing.mp4`
- `assets/images/performance-marketing-poster.jpg`

### seo-aeo-geo
*Footage brief: Search engines, rankings, discovery, digital visibility*

- `assets/videos/seo-aeo-geo-sample-1.mp4`
- `assets/videos/seo-aeo-geo-sample-2.mp4`
- `assets/videos/seo-aeo-geo.mp4`
- `assets/images/seo-aeo-geo-poster.jpg`

### software-development
*Footage brief: Software interfaces, development, technology*

- `assets/videos/software-development-sample-1.mp4`
- `assets/videos/software-development-sample-2.mp4`
- `assets/videos/software-development.mp4`
- `assets/images/software-development-poster.jpg`

### website-development
*Footage brief: Website interfaces, coding environments, digital experiences*

- `assets/videos/website-development-sample-1.mp4`
- `assets/videos/website-development-sample-2.mp4`
- `assets/videos/website-development.mp4`
- `assets/images/website-development-poster.jpg`

## Hiding the placeholder labels at launch
In `js/service-page.js` set `const SHOW_SLOT_LABELS=false;` — any slot still empty then shows only a neutral dashed frame with no file-name text.
