import * as d3 from 'd3';
import * as topojson from 'topojson';

// I would normally want to load this bunch of data asynchronously using d3.json
import worldMapData from './50m.json';

let countries = topojson.feature(worldMapData, worldMapData.objects.countries).features;

let margin = {
  top: 50,
  left: 50,
  bottom: 50,
  right: 50
};

let height = 400;
let width = 800;

let svg = d3.select('main')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g');

let projection = d3.geoMercator()
  .translate([width / 2, height / 2])
  .scale(100);

let path = d3.geoPath()
  .projection(projection);

svg.selectAll('.country')
  .data(countries)
  .enter().append('path')
  .attr('class', 'country')
  .attr('d', path)
