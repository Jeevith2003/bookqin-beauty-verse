import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.08cf90c688e749a782ee5ba5e563c201',
  appName: 'booqin',
  webDir: 'dist',
  server: {
    url: 'https://08cf90c6-88e7-49a7-82ee-5ba5e563c201.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#FF6B6B'
    }
  }
};

export default config;