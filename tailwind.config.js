/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			fontFamily: {
				"Inter": ["Inter", "sans-serif"]
			},
			backgroundImage: {
				"hero-bg": "url(../images/hero-bg.png)",
				"chat-bg": "url(../images/chat-bg.svg)"
			},
			colors: {
				"purple": "#8646F4",
				"dark": "#4F4F4F",
				"dark-3": "#374151",
				"dark-2": "#1F2A37",
				"dark-5": "#6B7280",
				"stroke": "#DFE4EA",
				"secondary": "#8899A8",
				"gray": "#F9FAFB",
				"green": "#22AD5C",
				"green-light": "#DAF8E6",
				"red-light-6": "#FEF3F3",
				"red-light-2": "#F89090",
				"red": "#F56060",
				"purple-light": "#F5F3FF",
				"primary": "#637381",
				"gray-2": "#F3F4F6",
				"gray-3": "#E5E7EB",
				"blue": "#2D68F8",
				"yellow": "#FBBF24"
			},
			lineHeight: {
				"26": "26px"
			},
			"screens": {
				"992": "992px",
				"1440": "1440px",
				"480": "480px"
			}
		},
	},
	plugins: [],
}