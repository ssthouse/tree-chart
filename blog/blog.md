# organization-chart


## demo page

https://ssthouse.github.io/organization-chart/#/


![demo gif](https://raw.githubusercontent.com/ssthouse/organization-chart/master/screenshots/org-chart.gif)


## Tech
- use D3.js with Canvas to draw organizationChart more efficiently.
- Use `unique-color` manner to identify mouse click event in Canvas (you can refer to https://medium.com/@lverspohl/how-to-turn-d3-and-canvas-into-good-friends-b7a240a32915 to see detail)


## To draw your own nested data

please replace the data in `/src/base/data-generator` with your own nested data.

please add your data drawing logic in `/src/components/org-chart.js #drawShowCanvas`

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost
npm run dev

# build for production with minification (build to ./docs folder, which can be auto servered by github page 🤓)
npm run build
```
