function drawTOP(year, country, publisher) {


    var svg = d3.select("svg"),
        width = 300,
        height = 300,
        radius = Math.min(width, height) / 2;

    //à chaque appel de la fonction je supprime la variable g, qui représente le piechart, pour éviter que les nouveaux piecharts se superposent
    d3.select("#mytop3").remove()
    


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
        if(d["Year"] == year && d["Country"] == country && d["Publisher"] == publisher) { 
            return d;
        } 
        })

        
        g.append('text')
            .data(dataGames)
            .text('TOP 3 GAMES : ' +d.dataGames.Names + " : " + d.dataGames.Sales)



        });

        //transition plus smooth
        d3.select("#mypiechart")
        .transition()
        .duration(800)
        .attr("opacity", 1)
}