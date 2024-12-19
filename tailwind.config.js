/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,ts,tsx}", // Add this to scan for Tailwind CSS classes
	],
	theme: {
		extend: {},
	},
	plugins: [],
};
