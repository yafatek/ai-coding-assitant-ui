import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react()],

  server: {
    port: 8035,
    https: {
      key: '/Users/ferasalawadi/key.pem',
      cert: '/Users/ferasalawadi/cert.pem'
    }
  },
  preview: {
    port: 8035,
  },
});
