import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";
import rollupCJS from '@rollup/plugin-commonjs';
import path from 'path';

import pkg from './package.json';

const minName = pkg.main.slice(0, -3) + ".min.js";
const varName = path.basename(pkg.module, '.js');

const GLOBALS = {
	'jquery': '$',
	'tippy.js': 'Tippy'
};

export default {
    input: pkg.module,
    output: [
		{
			file: pkg.main,
			globals: GLOBALS,
			name: varName,
			format: 'iife'
		}, {
			file: minName,
			globals: GLOBALS,
			name: varName,
			format: 'iife'
		}
	],
    plugins: [
		rollupCJS(),
        babel({
			presets: [ '@babel/preset-env' ]
		}),
		terser({
			include: [/^.+\.min\.js$/],
		})
	],
	external: ['jquery', 'tippy.js']
};
