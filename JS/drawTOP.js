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

    canevas1.append('g').selectAll('text') //total de l'année
    .data(dataTOP)
    .enter()
    .append('text')
        .attr('x',600)
        .attr('y', 400)
        .html(function(d) { return d.Names + " millions de jeux vendus"; })
    })
}
