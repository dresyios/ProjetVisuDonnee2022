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
            'USA': [0.14, 0.31],
            'Japon': [0.86, 0.32],
            'Royaume-Uni': [0.431, 0.23],
            'France': [0.444, 0.27],
            'Canada': [0.15, 0.22],
            'Russie': [0.7, 0.18],
            'Italie': [0.474, 0.29],
            'Allemagne': [0.464, 0.24],
            'Pays-Bas': [0.452,0.234],
            'Hong Kong': [0.795,0.419],
            'Belgique': [0.451, 0.243],
            'République Tchèque': [0.48, 0.25],
            'Autriche': [0.48, 0.26],
            'Corée du Sud': [0.825, 0.33],
            'Danemark': [0.464, 0.21],
            'Vietnam': [0.781,0.47],
            'Luxembourg': [0.454,0.248],
            'Lituanie': [0.503,0.215],
            'Norvège': [0.464,0.18],
            'Pologne': [0.49, 0.236],
            'Suède': [0.48, 0.18],
            'Australie': [0.86, 0.7],
            'Brésil': [0.26,0.62],
        };

        let totalYear = d3.sum(dataYear, d => d.Sales) //obtenir le total des ventes pour chaque année

        // FONCTIONNALITE : mettre le cercle en évidence et afficher des infos quand on passe la souris dessus
        var Tooltip = d3.select('#main')
            .append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("z-index", "12")
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
            .attr('r',  (d) => Math.sqrt((d.Sales*100)/totalYear)*12)

            d3.select(".Total").html("Total des ventes cette année: " +totalYear.toFixed(2)+" millions de jeux")
                        
        })
        
}