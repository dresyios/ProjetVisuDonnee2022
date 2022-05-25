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

        console.log(dataYear)

        let totalYear = d3.sum(dataYear, d => d.Sales)
        console.log(totalYear)

        // FONCTIONNALITE : mettre le cercle en évidence et afficher des infos quand on passe la souris dessus
        let Tooltip = d3.select("body")
            .append("g")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        // les fonctions pour faire cela
        let mouseover = function(d) {
            Tooltip
            .style("opacity", 1)
            d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
            drawPublisher(year, d.Country)
        }
        let mousemove = function(d) {
            Tooltip
            .html("Pays :" + d.Country + "<br> Ventes totales sur l'année :" + d.Sales + "<br> Id:" + d3.select(this).attr("id")) //ne fonctionne pas pour l'instant
            .style("top", (d3.mouse(this)[1]) + "px")
            .style("left", (d3.mouse(this)[0]) + "px")
        }
        let mouseleave = function(d) {
            Tooltip
            .style("opacity", 0)
            d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
            drawPublisher(year, d.Country)
            d3.select("#mypiechart").remove();
        }

        // création du canevas
        canevas1.selectAll('circle')
        .data(dataYear)
        .enter()
        .append('circle')
            .attr('id', 'mouseovercercle')
            .attr('cx', (d) => d.LocX)
            .attr('cy', (d) => d.LocY)
            .attr('r',  (d) => Math.sqrt((d.Sales*100)/totalYear)*5)
            .attr('opacity', 0.7)
            .attr("id", (d) => d.Country)
            .style('fill', 'red')
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
                        
        })
}