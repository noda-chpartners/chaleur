// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [
		icon({
			include: {
				ph: [
					'x',
					'list',
					'chat-circle-text',
					'quotes',
					'user-circle',
				],
				'simple-icons': ['line'],
			},
		}),
	],
});
