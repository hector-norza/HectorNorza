import favicons from 'favicons';
import fs from 'fs';
import path from 'path';

const source = './public/viteME.svg'; // Source image
const configuration = {
  path: '/', // Path for overriding default icons path
  appName: 'Hector Norzagaray Portfolio', // Your application's name
  appShortName: 'HN Portfolio', // Your application's short name
  appDescription: 'Product Manager, developer, and community builder passionate about creating exceptional experiences.',
  developerName: 'Hector Norzagaray',
  developerURL: 'https://www.hnorza.com',
  dir: 'auto',
  lang: 'en-US',
  background: '#fff',
  theme_color: '#000',
  appleStatusBarStyle: 'black-translucent',
  display: 'standalone',
  orientation: 'any',
  scope: '/',
  start_url: '/',
  preferRelatedApplications: false,
  relatedApplications: undefined,
  version: '1.0',
  pixel_art: false,
  loadManifestWithCredentials: false,
  manifestMaskable: false,
  icons: {
    android: false,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: false,
    yandex: false
  }
};

async function generateFavicons() {
  try {
    console.log('🔄 Starting favicon generation...');
    console.log('Source file:', source);
    
    const response = await favicons(source, configuration);
    
    console.log('📦 Generated', response.images.length, 'images');
    
    // Write files to public directory
    response.images.forEach((image) => {
      const filePath = path.join('./public/', image.name);
      fs.writeFileSync(filePath, image.contents);
      console.log('✅ Created:', image.name);
    });
    
    console.log('🎉 All favicons generated successfully!');
    
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    console.error('Stack:', error.stack);
  }
}

generateFavicons();
