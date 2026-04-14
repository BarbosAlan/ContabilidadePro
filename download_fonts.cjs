const fs = require('fs');
const https = require('https');
const path = require('path');

fs.mkdirSync('./public/fonts', { recursive: true });

const files = [
  { 
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff2', 
    dest: 'inter-regular.woff2'
  },
  { 
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff2', 
    dest: 'inter-bold.woff2'
  },
  { 
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/newsreader/files/newsreader-latin-400-normal.woff2', 
    dest: 'newsreader-regular.woff2'
  },
  { 
    url: 'https://cdn.jsdelivr.net/npm/@fontsource/newsreader/files/newsreader-latin-400-italic.woff2', 
    dest: 'newsreader-italic.woff2'
  }
];

files.forEach(f => {
  https.get(f.url, res => {
    res.pipe(fs.createWriteStream(path.join('./public/fonts', f.dest)));
  });
});
