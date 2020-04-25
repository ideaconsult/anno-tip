/* eslint-disable array-bracket-newline */
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from "rollup-plugin-terser";
import postcss from 'rollup-plugin-postcss';
import imageInliner from 'postcss-image-inliner';
import cssnano from 'cssnano';

import pkg from './package.json';

const varName = Object.keys(pkg.browser)[0];
const distFile = pkg.browser[varName];
const minName = distFile.slice(0, -3) + ".min.js";
const LIB_GLOBALS = {
	'jquery': '$',
	'tippy.js': 'tippy',
	'css-selector-generator': 'CssSelectorGenerator'
};

const LIB_CONFIG = {
    input: pkg.module,
    output: [
		{
			file: distFile,
			globals: LIB_GLOBALS,
			name: varName,
			sourcemap: true,
			sourcemapFile: distFile + '.map',
			format: 'iife'
		}, {
			file: minName,
			globals: LIB_GLOBALS,
			sourcemap: true,
			sourcemapFile: minName + '.map',
			name: varName,
			format: 'iife'
		}, {
			file: pkg.main,
			globals: LIB_GLOBALS,
			sourcemap: false,
			name: varName,
			format: 'cjs'
		}
	],
	plugins: [
		postcss({
			extensions: [ '.css' ],
			plugins: [ 
				imageInliner({ 
					assetPaths: [ 'src' ], 
					maxFileSize: 0 
				}),
				cssnano()
			]
		}),
		babel({
			presets: [ '@babel/preset-env' ]
		}),
		terser({
			sourcemap: "inline",
			include: [/^.+\.min\.js$/]
		})
	],
	external: ['jquery', 'tippy.js', 'css-selector-generator']
};

// Make a full bundle, with all dependency libraries included.
const fullName = distFile.slice(0, -3) + "-full.min.js";
const FULL_CONFIG = {
    input: pkg.module,
    output: [{
		file: fullName,
		name: varName,
		globals: { 'jquery': '$' },
		sourcemap: true,
		sourcemapFile: fullName + '.map',
		format: 'umd'
	}],
	plugins: [
		postcss({
			extensions: [ '.css' ],
			plugins: [ 
				imageInliner({ 
					assetPaths: [ 'src' ], 
					maxFileSize: 0 
				}),
				cssnano()
			]
		}),
		resolve({ 
			browser: true,
			jsnext: true,
			main: true
		}),
		commonjs(),
		babel({
			presets: [ '@babel/preset-env' ]
		}),
		replace({
			__buildEnv__: JSON.stringify('production'),
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		terser({
			sourcemap: true,
			include: [/^.+\.min\.js$/]
		})
	],
	external: ['jquery']
};


export default process.env.ROLL_CONFIG === 'full' ? FULL_CONFIG : LIB_CONFIG;

