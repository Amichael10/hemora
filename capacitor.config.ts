import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hemora.app',
  appName: 'Hemora',
  webDir: 'dist/client',
  server: {
    url: 'https://app.hemora.xyz/',
    cleartext: true
  }
};

export default config;
