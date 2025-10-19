# Kourosh Darvish - Personal Website

🌐 **Live Site**: https://kouroshd.github.io/

Professional academic website for Kourosh Darvish, Postdoctoral Researcher at University of Toronto and Vector Institute.

## Features

- ✨ Clean, professional design with terminal-inspired aesthetic
- 🌓 Dark/Light theme toggle (saved in browser)
- 📱 Fully responsive (mobile-friendly)
- ⚡ Fast loading (pure HTML/CSS/JS)
- 📰 Dynamic content from JSON files
- 🎬 Support for video/image media in publications

## Structure

```
kouroshd.github.io/
├── index.html              # Home page
├── about.html              # About/background
├── research.html           # Research overview
├── publications.html       # Publications (loads from JSON)
├── news.html              # News archive (loads from JSON)
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── main.js            # Theme toggle & utilities
├── data/
│   ├── news.json          # News data
│   └── publications.json  # Publications data
└── assets/
    └── img/
        └── kourosh_darvish_iit.jpg
```

## Quick Start

### Local Development
Simply open `index.html` in your browser. No build process needed!

### Updating Content

#### Add News
Edit `data/news.json`:
```json
{
  "date": "2024-10-18",
  "title": "Your news title",
  "description": "Brief description",
  "type": "publication",
  "link": "https://optional-link.com"
}
```

#### Add Publications
Edit `data/publications.json`:
```json
{
  "title": "Paper Title",
  "authors": "K. Darvish, et al.",
  "venue": "Conference/Journal Name",
  "year": "2024",
  "description": "Brief description",
  "pdf_link": "https://arxiv.org/paper.pdf",
  "doi_link": "https://doi.org/...",
  "project_page": "https://project-url.com",
  "media_link": "https://youtube.com/watch?v=...",
  "media_type": "video"
}
```

**Media types:**
- `"video"` - Shows thumbnail with play button (auto-extracts YouTube thumbnails)
- `"image"` - Shows image directly
- Leave empty `""` - No media

### Update from Phone
Use GitHub mobile app to edit JSON files directly!

## Customization

### Colors
Edit CSS variables in `css/style.css`:
```css
:root {
    --bg-primary: #0d1117;
    --accent: #58a6ff;
    /* ... */
}
```

### Content
- Update your Google Scholar ID, LinkedIn, etc. in HTML files
- Replace placeholder links with your actual profiles
- Add your photo to `assets/img/kourosh_darvish_iit.jpg`

## Technologies

- Pure HTML5
- CSS3 (CSS Variables, Flexbox, Grid)
- Vanilla JavaScript (ES6+)
- No frameworks or build tools required

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS/Android)

## Deployment

### GitHub Pages (Automatic)
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Site deploys automatically at `https://kouroshd.github.io/`

### Manual Deploy
Simply upload all files to any web hosting service.

## License

© 2024 Kourosh Darvish. All rights reserved.

## Contact

📧 kourosh.darvish@utoronto.ca  
🔗 [GitHub](https://github.com/kouroshD) | [LinkedIn](https://www.linkedin.com/in/kouroshdarvish)