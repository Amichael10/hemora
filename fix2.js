const fs = require('fs');

let crisis = fs.readFileSync('apps/mobile/app/(tabs)/crisis.tsx', 'utf8');
crisis = crisis.replace(/Fonts\.sansSemi/g, 'Fonts.sansMedium');
crisis = crisis.replace(/<AddCircleBold color="#fff" size=\{20\} style=\{\{ marginLeft: 8 \}\} \/>/g, '<View style={{ marginLeft: 8 }}><AddCircleBold color="#fff" size={20} /></View>');
fs.writeFileSync('apps/mobile/app/(tabs)/crisis.tsx', crisis);

let vitals = fs.readFileSync('apps/mobile/app/vitals-log.tsx', 'utf8');
vitals = vitals.replace(/<ChevronLeftLinear(.*?)style=\{\{(.*?)\}\}(.*?)\/>/g, '<View style={{$2}}><ChevronLeftLinear$1$3/></View>');
fs.writeFileSync('apps/mobile/app/vitals-log.tsx', vitals);
