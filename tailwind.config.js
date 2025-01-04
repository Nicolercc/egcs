/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{astro,html,js,jsx,ts,tsx}", // Ensure your project's paths are covered
		"./components/**/*.{js,jsx,ts,tsx}", // Add this for ShadCN components
	],
	theme: {
		extend: {
			// Add any customizations here
		},
	},
	plugins: [
		require("@tailwindcss/typography"), // Optional: Add plugins used by ShadCN
		require("@tailwindcss/forms"), // Optional: For better forms styling
		require("@tailwindcss/aspect-ratio"), // Optional: For aspect ratios
	],
};
