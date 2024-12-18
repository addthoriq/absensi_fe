import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { config } from 'dotenv';

config(); // Muat file .env

export default defineConfig({
	plugins: [sveltekit()],
	// build: {
	//   	assetsInlineLimit: 0, // Ensures large assets are not inlined
	// },
	define: {
		'process.env.VITE_API_URL': JSON.stringify(process.env.VITE_API_URL),
	  },
});