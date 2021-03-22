// https://observablehq.com/@walterra/vikings-timeline@96
import define1 from "./e93997d5089d7165@2303.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`
# Vikings Timeline

A timeline of a selection of events from the historic viking era. Made using [d3-milestones](https://github.com/walterra/d3-milestones).
`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`

### Adjust the slider to manipulate the visualization's width:`
)});
  main.variable(observer("viewof widthSlider")).define("viewof widthSlider", ["slider"], function(slider){return(
slider({ value: 1 })
)});
  main.variable(observer("widthSlider")).define("widthSlider", ["Generators", "viewof widthSlider"], (G, _) => G.input(_));
  main.variable(observer()).define(["md"], function(md){return(
md`

### Choose a label arrangement:`
)});
  main.variable(observer("viewof labelDistribution")).define("viewof labelDistribution", ["html"], function(html){return(
html`<select>
  <option>top-bottom</option>
  <option>top</option>
  <option>bottom</option>
</select>`
)});
  main.variable(observer("labelDistribution")).define("labelDistribution", ["Generators", "viewof labelDistribution"], (G, _) => G.input(_));
  main.variable(observer("vikings")).define("vikings", ["DOM","widthSlider","milestones","labelDistribution"], function(DOM,widthSlider,milestones,labelDistribution)
{
  const wrapper = DOM.element('div');
  const width = 900;
  const height = 600;
  wrapper.style.width = width + 'px';
  wrapper.style.height = height + 'px';
  
  
  const m = DOM.element('div');
  m.id = 'timeline';
  m.style.width = (widthSlider * width) + 'px';
  m.style.height = height + 'px';
  m.style.margin = 'auto';
  // needs padding otherwise label optimization will fail
  m.style.padding = '1px';
  wrapper.appendChild(m);

  // without the timeout observable isn't able to do the label optimization properly
  setTimeout(() => {
    const ms = milestones(m)
      .mapping({
        'timestamp': 'year',
        'text': 'title'
      })
      .parseTime('%Y')
      .aggregateBy('year')
      .optimize(true)
      .distribution(labelDistribution)
      .render([
        { year: 789, title: 'Vikings begin attacks on England.' },
        { year: 840, title: 'Vikings found Dublin in Ireland.' },
        { year: 860, title: 'Rus Vikings attack Constantinople.' },
        { year: 866, title: 'Danish Vikings establish a kingdom in York, England.' },
        { year: 871, title: 'Danish advance is halted in England.' },
        { year: 872, title: 'Harald I gains control of Norway.' },
        { year: 900, title: 'The Vikings raid along the Mediterranean coast.' },
        { year: 911, title: 'The Viking chief Rollo founds Normandy in France.' },
        { year: 941, title: 'Rus Vikings attack Constantinople.' },
        { year: 981, title: 'Viking leader Erik the Red discovers Greenland.' }
      ]);
  }, 0);

  return wrapper;
}
);
  main.variable(observer("milestones")).define("milestones", ["require"], function(require){return(
require('d3-milestones')
)});
  main.variable(observer("stylesheet")).define("stylesheet", ["html"], function(html){return(
html`<link rel='stylesheet'
  href='https://unpkg.com/d3-milestones@1.0.0-beta1/build/d3-milestones.css' />`
)});
  const child1 = runtime.module(define1);
  main.import("slider", child1);
  return main;
}
