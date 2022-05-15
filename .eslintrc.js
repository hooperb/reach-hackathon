module.exports = {
	extends: "eslint-config-labrys",
	parser: "@typescript-eslint/parser",
	rules: {
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
	},
};
