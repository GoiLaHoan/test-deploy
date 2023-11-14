const colors = require("tailwindcss/colors");

// prettier-ignore
module.exports = {
	future: {
		removeDeprecatedGapUtilities: true,
		purgeLayersByDefault: true,
	},
	content: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./containers/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./cells/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			boxShadow: {
				default:
					"0px 0px 3px rgba(20, 20, 20, 0.15), 0px 1px 4px rgba(20, 20, 20, 0.05)",
				noshadow: "0px 0px 0px rgba(0,0,0,0)",
			},
			colors: {
				gray: {
					...colors.gray,
					600: "#979797",
					900: "#373737",
					summary: colors.gray["500"],
					date: colors.gray["400"],
					bggray: "#F8F8F8",
					black: "#373737",
				},
				"ktc-black": "#373737",
				"ktc-borders": "#E5E5E5",
				"ktc-category": "#0C88D4",
				"ktc-date-gray": "#757575",
				"ktc-desc-gray": "#838383",
				"ktc-gray": "#11111180",
				"ktc-summary-gray": "#4D4D4D",
				"ktc-gold": "#ECB30E",
				"ktc-blue": "#0A87D2",
				"kitco-black": "#232323",
				"alt-row": "#f5f5f5",
				"accent-1": "#333",
				"gray-summary": colors.gray["500"],
				"gray-date": colors.gray["400"],
				"ktc-icon-black": "#111111",
			},
			gridTemplateColumns: {
				"layout-2": "minmax(auto, 1fr) 300px",
				"layout-5": "110px 1fr 100px 1fr 1fr",
				"layout-10": "280px minmax(auto, 1fr)",
			},
			width: {
				"6.5/10": "65.5%",
				"3.5/10": "34.5%",
			},
		},
		fontFamily: {
			lato: "Lato, sans-serif",
		},
	},
	variants: {},
	plugins: [
		require("@tailwindcss/line-clamp"),
		require("@tailwindcss/typography"),
		// require("daisyui"),
	],
	// daisyui: {
	//   themes: ["light"], // true: all themes | false: only light + dark | array: specific themes like this ["light", "dark", "cupcake"]
	//   // darkTheme: "light", // name of one of the included themes for dark mode
	//   base: false, // applies background color and foreground color for root element by default
	//   styled: false, // include daisyUI colors and design decisions for all components
	//   utils: true, // adds responsive and modifier utility classes
	//   rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
	//   prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
	//   logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
	// },
};
