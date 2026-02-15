#!/bin/bash

# 🚀 Quick Netlify Deployment Script for Blogverse

echo "🌟 Blogverse - Netlify Deployment Script"
echo "=========================================="
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null
then
    echo "❌ Netlify CLI not found!"
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI is ready!"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Production API Configuration
VITE_API_URL=https://blog-web-app-production-6076.up.railway.app/api
EOF
    echo "✅ .env file created!"
else
    echo "✅ .env file already exists!"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔨 Building project..."
npm run build

echo ""
echo "🚀 Deploying to Netlify..."
echo ""
echo "Choose deployment type:"
echo "1) Deploy to production (permanent URL)"
echo "2) Deploy draft for testing (temporary URL)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo ""
        echo "🌐 Deploying to PRODUCTION..."
        netlify deploy --prod
        ;;
    2)
        echo ""
        echo "🧪 Deploying DRAFT..."
        netlify deploy
        ;;
    *)
        echo "❌ Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "✨ Deployment complete!"
echo ""
echo "⚠️  IMPORTANT: Update your backend CORS settings!"
echo "Add your Netlify URL to the allowed origins in your Railway backend."
echo ""
echo "📚 For detailed instructions, see NETLIFY-DEPLOY.md"
