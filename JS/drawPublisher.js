function drawPublisher(year, country) {


        var svg = d3.select("svg"),
            width = 400,
            height = 400,
            radius = Math.min(width, height) / 2;
        
        var g = svg.append("g")
                   .attr("transform", "translate(" + svgWidth / 2 + "," + svgHeight / 2 + ")");

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
                       .attr("class", "arc");
            console.log(data.Publisher)
            arc.append("path")
               .attr("d", path)
               .attr("fill", function(d) { return color(d.data.Publisher); });        
            
               arc.append("text")
               .attr("transform", function(d) { 
                        return "translate(" + label.centroid(d) + ")"; 
                })
               .text(function(d) { return d.data.Publisher; });
            });


}