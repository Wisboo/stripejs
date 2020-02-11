import babel from 'rollup-plugin-babel';

export default [
	{
		input: 'wisboo-stripejs.js',
		output: {
			name: 'ngStripe',
			file: 'dist/ngStripe.js',
			format: 'cjs'
		},
		plugins: [
			babel()
		]
	}
];
