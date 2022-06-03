function drawTOP(publisher) {


    var svg = d3.select("svg"),
        width = 300,
        height = 300,
        radius = Math.min(width, height) / 2;
    

    var g = svg.append("g")
               .attr("transform", "translate(" + (window.innerWidth / 2) + 200 + "," + (((window.innerHeight*0.9) / 2)+50) + ")")
               .attr("id", "mytop3")
               .attr('opacity', 1);


    
    d3.csv("dataset3.csv", function(error, data) {
        if (error) {
            throw error;
        }

        let dataGames = data.filter(function(d)
        { 
        if(d["Publisher"] == publisher) { 
            return d;
        } 
        })

        });

}