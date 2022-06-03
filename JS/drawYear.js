function drawYear(year) {
    console.log("hello")
    // lier les données
    d3.csv("dataset.csv", function(error, data) {
        if (error) {
            throw error;
        }

        let dataYear = data.filter(function(d)
        { 
        if(d["Year"] == year) { 
            return d;
        } 
        })

        //FAIRE DICTIONNAIRE PAYS-LOCATIONS
        var dictloc = {
            'us': [0.19, 0.28],
            'jp': [0.86, 0.30],
            'uk': [0.467, 0.21],
            'fr': [0.48, 0.24],
            'ca': [0.19, 0.1806]
        };

        let totalYear = d3.sum(dataYear, d => d.Sales)

        // FONCTIONNALITE : mettre le cercle en évidence et afficher des infos quand on passe la souris dessus
        var Tooltip = d3.select('#main')
            .append("div") //je cherche à faire en sorte que le carré suive la souris...
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
            .style("opacity", 1)
            drawPublisher(year, d.Country)
        }
        let mousemove = function(d) {
            Tooltip
            .html("Pays: " + d.Country + "<br> Ventes totales: " + d.Sales + " millions d'unités") //+ "<br> Id:" + d3.select(this).attr("id"))
            .style("left", (d3.mouse(this)[0]) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
        }
        let mouseleave = function(d) {
            Tooltip
            .style("visibility", "hidden")
            //.style("opacity", 0)
            d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
            //drawPublisher(year, d.Country)
            //d3.select("#mypiechart").remove();
        }

        // création du canevas
        canevas1.selectAll('circle')
        .data(dataYear)
        .enter()
        .append('circle')
            .attr('id', 'mouseovercercle')
            .attr('cx', (d) => (dictloc[d.Country][0])*window.innerWidth)
            .attr('cy', (d) => (dictloc[d.Country][1])*window.innerHeight)
            .attr('r', 0)
            .attr("id", (d) => d.Country)
            .style('fill', 'red')
            .style("stroke-width", 4)
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

            //apparition plus smooth
            d3.selectAll("circle")
            .transition()
            .duration(1000)
            .attr('r',  (d) => Math.sqrt((d.Sales*100)/totalYear)*5)
                        
        })
        
}