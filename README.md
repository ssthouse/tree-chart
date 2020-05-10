# [中文文档](./README-CN.md)

## Demo page

https://ssthouse.github.io/vue-tree-chart/#/canvasOrgChart

## Demo Gif

![demo gif](https://raw.githubusercontent.com/ssthouse/organization-chart/master/screenshots/org-chart.gif)


## Using Tech

### Canvas version

- use D3.js with Canvas to draw organizationChart more efficiently.
- Use `unique-color` manner to identify mouse click event in Canvas (you can refer to https://medium.com/@lverspohl/how-to-turn-d3-and-canvas-into-good-friends-b7a240a32915 to see detail)


### Svg version

- use D3 to calculate node & link positon
- use Vue to handle dom element entring and leaving
- use Vue slot to let user easily use with their own data

## How to custom with my own data?

### Canavs version

the canvas version is not published with npm module.

if you want to use this project's canvas version, please download the source code and edit with the following steps:

- replace the data in `/src/base/data-generator.js` with your own nested data.
- add your data drawing logic in `/src/components/org-chart.js #drawShowCanvas`

### Svg version

- install npm module: `npm install @ssthouse/vue-tree-chart`
- register Vue component

```javascript
```

- use like this:

```javascript
```


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm run dev

# build for production with minification (build to ./docs folder, which can be auto servered by github page 🤓)
npm run build
```
