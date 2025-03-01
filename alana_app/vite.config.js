import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Binds to all network interfaces
    port: 5173, // Change this if needed
  }
});