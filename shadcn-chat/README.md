# FlyteAI Frontend

A modern, responsive chat interface built with Next.js and Shadcn/UI, featuring a beautiful design and seamless integration with the FlyteAI backend.

## Features

- 💬 Real-time chat interface
- 🌓 Dark/light mode support
- 🎨 Modern UI with Shadcn components
- 📱 Fully responsive design
- 🔄 Session persistence
- ✈️ Flight search and booking interface

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend service running (see backend README)

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Create a `.env.local` file:
   ```
   NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
   ```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
shadcn-chat/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Shadcn UI components
│   ├── chat-demo.tsx  # Main chat component
│   └── mode-toggle.tsx # Theme switcher
├── lib/               # Utility functions
├── public/            # Static assets
└── styles/           # Global styles
```

## Key Components

### ChatDemo
The main chat interface component that handles:
- Message display
- User input
- Flight search results
- Booking confirmations

### ModeToggle
Theme switcher component for dark/light mode.

## Environment Variables

- `NEXT_PUBLIC_BACKEND_URL`: URL of the backend service
  - Development: `http://localhost:8000`
  - Production: `http://your-ec2-ip:8000`

## Building for Production

1. Build the application:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm run start
   # or
   yarn start
   ```

## Deployment

### AWS Amplify
1. Connect your repository to AWS Amplify
2. Set environment variables:
   - `NEXT_PUBLIC_BACKEND_URL=http://your-ec2-ip:8000`
3. Deploy

### Vercel
1. Push to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Components**: Shadcn/UI
- **State Management**: React Hooks
- **Deployment**: AWS Amplify/Vercel

---

# Nginx & SSL (Certbot) Setup Guide

## Table of Contents
1. [Overview](#overview)
2. [DNS Setup](#dns-setup)
3. [Nginx Configuration](#nginx-configuration)
4. [SSL with Certbot](#ssl-with-certbot)
5. [CORS Configuration](#cors-configuration)
6. [Testing & Troubleshooting](#testing--troubleshooting)
7. [Best Practices](#best-practices)

## Overview
This section explains how to set up Nginx as a reverse proxy for your FastAPI backend, secure it with SSL using Certbot, and configure CORS for frontend-backend communication.

## DNS Setup
- **flyteai.io** and **www.flyteai.io**: Point to your frontend (e.g., Amplify/CloudFront)
- **api.flyteai.io**: A record to your EC2 server's public IP

| Type  | Host | Value/Answer                | TTL  |
|-------|------|-----------------------------|------|
| ALIAS | @    | amplify/cloudfront domain   | 600  |
| CNAME | www  | amplify/cloudfront domain   | 600  |
| A     | api  | <your-ec2-ip>               | 600  |

## Nginx Configuration
Create `/etc/nginx/sites-available/flyteai.io`:
```nginx
server {
    listen 80;
    server_name flyteai.io www.flyteai.io api.flyteai.io;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name api.flyteai.io;
    ssl_certificate /etc/letsencrypt/live/flyteai.io/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/flyteai.io/privkey.pem;

    location = /api/chat {
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' "$http_origin" always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' 'Authorization,Content-Type,Accept,Origin,User-Agent,DNT,Cache-Control,X-Mx-ReqToken,Keep-Alive,X-Requested-With,If-Modified-Since' always;
            add_header 'Access-Control-Max-Age' 1728000 always;
            add_header 'Content-Length' 0;
            add_header 'Content-Type' 'text/plain charset=UTF-8';
            return 204;
        }
        proxy_pass http://localhost:8000/api/chat;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
Symlink and reload:
```bash
sudo ln -sf /etc/nginx/sites-available/flyteai.io /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## SSL with Certbot
Install and run:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d flyteai.io -d www.flyteai.io -d api.flyteai.io --expand --non-interactive --agree-tos --email <your-email>
```
This will update your SSL cert to cover all domains.

## CORS Configuration
In your FastAPI backend, ensure you allow all relevant origins:
```python
origins = [
    "http://localhost:3000",
    "https://flyteai.io",
    "https://www.flyteai.io",
    "https://api.flyteai.io",
    "https://nginx.d1yc7deoyc9s4f.amplifyapp.com",  # your Amplify branch
]
```

## Testing & Troubleshooting
- Test with curl:
  ```bash
  curl -i -X OPTIONS https://api.flyteai.io/api/chat \
    -H "Origin: https://nginx.d1yc7deoyc9s4f.amplifyapp.com" \
    -H "Access-Control-Request-Method: POST"
  ```
  You should see `HTTP/1.1 204 No Content` and CORS headers.
- If you get nginx errors, check `/etc/nginx/sites-available/flyteai.io` for typos and run `sudo nginx -t`.
- If Certbot overwrites your config, re-apply your nginx config and reload.

## Best Practices
- Always back up your nginx config before making changes.
- Use `--webroot` with Certbot if you want to avoid config overwrites.
- Add new subdomains to both DNS and your SSL cert as needed.
- Keep your CORS origins list up to date with all frontend domains.
