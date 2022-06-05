function drawPublisher(year, country) { //fonction pour piechart


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

    //piecharts
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
    //lier les données
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
           .attr("id", (d) => d.data.Publisher)
           .on("mouseover", mouseover)
           .on("mousemove", mousemove)
           .on("mouseleave", mouseleave)

           arc.append("text") //nom des éditeurs
           .attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")" +
                    "rotate(" + getAngle(d) + ")"; }) // pour améliorer la lisibilité (certains sont à l'envers pas contre, je chercher encore la solution)
            .attr("dy", 5) 
            .style("text-anchor", "start")
            .text(function(d) { return d.data.Publisher; }); 
           
            arc.append("text") //nb de ventes par éditeur
            .attr("transform", function(d) { 
                       return "translate(" + labelVal.centroid(d) + ")" +
                       "rotate(" + getAngle(d) + ")"; }) // pour améliorer la lisibilité (certains sont à l'envers pas contre, je chercher encore la solution)
               .attr("dy", 5) 
               .style("text-anchor", "start")
            .text(function(d) { return Math.round(d.data.Sales*100)/100 + " mio"; })
            .attr("id", (d) => d.data.Publisher)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

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

    //afficher le top 3 des meilleurs jeux par éditeur quand on passe la souris dessus
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
    }

    let mousemove = function(d) {
        let publisherpie = d3.select(this).attr("id")
        d3.csv("dataset3.csv", function(error2, data2) {
            if (error2) {
                throw error2;
            }
        
            console.log(data2)
            let dataTop = data2.filter(function(d)
            { 
                if(d["Year"] == year && d["Country"] == country && d["Publisher"] == publisherpie) { 
                    console.log("Dans filter")
                    return d;
                } 
            })
    
            let values = dataTop.map(function(d) { return d.Names; });
            if(values.length==1) {
                values.push("Pas de jeu");
                values.push("Pas de jeu");
            }
            else if(values.length==2) {
                values.push("Pas de jeu");
            }

            
            console.log("Publisher pie: ", publisherpie);
            
            if (publisherpie !=  "Autres") {
                Tooltip
                .html("TOP 3 des meilleurs jeux : <br>" + values[0] + "<br>" + values[1] + "<br>" + values[2])
                .style("left", "400px")
                .style("top", "600px")
            }
            else {
                Tooltip
                .html("Pas de jeux à afficher")
                .style("left", "400px")
                .style("top", "600px")
            }

        })
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