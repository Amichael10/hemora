import fs from 'fs';
const content = fs.readFileSync('c:/Users/User/Monorepo/hemora/diff.txt', 'utf8');
console.log('Includes 3Dthy:', content.includes('3Dthy'));
console.log('Includes sk-secret:', content.includes('sk-secret'));
console.log('Includes whsec:', content.includes('whsec'));
