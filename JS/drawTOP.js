function drawTOP(year, country, publisher) { //fonction provisoire
    //console.log("Year: ", year, " country: ", country, " publisher: ", publisher)
    d3.csv("dataset3.csv", function(error2, data2) {
        if (error2) {
            throw error2;
        }
    
        console.log(data2)
        let dataTop = data2.filter(function(d)
        { 
            if(d["Year"] == year && d["Country"] == country && d["Publisher"] == publisher) { 
                console.log("Dans filter")
                return d;
            } 
        })

        let values = dataTop.map(function(d) { return d.Names; });
        console.log("Values: ", values);
        return values;

    })
    //console.log("Hors d3")
}