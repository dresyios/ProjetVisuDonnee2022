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

    var Tooltip = d3.select('#main')
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "-100")
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
        }

    let mousemove = function(d) {
        Tooltip
        .html("TOP 3 des ventes: " + d.Names + "<br> Ventes totales : " + d.Sales + " millions d'unités") //+ "<br> Id:" + d3.select(this).attr("id"))
        .style("top",  (d3.mouse(this)[1]) + "px")
        .style("left", (d3.mouse(this)[0]) + "px")
        }

    let mouseleave = function(d) {
        Tooltip
        .style("visibility", "hidden")
        d3.select(this)
        .style("stroke", "none")
        .style("opacity", 0.8)
        }
    
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
           .attr("id", "path")
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
        });

        //transition plus smooth
        d3.select("#mypiechart")
        .transition()
        .duration(800)
        .attr("opacity", 1)
        .append('text')
}