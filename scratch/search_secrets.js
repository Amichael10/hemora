import fs from 'fs';
import path from 'path';

const searchDir = 'c:/Users/User/Monorepo/hemora';
const patterns = ['3Dthy', 'sk-secret'];

function search(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (file === '.git' || file === 'node_modules') continue;
      
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        search(fullPath);
      } else if (stat.isFile()) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          for (const pattern of patterns) {
            if (content.includes(pattern)) {
              console.log(`FOUND ${pattern} in: ${fullPath}`);
            }
          }
        } catch (e) {
          // Ignore unreadable or binary files
        }
      }
    }
  } catch (e) {
    // Ignore unreadable directories
  }
}

console.log('Starting search...');
search(searchDir);
console.log('Search complete.');
