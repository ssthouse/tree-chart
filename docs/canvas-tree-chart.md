# Canvas Tree Chart

## Canvas version Using Tech

- use D3.js with Canvas to draw organizationChart more efficiently.
- Use `unique-color` manner to identify mouse click event in Canvas (you can refer to https://medium.com/@lverspohl/how-to-turn-d3-and-canvas-into-good-friends-b7a240a32915 to see detail)


### Canvas version API

the canvas version is not published with npm module.

if you want to use this project's canvas version, please download the source code and edit with the following steps:

- replace the data in `packages/tree-chart-demo/src/base/data-generator.js` with your own nested data.
- add your data drawing logic in `packages/tree-chart-demo/src/components/org-chart.js #drawShowCanvas`