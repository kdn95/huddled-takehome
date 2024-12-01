import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
  // Look for any server-related configurations
  server: {
    // Ensure port is not conflicting
    port: 5173, // Default Vite port
    // You might want to add open: true for automatic browser launch
    open: true
  }
});
