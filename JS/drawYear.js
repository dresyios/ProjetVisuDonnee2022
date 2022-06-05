function drawYear(year) { //fonction pour cercles rouges
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
            'USA': [0.19, 0.28],
            'Japon': [0.86, 0.30],
            'Royaume-Uni': [0.467, 0.21],
            'France': [0.48, 0.24],
            'Canada': [0.19, 0.1806],
            'Russie': [0.6, 0.2],
            'Italie': [0.5, 0.3],
            'Allemagne': [0.5, 0.21],
            'Pays-Bas': [0.48,0.21],
            'Hong Kong': [0.75,0.7],
            'Belgique': [0.47, 0.22],
            'République Tchèque': [0.54, 0.21],
            'Autriche': [0.54, 0.22],
            'Corée du Sud': [0.8, 0.3],
            'Danemark': [0.5, 0.15],
            'Vietnam': [0.75,0.4],
            'Luxembourg': [0.49,0.21],
            'Lituanie': [0.55,0.15],
            'Norvège': [0.5,0.1],
            'Pologne': [0.55, 0.25],
            'Suède': [0.52, 0.1],
            'Australie': [0.86, 0.9],
            'Brésil': [0.20,0.9],
        };

        let totalYear = d3.sum(dataYear, d => d.Sales) //obtenir le total des ventes pour chaque année

        // FONCTIONNALITE : mettre le cercle en évidence et afficher des infos quand on passe la souris dessus
        var Tooltip = d3.select('#main')
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden")
            .style("background-color", "white") //paramètres de la box
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
            .style("stroke-width",2)
            .style("opacity", 0.9)
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
            d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
            //drawPublisher(year, d.Country)
            //d3.select("#mypiechart").remove();
        }

        let values = dataYear.map(function(d) { return d.Country; });
        console.log("Values: ", values)

        // création du canevas
        canevas1.append('g').selectAll('circle')
        .data(dataYear)
        .enter()
        .append('circle')
            .attr('id', 'mouseovercercle')
            .attr('cx', (d) => (dictloc[d.Country][0])*1600)
            .attr('cy', (d) => (dictloc[d.Country][1])*800)
            .attr('r', 0)
            .attr("id", (d) => d.Country)
            .style('fill',(d,i) => d3.schemeCategory10[i]) //une couleur par bulle
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

            d3.select(".Total").html("Total des ventes cette année: " +totalYear.toFixed(2)+" millions de jeux")
                        
        })
        
}