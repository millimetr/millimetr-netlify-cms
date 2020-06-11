# 🧲 millimetr-netlify-cms

A millimetr starting template with [Netlify CMS](https://www.netlifycms.org/) integration.

_Note that the CSS selectors in this demo follow the [BEM convention](https://en.bem.info/methodology/css/#selectors). However you are welcome to restructure them according to your preferences._


## Getting started

1. `git clone https://github.com/millimetr/millimetr-netlify-cms.git`
2. `npm install`
3. `npm start`

## Principles

- 📄 **HTML templates are written in [EJS](https://ejs.co/)**
- 🤖 **The `millimetr.config.js` file is central to this starter.**
- 👓 **No hidden behaviour, everything is documented via `millimetr.config.js` file.**

## Example routes

This starting template starts with three routes:

- `/`: The basic landing-route.
- `/hardcoded`: Illustrates how hardcoded values can be passed to route templates.
- `/dynamic`: Illustrates how dynamically generated values can be passed to route templates.
- `/remote`: Illustrates how remote data can be fetched and passed to route templates.
