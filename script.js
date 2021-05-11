/*
// Setting up the svg element for D3 to draw in
let width = 500, height = 300

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
// A projection tells D3 how to orient the GeoJSON features
let WorldProjection = d3.geoMercator()
  .center([ 13, 52 ])
  .scale([ width / 1.5 ])
  .translate([ width / 2, height / 2 ])
// The path generator uses the projection to convert the GeoJSON
// geometry to a set of coordinates that D3 can understand
let pathGenerator = null

// URL to the GeoJSON itself
let geoJsonUrl = ''

pathGenerator = d3.geoPath().projection(WorldProjection)
geoJsonUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json"

// Request the GeoJSON
d3.json(geoJsonUrl).then(geojson => {
  // Tell D3 to render a path for each GeoJSON feature
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator) // This is where the magic happens
    .attr("stroke", "grey") // Color of the lines themselves
    .attr("fill", "white") // Color uses to fill in the lines
})*/
// Setting up the svg element for D3 to draw in
let width = 500, height = 300

let svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)

// A projection tells D3 how to orient the GeoJSON features
let usaProjection = d3.geoAlbersUsa()
	.scale(600)
  .translate([250, 150])
let europeProjection = d3.geoMercator()
	.center([ 13, 52 ])
  .scale([ width / 1.5 ])
  .translate([ width / 2, height / 2 ])

// The path generator uses the projection to convert the GeoJSON
// geometry to a set of coordinates that D3 can understand
let pathGenerator = null

// URL to the GeoJSON itself
let geoJsonUrl = ''

let usa = false // Change to false to render Europe instead

if (usa) {
  pathGenerator = d3.geoPath().projection(usaProjection)
  geoJsonUrl = "https://gist.githubusercontent.com/spiker830/e0d1b7950ced31369c903bed0cead7b1/raw/702c72e0ca5a1be95f84a50a58cfa6d4d6400f3f/us_features.json"
} else {
	pathGenerator = d3.geoPath().projection(europeProjection)
  geoJsonUrl = "https://gist.githubusercontent.com/spiker830/3eab0cb407031bf9f2286f98b9d0558a/raw/7edae936285e77be675366550e20f9166bed0ed5/europe_features.json"
}

// Request the GeoJSON
d3.json(geoJsonUrl).then(geojson => {
	// Tell D3 to render a path for each GeoJSON feature
  svg.selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator) // This is where the magic happens
    .attr("stroke", "grey") // Color of the lines themselves
    .attr("fill", "white") // Color uses to fill in the lines
})