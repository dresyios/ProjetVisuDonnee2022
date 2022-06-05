function drawTOP(year, country, publisher) { //fonction provisoire

    d3.csv("dataset3.csv", function(error, data) {
        if (error) {
            throw error;
        }
        
    let dataTOP = data.filter(function(d)
    { 
    if(d["Year"] == year && d["Country"] == country && d["Publisher"] == publisher) { 
    return d;
    } 
    })
    
    console.log(dataTOP)
    console.log(dataTOP.Names)

    d3.select('#main')
        .append('g')
        .attr('id', 'top3')
        .attr('x', 300)
        .attr('y', 300)
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    canevas1.append('g').selectAll('text') //total de l'année
    .data(dataTOP)
    .enter()
    .append('text')
        .attr('x',600)
        .attr('y', 400)
        .html(function(d) { return d.Names })
    })
}
