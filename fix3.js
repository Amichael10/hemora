const fs = require('fs');

// Fix crisis.tsx
let crisis = fs.readFileSync('apps/mobile/app/(tabs)/crisis.tsx', 'utf8');
crisis = crisis.replace(/DangerBold,/g, 'DangerTriangleBold,');
crisis = crisis.replace(/if \(typeCfg\?\.emergency\) \{/g, 'if ((typeCfg as any)?.emergency) {');
fs.writeFileSync('apps/mobile/app/(tabs)/crisis.tsx', crisis);

// Fix vitals-log.tsx
let vitals = fs.readFileSync('apps/mobile/app/vitals-log.tsx', 'utf8');
vitals = vitals.replace(/import \{ motion, AnimatePresence \} from "moti";/g, '');
fs.writeFileSync('apps/mobile/app/vitals-log.tsx', vitals);
