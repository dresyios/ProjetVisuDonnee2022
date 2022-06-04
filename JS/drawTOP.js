function drawTOP(year, country, publisher) {

    d3.csv("dataset3.csv", function(error, data) {
        if (error) {
            throw error;
        }
        
    let dataTOP = data.filter(function(d)
    { 
    if(d["Year"] == year && d["Country"] == country && d["Publisher"] == publisher) { 
    return d;
    } 
    })
    
    console.log(dataTOP)
    })
}
