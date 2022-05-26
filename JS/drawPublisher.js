function drawPublisher(year, country) {


    var svg = d3.select("svg"),
        width = 300,
        height = 300,
        radius = Math.min(width, height) / 2;

    //à chaque appel de la fonction je supprime la variable g, qui représente le piechart, pour éviter que les nouveaux piecharts se superposent
    d3.select("#mypiechart").remove();

    
    var g = svg.append("g")
               .attr("transform", "translate(" + window.innerWidth / 2 + "," + (((window.innerHeight*0.9) / 2)+100) + ")")
               .attr("id", "mypiechart");

    var color = d3.scaleOrdinal(['#4daf4a','#377eb8','#ff7f00','#984ea3','#e41a1c', '#ad783e']);

    var pie = d3.pie().value(function(d) { 
        return d.Sales; 
    }).sort(null);

    var path = d3.arc()
             .outerRadius(radius - 10)
             .innerRadius(0);

    var label = d3.arc()
              .outerRadius(radius)
              .innerRadius(radius - 80);

    
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
                   .attr("class", "arc")

        console.log(data.Publisher)
        arc.append("path")
           .attr("d", path)
           .attr("fill", function(d) { return color(d.data.Publisher); })
           .attr("opacity", 0.8);       
        
           arc.append("text")
           .attr("transform", function(d) { 
                    return "translate(" + label.centroid(d) + ")"; 
            })
           .text(function(d) { return d.data.Publisher; });
        });


}