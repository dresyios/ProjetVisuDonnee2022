function drawPublisher(year, country) {


    var svg = d3.select("svg"),
        width = 300,
        height = 300,
        radius = Math.min(width, height) / 2;

    //à chaque appel de la fonction je supprime la variable g, qui représente le piechart, pour éviter que les nouveaux piecharts se superposent
    d3.select("#mypiechart").remove()
    

    var g = svg.append("g")
               .attr("transform", "translate(" + window.innerWidth / 2 + "," + (((window.innerHeight*0.9) / 2)+50) + ")")
               .attr("id", "mypiechart")
               .attr('opacity', 0)

    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c', '#ad783e']);

    var pie = d3.pie().value(function(d) { 
        return d.Sales; 
    }).sort(null);

    var path = d3.arc()
             .outerRadius(radius - 10)
             .innerRadius(0);

    var label = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius - 18);

    var labelVal = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius - 170);

    var getAngle = function (d) {
        return (180 / Math.PI * (d.startAngle + d.endAngle) / 2 - 90) // pour la lisibilité
    };

    d3.csv("dataset2.csv", function(error, data) {
                if (error) {
                    throw error;
                }

        let dataYear = data.filter(function(d)
        { 
            if(d["Year"] == year && d["Country"] == country) { 
            return d;
            } 
        })
        console.log(dataYear)

        var arc = g.selectAll(".arc")
                   .data(pie(dataYear))
                   .enter().append("g")
                   .attr("class", "arc");

        console.log(data.Publisher)
    
        arc.append("path")
           .attr("d", path)
           .attr("fill", function(d) { return color(d.data.Publisher); })
           .attr("opacity", 0.8)
           .attr("id", (d) => d.Publisher)
           .on("mouseover", mouseover)
           .on("mousemove", mousemove)
           .on("mouseleave", mouseleave)

           arc.append("text")
           .attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")" +
                    "rotate(" + getAngle(d) + ")"; }) // pour améliorer la lisibilité (certains sont à l'envers pas contre, je chercher encore la solution)
            .attr("dy", 5) 
            .style("text-anchor", "start")
            .text(function(d) { return d.data.Publisher; }); 
           
            arc.append("text")
            .attr("transform", function(d) { 
                       return "translate(" + labelVal.centroid(d) + ")" +
                       "rotate(" + getAngle(d) + ")"; }) // pour améliorer la lisibilité (certains sont à l'envers pas contre, je chercher encore la solution)
               .attr("dy", 5) 
               .style("text-anchor", "start")
            .text(function(d) { return Math.round(d.data.Sales*100)/100 + " mio"; })

            //rotation pour améliorer la lisibilité ?
            //var i = 0;
            //var timeInterval = 1000;
            //setInterval(function(){
                    //i += 1;
                    //update(i % 360) 
            //},timeInterval);

            //var n;
            // update the element
            //function update(n) {
            // rotate the text
            //svg.select("#mypiechart")
            //.attr("transform", "translate(720,300) rotate("+n+")");
            //}
        });

    var Tooltip = d3.select('#main')
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("z-index", "10")
    .style("visibility", "hidden")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    
    
    // les fonctions pour faire cela
    let mouseover = function(d) {
        Tooltip
        .style("visibility", "visible")
        d3.select(this)
        .style("stroke", "black")
        .style('stroke-width', 2)
        .style("opacity", 1)
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
        })
        }

    let mousemove = function(d) {
        Tooltip
        .html("TOP 3 des meilleurs jeux : " + d.Names )
        .style("left", 900 + "px")     
        .style("top", 500 + "px")
        }

    let mouseleave = function(d) {
        Tooltip
        .style("visibility", "hidden")
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
        } 

        //transition plus smooth
        d3.select("#mypiechart")
        .transition()
        .duration(800)
        .attr("opacity", 1)
}