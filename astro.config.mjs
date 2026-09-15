// @ts-check
import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
	integrations: [
		icon({
			include: {
				ph: [
					'phone',
					'map-pin',
					'clock',
					'calendar-blank',
					'user',
					'hand-heart',
					'person-simple',
					'caret-right',
					'arrow-up-right',
					'arrow-right',
					'check',
					'flower-lotus',
					'sparkle',
					'x',
					'list',
					'instagram-logo',
					'chat-circle-dots',
					'heart',
					'leaf',
					'sun-horizon',
					'train',
					'house-simple',
				],
				'simple-icons': ['line', 'instagram'],
			},
		}),
	],
});
