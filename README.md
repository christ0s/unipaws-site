# UniPaws Static Landing Website

Modern, responsive static website for the UniPaws mobile application.

## 📁 Structure

```
unipaws-website/
├── index.html          # Landing page
├── about.html          # About Us page
├── privacy.html        # Privacy Policy (GDPR compliant)
├── terms.html          # Terms of Service
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript interactions
├── images/
│   └── README.md       # Image guidelines
├── _redirects          # Cloudflare Pages redirects
├── _headers            # Cloudflare Pages security headers
└── README.md           # This file
```

## 🎨 Design

- **Primary Color**: #F97316 (Orange)
- **Font**: Inter (Google Fonts)
- **Language**: Greek (el)
- **Style**: Modern, clean, mobile-first

## 🚀 Deployment to Cloudflare Pages

### Option 1: Git Integration

1. Push this folder to a GitHub/GitLab repository
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Click "Create a project" → "Connect to Git"
4. Select your repository
5. Configure build settings:
   - **Build command**: (leave empty for static site)
   - **Build output directory**: `/` or `./`
6. Deploy!

### Option 2: Direct Upload

1. Go to [Cloudflare Pages](https://pages.cloudflare.com)
2. Click "Create a project" → "Upload assets"
3. Drag and drop the `unipaws-website` folder
4. Name your project (e.g., `unipaws`)
5. Deploy!

### Custom Domain

1. After deployment, go to "Custom domains"
2. Add your domain (e.g., `unipaws.gr` or `www.unipaws.gr`)
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Cloudflare)

## 📝 Customization Checklist

Before going live, update the following:

### Content
- [ ] Update company information in footer
- [ ] Add real email addresses
- [ ] Update phone numbers
- [ ] Add actual app store links
- [ ] Replace placeholder stats with real numbers

### Images
- [ ] Add app screenshots
- [ ] Add team photos (optional)
- [ ] Add partner logos (optional)
- [ ] Create favicon.ico
- [ ] Create og-image.png for social sharing

### Legal
- [ ] Review and customize Privacy Policy
- [ ] Review and customize Terms of Service
- [ ] Add company registration details
- [ ] Update contact information

### SEO
- [ ] Update meta descriptions
- [ ] Add Google Analytics (optional)
- [ ] Submit sitemap to Google Search Console
- [ ] Verify Open Graph tags work correctly

## 🔧 Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## 📱 Pages Overview

### Landing Page (index.html)
- Hero section with app preview
- Key features grid
- How it works steps
- Statistics
- Testimonials
- Download CTA

### About Us (about.html)
- Mission statement
- Company story
- Core values
- Impact statistics
- Team section
- Partners

### Privacy Policy (privacy.html)
- GDPR compliant
- Table of contents
- User rights section
- Contact information

### Terms of Service (terms.html)
- Comprehensive terms
- Blood donation disclaimers
- Liability limitations
- Legal contact info

## 🌐 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- iOS Safari
- Chrome for Android

## 📄 License

© 2025 UniPaws. All rights reserved.
