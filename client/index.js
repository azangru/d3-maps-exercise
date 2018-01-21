// References:
// Helloworld examples:
// - https://github.com/larkintuckerllc/hello-d3
//
// Building maps:
// https://www.youtube.com/watch?v=aNbgrqRuoiE
//
// pulse css effect: https://codepen.io/riccardoscalco/pen/GZzZRz

import * as d3 from 'd3';
import * as topojson from 'topojson';

import './styles.css';

// I would normally want to load this bunch of data asynchronously using d3.json
import worldMapData from './50m.json';

let countries = topojson.feature(worldMapData, worldMapData.objects.countries).features;

let margin = {
  top: 50,
  left: 50,
  bottom: 50,
  right: 50
};

let height = 600;
let width = 1200;

// (Cities' coordinates can be obtained on http://geojson.io)
// Coordinates format is [longitude, latitude]
// The latitude is preceded by a minus sign if it is south of the equator
// (a positive number implies north), and the longitude is preceded by a minus sign
// if it is west of the prime meridian (a positive number implies east)
let moscowCoordinates = [37.6173, 55.7558];
let newYorkCoordinates = [-73.99772644042969, 40.73268976628568];
let copenhagenCoordinates = [12.571792602539062, 55.684746298950444];
let londonCoordinates = [-0.14350891113281247, 51.50746034612789];

let citiesCoordinates = [
  moscowCoordinates,
  newYorkCoordinates,
  copenhagenCoordinates,
  londonCoordinates
]


let svg = d3.select('main')
  .append('svg')
  .attr('height', height)
  .attr('width', width)
  .append('g');

let projection = d3.geoMercator()
  .translate([width / 2, height / 1.6])
  .scale(150);

let path = d3.geoPath()
  .projection(projection);

svg.selectAll('.country')
  .data(countries)
  .enter().append('path')
  .attr('class', 'country')
  .style("fill", "steelblue")
  .attr('d', path)


let cities = svg.append('g'); // group for city circles
let cityRadius = 5;

function updateCitiesData() {
  let randomCityIndex = Math.floor(Math.random() * citiesCoordinates.length);
  return [citiesCoordinates[randomCityIndex]];
}

function updateCities(coordinates) {
  // removes previously rendered circles; that's a temporary hack
  let citiesSelection = cities.selectAll("circle")
    .remove();

  citiesSelection = cities.selectAll("circle").data(coordinates);

  citiesSelection.enter()
  	.append("circle")
  	.attr("cx", function (d) { return projection(d)[0] - cityRadius / 2; })
  	.attr("cy", function (d) { return projection(d)[1] - cityRadius / 2 ; })
  	.attr("r", cityRadius)
    .attr("class", "city");
}

setInterval(() => {
  let cities = updateCitiesData();
  updateCities(cities);
}, 1000);
