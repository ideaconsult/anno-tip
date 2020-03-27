/* eslint-disable array-bracket-newline */
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from "rollup-plugin-terser";
import path from 'path';

import pkg from './package.json';

const varName = path.basename(pkg.module, '.js');
const minName = pkg.main.slice(0, -3) + ".min.js";
const DEF_GLOBALS = {
	'jquery': '$',
	'tippy.js': 'tippy'
};

const DEF_CONFIG = {
    input: pkg.module,
    output: [
		{
			file: pkg.main,
			globals: DEF_GLOBALS,
			name: varName,
			sourcemap: true,
			sourcemapFile: pkg.main + '.map',
			format: 'iife'
		}, {
			file: minName,
			globals: DEF_GLOBALS,
			sourcemap: true,
			sourcemapFile: minName + '.map',
			name: varName,
			format: 'iife'
		}
	],
	plugins: [
		babel({
			presets: [ '@babel/preset-env' ]
		}),
		terser({
			sourcemap: "inline",
			include: [/^.+\.min\.js$/]
		})
	],
	external: ['jquery', 'tippy.js']
};

// Make a full bundle, with all dependency libraries included.
const fullName = pkg.main.slice(0, -3) + "-full.min.js";
const FULL_CONFIG = {
    input: pkg.module,
    output: [{
		file: fullName,
		name: varName,
		globals: { 'jquery': '$' },
		sourcemap: true,
		sourcemapFile: fullName + '.map',
		format: 'iife'
	}],
	plugins: [
		resolve({ 
			browser: true 
		}),
		commonjs(),
		babel({
			presets: [ '@babel/preset-env' ]
		}),
		terser({
			sourcemap: true,
			include: [/^.+\.min\.js$/]
		})
	],
	external: ['jquery']
};


export default process.env.ROLL_CONFIG === 'full' ? FULL_CONFIG : DEF_CONFIG;

