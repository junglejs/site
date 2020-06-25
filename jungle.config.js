const svelte = require('rollup-plugin-svelte');
const { terser } = require('rollup-plugin-terser');
const resolve = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs');

const sveltePreprocess = require('svelte-preprocess');
const { junglePreprocess } = require('junglejs');

const production = !!process.env.PRODUCTION;


module.exports = {
    inputOptions: (filename, extension) => {
        return {
            input: `jungle/build${extension}/${filename}/main.js`,
            plugins: [
                svelte({
                    dev: !production,
                    css: css => {
                        css.write(`jungle/build${extension}/${filename}/bundle.css`);
                    },
                    preprocess: [
                        sveltePreprocess({ postcss: true }),
                        junglePreprocess,
                    ]
                }),

                resolve(),
                commonjs(),

                production && terser(),
            ],
        }
    },
    outputOptions: (filename, extension) => {
        return {
            sourcemap: true,
            format: 'iife',
            name: 'app',
            file: `jungle/build${extension}/${filename}/bundle.js`,
        }
    },
    dataSources: [

        {
            format: "dir/markdown", name: "post", items: 'static/posts/', queryArgs: { slug: 'String!' },
        },
        {
            format: "dir/markdown", name: "doc", items: 'static/docs/', queryArgs: { slug: 'String!' },
        },
        {
            format: "dir/markdown", name: "contribute", items: 'static/contributing/', queryArgs: { slug: 'String!' },
        }
    ]
};