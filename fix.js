const fs = require('fs');
function replaceInFile(path, regex, replacement) {
  if (fs.existsSync(path)) {
    let data = fs.readFileSync(path, 'utf8');
    data = data.replace(regex, replacement);
    fs.writeFileSync(path, data);
  }
}

replaceInFile('apps/mobile/app/transfusion-log.tsx', /Fonts\.serifBold/g, 'Fonts.serif');
replaceInFile('apps/mobile/app/appointment-log.tsx', /<HospitalLinear (.*?) style=\{\{ marginRight: 10 \}\} \/>/g, '<View style={{ marginRight: 10 }}><HospitalLinear $1 /></View>');
replaceInFile('apps/mobile/app/vitals-log.tsx', /<ChevronLeftLinear(.*?)style=\{\{(.*?)\}\}(.*?)\/>/g, '<View style={{$2}}><ChevronLeftLinear$1$3/></View>');
replaceInFile('apps/mobile/app/vitals-log.tsx', /import \{ MotiView \} from (['"])moti\1;/g, '');
replaceInFile('apps/mobile/app/vitals-log.tsx', /<MotiView/g, '<View');
replaceInFile('apps/mobile/app/vitals-log.tsx', /<\/MotiView>/g, '</View>');

replaceInFile('apps/mobile/app/(tabs)/crisis.tsx', /Fonts\.sansSemi/g, 'Fonts.sansMedium');
replaceInFile('apps/mobile/app/(tabs)/crisis.tsx', /<AltArrowDownLinear(.*?)style=\{\{ marginLeft: 6 \}\} \/>/g, '<View style={{ marginLeft: 6 }}><AltArrowDownLinear$1 /></View>');
