/*
 * Third-party modules
 */

const { promises } = require('fs');
const { resolve: resolvePath } = require('path');
const { kebabCase } = require('lodash')
const markdownIt = require('markdown-it')();
const frontMatter = require('front-matter');

/**
 * Embedded constants
 */

const CWD = process.cwd();
const PAGES_PATH = './src/data/pages';

/*
 * Embedded helper functions
 */

const getRoutes = async () => {
    const pagesPath = resolvePath(CWD, PAGES_PATH);
    const files = await promises.readdir(pagesPath);

    const array = files.map(async (file) => {
        const filePath = resolvePath(PAGES_PATH, file);
        const contentAsString = await promises.readFile(filePath, 'utf-8');

        const { attributes, body } = frontMatter(contentAsString);

        if (!attributes || !attributes.title) {
            throw new Error('No title supplied');
        }

        return {
            ...attributes,
            url: `/${attributes.title === 'Homepage' ? '' : kebabCase(attributes.title)}`,
            template: './src/views/page.ejs',
            html: markdownIt.render(body),
        }
    })

    return await Promise.all(array)
}

/*
 * Primary export 
 */

const createConfig = async () => {
    const initialPagesArray = await getRoutes();
    const menu = initialPagesArray.map(singleRoute => ({ title: singleRoute.title, url: singleRoute.url }));
    const pagesArray = initialPagesArray.map(singleRoute => ({ ...singleRoute, menu }));

    return {
        /**
         * Files that should be copied directly to build.
         *
         * For example `./src/static/favicon.ico` will be copied as is to
         * `build/favicon.icon`.
         */
        static: './src/static',

        /**
         * This is the folder where the user-facing code will be compiled to.
         */
        output: './build',

        /**
         * A glob value specifying what file changes should trigger a rebuild when
         * running `millimeter develop`.
         */
        input: './src',
        
        /*
        * An array of routes that contain the the file URL (as a relative path) and
        * the template that should be used to build that route, as well as any
        * additional data that should be passed to the template.
        */
        routes: pagesArray
    }
}

module.exports = createConfig;
