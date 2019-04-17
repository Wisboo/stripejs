import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default [
	{
		input: 'wisboo-stripejs.js',
		output: {
			name: 'ngStripe',
			file: 'dist/ngStripe.js',
			format: 'cjs'
		},
		plugins: [
			resolve(),
			commonjs(),
			babel()
		]
	}
];
