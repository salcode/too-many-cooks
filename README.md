# Too Many Cooks in the Kitchen

Stable Tag: 0.1.0  
Requires at least: 6.0.0  
Tested up to: 6.0.0  
Requires PHP: 8.0  
License: apache-2.0  
Contributors: salcode  

## Description

Plugin to demonstrate the dangers of updating post meta through PHP and through Gutenberg JavaScript.

### Where is this plugin developed?

Development of this code happens at [github.com/salcode/too-many-cooks](https://github.com/salcode/too-many-cooks)

### How to Build the JavaScript for this plugin

1. Switch to node 12 (Note: a `.nvmrc` file is included for those who use [nvm](https://github.com/nvm-sh/nvm))
2. Run `npm install`
3. Run `npm run build`

### How to Automatically Rebuild the JavaScript During Development

1. Complete the above `How to Build the JavaScript for this plugin` steps
2. Then run `npm run dev`. This will start a process that watches for changes in your JavaScript source and when a change occurs it rebuilds the JavaScript built files. (Note: the browser will not automatically reload on changes, you need to manually reload the page).

## Changelog

### 0.1.0

* Initial release
