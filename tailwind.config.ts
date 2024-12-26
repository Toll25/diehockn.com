import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			animation: {
				scroll: 'scroll 2s linear infinite'
			},
			keyframes: {
				scroll: {
					'0%': {
						backgroundPosition: '0 0'
					},
					'100%': {
						backgroundPosition: '64px -256px'
					}
				}
			},
			dropShadow: {
				glow: ['0 0px 20px rgba(255,255, 255, 0.35)', '0 0px 65px rgba(255, 255,255, 0.2)']
			},
			colors: {
				background: '#161616',
				text: '#ffffff',
				subtext: '#cccccc',
				surface1: '#090909',
				surface2: '#050505',
				primary: '#8586e8',
				secondary: '#81187c',
				accent: '#d72d96'
			}
		}
	},

	plugins: []
} satisfies Config;
