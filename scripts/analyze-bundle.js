#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🌳 Analyzing tree shaking and bundle size...\n');

// Build the project
console.log('Building project...');
execSync('npm run build', { stdio: 'inherit' });

// Analyze bundle sizes
const distPath = './dist';
const assets = fs.readdirSync(path.join(distPath, 'assets'));

console.log('\n📦 Bundle Analysis:');
console.log('==================');

const jsFiles = assets.filter(file => file.endsWith('.js'));
const cssFiles = assets.filter(file => file.endsWith('.css'));

jsFiles.forEach(file => {
  const filePath = path.join(distPath, 'assets', file);
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`📄 ${file}: ${sizeKB} KB`);
});

cssFiles.forEach(file => {
  const filePath = path.join(distPath, 'assets', file);
  const stats = fs.statSync(filePath);
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`🎨 ${file}: ${sizeKB} KB`);
});

// Calculate total size
const totalSize = [...jsFiles, ...cssFiles].reduce((total, file) => {
  const filePath = path.join(distPath, 'assets', file);
  const stats = fs.statSync(filePath);
  return total + stats.size;
}, 0);

console.log(`\n📊 Total bundle size: ${(totalSize / 1024).toFixed(2)} KB`);
console.log(`📊 Gzipped estimate: ~${(totalSize / 1024 / 3).toFixed(2)} KB`);

console.log('\n✅ Tree shaking analysis complete!');