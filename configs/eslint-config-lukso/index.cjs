module.exports = {
	extends: [
		"turbo",
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:sonarjs/recommended",
	],
	rules: {
		"@typescript-eslint/no-explicit-any": "off",
	},
	parser: "@typescript-eslint/parser",
	// env: {
	//   es2024: true,
	// },
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["@typescript-eslint", "unicorn", "sonarjs"],
	root: true,
};
