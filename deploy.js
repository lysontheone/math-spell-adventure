// Deployment script for Math & Spell Adventure
// Run this script to prepare the project for deployment

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Preparing Math & Spell Adventure for deployment...');

// Create dist directory if it doesn't exist
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir);
    console.log('📁 Created dist directory');
}

// List of files to copy to dist
const filesToCopy = [
    'index.html',
    'spelling.html',
    'styles.css',
    'game.js',
    'spelling-fix.js',
    'gameModes.js',
    'gameEngine.js',
    'gameModeManager.js',
    'content.js',
    'themes.js',
    'multiplayer.js',
    'auth.js',
    'sounds.js',
    'assets/',
    'sounds/'
];

// Copy files to dist directory
filesToCopy.forEach(file => {
    const source = path.join(__dirname, file);
    const target = path.join(distDir, file);
    
    try {
        if (fs.lstatSync(source).isDirectory()) {
            // Copy directory recursively
            copyDirSync(source, target);
            console.log(`📂 Copied directory: ${file}`);
        } else if (fs.existsSync(source)) {
            // Copy file
            fs.copyFileSync(source, target);
            console.log(`📄 Copied file: ${file}`);
        }
    } catch (error) {
        console.warn(`⚠️ Could not copy ${file}: ${error.message}`);
    }
});

// Create a simple CNAME file for GitHub Pages
fs.writeFileSync(path.join(distDir, 'CNAME'), 'math-spell-adventure.windsurf.io');
console.log('🌐 Created CNAME file');

// Create a simple 404.html for GitHub Pages SPA routing
const notFoundHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Math & Spell Adventure</title>
    <script>
        // Redirect to index.html for SPA routing
        sessionStorage.redirect = location.href;
        window.location.href = '/math-spell-adventure' + 
            (window.location.search || '') + 
            (window.location.hash || '');
    </script>
</head>
<body>
    Redirecting...
</body>
</html>
`;
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
console.log('❓ Created 404.html for SPA routing');

// Create a .nojekyll file to prevent GitHub Pages from using Jekyll
fs.writeFileSync(path.join(distDir, '.nojekyll'), '');
console.log('🚫 Created .nojekyll file');

// Create a simple deploy script for GitHub Pages
const deployScript = `
#!/bin/bash
# Deploy to GitHub Pages

echo "🚀 Deploying to GitHub Pages..."

# Build the project
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist

echo "✅ Deployment complete!"
`;

fs.writeFileSync(path.join(__dirname, 'deploy.sh'), deployScript);
fs.chmodSync(path.join(__dirname, 'deploy.sh'), '755');
console.log('📜 Created deploy.sh script');

// Create a GitHub Actions workflow for CI/CD
const workflowsDir = path.join(__dirname, '.github', 'workflows');
if (!fs.existsSync(workflowsDir)) {
    fs.mkdirSync(workflowsDir, { recursive: true });
}

const workflowYml = `
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Use Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '16.x'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Deploy to GitHub Pages
      uses: JamesIves/github-pages-deploy-action@4.1.4
      with:
        folder: dist
        branch: gh-pages
        clean: true
`;

fs.writeFileSync(path.join(workflowsDir, 'deploy.yml'), workflowYml);
console.log('⚙️  Created GitHub Actions workflow');

// Update package.json with deployment scripts
const packageJsonPath = path.join(__dirname, 'package.json');
let packageJson = {
    name: 'math-spell-adventure',
    version: '1.0.0',
    private: true,
    scripts: {
        'start': 'npx serve -s .',
        'build': 'node deploy.js',
        'deploy': 'npm run build && npx gh-pages -d dist',
        'test': 'echo "No tests specified" && exit 0'
    },
    devDependencies: {
        'gh-pages': '^4.0.0',
        'serve': '^14.0.0'
    }
};

// Read existing package.json if it exists
if (fs.existsSync(packageJsonPath)) {
    try {
        const existing = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        packageJson = { ...existing, ...packageJson };
    } catch (error) {
        console.warn('⚠️ Could not read existing package.json, creating a new one');
    }
}

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log('📦 Updated package.json');

// Helper function to copy directories recursively
function copyDirSync(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    
    files.forEach(file => {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        
        if (fs.lstatSync(sourcePath).isDirectory()) {
            copyDirSync(sourcePath, targetPath);
        } else {
            fs.copyFileSync(sourcePath, targetPath);
        }
    });
}

console.log('\n✨ Deployment preparation complete!');
console.log('\nNext steps:');
console.log('1. Commit all changes to your repository');
console.log('2. Run `npm install` to install dependencies');
console.log('3. Run `npm run deploy` to deploy to GitHub Pages');
console.log('\nOr push to GitHub and let GitHub Actions handle the deployment!');
