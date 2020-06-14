
var arr = [];
var selectedType = "Bug";
var lastSelectedType = ".bug"
d3.select(".bug").style("border", "2px solid black");
var leftPkmSelected = 0;
var rightPkmSelected = 0;
var lastLeftPkmSelected = "";
var lastRightPkmSelected = "";
var rightPkmleftPkm;
var rightPkm;
var searchString = "";

function changeDisplayedPokemons(className, pokemonName){
    if(lastSelectedType == className){
        return;
    } else {
        d3.select(className).style("border", "2px solid black");
        d3.select(lastSelectedType).style("border", "0px solid black");
        lastSelectedType = className
        selectedType = pokemonName;
        displayPokemons(arr);
        var leftBorder = d3.select("#id_" + lastLeftPkmSelected)
        var rightBorder = d3.select("#id_" + lastRightPkmSelected)
        if(leftBorder != null){
            leftBorder.style("border", "1px solid #216fb4").style("border-radius", "50px");
        }
        if(rightBorder !=  null){
            rightBorder.style("border", "1px solid #f2c510").style("border-radius", "50px");
        }
    }  
}
/*
d3.select(".search-btn").on('click', function(d){
    searchString = d3.select("#input").property("value");
    console.log(searchString);
});
*/
d3.select(".bug").on('click', function(d){ 
     changeDisplayedPokemons(".bug", "Bug");
});

d3.select(".dragon").on('click', function(d){ 
    changeDisplayedPokemons(".dragon", "Dragon");
});

d3.select(".ice").on('click', function(d){ 
    changeDisplayedPokemons(".ice", "Ice");
});

d3.select(".fighting").on('click', function(d){ 
    changeDisplayedPokemons(".fighting", "Fighting");
});

d3.select(".fire").on('click', function(d){ 
    changeDisplayedPokemons(".fire", "Fire");
});

d3.select(".flying").on('click', function(d){ 
    changeDisplayedPokemons(".flying", "Flying");
});

d3.select(".grass").on('click', function(d){ 
    changeDisplayedPokemons(".grass", "Grass");
});

d3.select(".ghost").on('click', function(d){ 
    changeDisplayedPokemons(".ghost", "Ghost");
});

d3.select(".ground").on('click', function(d){ 
    changeDisplayedPokemons(".ground", "Ground");
});

d3.select(".electric").on('click', function(d){ 
    changeDisplayedPokemons(".electric", "Electric");
});

d3.select(".normal").on('click', function(d){ 
    changeDisplayedPokemons(".normal", "Normal");
});

d3.select(".poison").on('click', function(d){ 
    changeDisplayedPokemons(".poison", "Poison");
});

d3.select(".psychic").on('click', function(d){ 
    changeDisplayedPokemons(".psychic", "Psychic");
});

d3.select(".rock").on('click', function(d){ 
    changeDisplayedPokemons(".rock", "Rock");
});

d3.select(".water").on('click', function(d){ 
    changeDisplayedPokemons(".water", "Water");
});

d3.select(".steel").on('click', function(d){ 
    changeDisplayedPokemons(".steel", "Steel");
});

d3.select(".fairy").on('click', function(d){ 
    changeDisplayedPokemons(".fairy", "Fairy");
});

d3.csv("./Kaggle/Pokemon.csv", function(data) {
    return {
        Name : data.Name,
        Type1 : data.Type1,
        Type2 : data.Type2,
        Total : data.Total,
        HP : data.HP,
        Attack : data.Attack,
        Defense : data.Defense,
        SpAtk : data.SpAtk,
        SpDef : data.SpDef,
        Speed : data.Speed,
      };
}).then(function(data) {
    for(var x in data){
        arr.push(data[x]);
    }
    displayPokemons(arr);
});

function displayPokemons(data){
    d3.select('.pokemons').selectAll('div').remove();
    var pokemons = d3.select('.pokemons').selectAll('div').data(data.filter(function(d){
        if(d.Type1 == selectedType || d.Type2 == selectedType){
            return d;
        }
    })).enter().append('div').style("cursor", "pointer").style("margin-bottom", "15px").attr("class", function(d){
        if(d.Type1 == selectedType || d.Type2 == selectedType){
            return "col-6 col-sm-3 col-md-2 col-xl-1 d-flex justify-content-center" + d.Name;
        }   
    }).attr("id", function(d){
        return "id_" + d.Name;
    })
    .on('click', function(d){
        if(leftPkmSelected == 0 || rightPkmSelected == 1 && d.Name != lastRightPkmSelected && d.Name != lastLeftPkmSelected){
            d3.select(".featured-pkm-image-left").attr("src", "./Kaggle/images/" + d.Name + ".png");
            d3.select("#id_" + d.Name).style("border", "1px solid #216fb4").style("border-radius", "50px");
            d3.select("#id_" + lastLeftPkmSelected).style("border", "0px solid #216fb4").style("border-radius", "50px");
            d3.select("#left-pkm-hp").text("HP: " + d.HP);
            d3.select("#left-pkm-attack").text("Attack: " + d.Attack);
            d3.select("#left-pkm-defense").text("Defense: " + d.Defense);
            d3.select("#left-pkm-sp-atk").text("SpAtk: " + d.SpAtk);
            d3.select("#left-pkm-sp-def").text("SpDef: " + d.SpDef);
            d3.select("#left-pkm-speed").text("Speed: " + d.Speed);
            lastLeftPkmSelected = d.Name;
            leftPkm = [d.HP, d.Attack, d.Defense, d.SpAtk, d.SpDef, d.Speed];
            leftPkmSelected = 1;
            rightPkmSelected = 0;
        } else if(rightPkmSelected == 0 && leftPkmSelected == 1 && d.Name != lastLeftPkmSelected && d.Name != lastRightPkmSelected) {
            d3.select(".featured-pkm-image-right").attr("src", "./Kaggle/images/" + d.Name + ".png");
            d3.select("#id_" + d.Name).style("border", "1px solid #f2c510").style("border-radius", "50px");
            d3.select("#id_" + lastRightPkmSelected).style("border", "0px solid #f2c510").style("border-radius", "50px");
            d3.select("#right-pkm-hp").text("HP: " + d.HP);
            d3.select("#right-pkm-attack").text("Attack: " + d.Attack);
            d3.select("#right-pkm-defense").text("Defense: " + d.Defense);
            d3.select("#right-pkm-sp-atk").text("SpAtk: " + d.SpAtk);
            d3.select("#right-pkm-sp-def").text("SpDef: " + d.SpDef);
            d3.select("#right-pkm-speed").text("Speed: " + d.Speed);
            rightPkm = [d.HP, d.Attack, d.Defense, d.SpAtk, d.SpDef, d.Speed];
            lastRightPkmSelected = d.Name;
            rightPkmSelected = 1;
        }

        
        if(leftPkm != null && rightPkm != null){
            d3.select("svg").remove();
            /*var graphData = {
                lastLeftPkmSelected: {HP: leftPkm[0], Attack: leftPkm[1], Defense: leftPkm[2], SpAtk: leftPkm[3], SpDef: leftPkm[4], Speed: leftPkm[5]},
                lastRightPkmSelected: {HP: rightPkm[0], Attack: rightPkm[1], Defense: rightPkm[2], SpAtk: rightPkm[3], SpDef: rightPkm[4], Speed: rightPkm[5]}
            };*/
            const groupData = [
                { key: 'HP', values:
                                [
                                    {grpName: lastLeftPkmSelected, grpValue:leftPkm[0]},
                                    {grpName: lastRightPkmSelected, grpValue:rightPkm[0]},
                                ]
                },
                { key: 'Attack', values:
                                [
                                    {grpName: lastLeftPkmSelected, grpValue:leftPkm[1]},
                                    {grpName: lastRightPkmSelected, grpValue:rightPkm[1]},
                                ]
                },
                { key: 'Defense', values:
                                [
                                    {grpName: lastLeftPkmSelected, grpValue:leftPkm[2]},
                                    {grpName: lastRightPkmSelected, grpValue:rightPkm[2]},
                                ]
                },
                { key: 'SpAtk', values:
                                [
                                    {grpName: lastLeftPkmSelected, grpValue:leftPkm[3]},
                                    {grpName: lastRightPkmSelected, grpValue:rightPkm[3]},
                                ]
                },
                { key: 'SpDef', values:
                                [
                                    {grpName: lastLeftPkmSelected, grpValue:leftPkm[4]},
                                    {grpName: lastRightPkmSelected, grpValue:rightPkm[4]},
                                ]
                },
                { key: 'Speed', values:
                                [
                                    {grpName: lastLeftPkmSelected, grpValue:leftPkm[5]},
                                    {grpName: lastRightPkmSelected, grpValue:rightPkm[5]},
                                ]
                }];
            var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = 400 - margin.left - margin.right,
            height = 360 - margin.top - margin.bottom;


            var x0  = d3.scaleBand().rangeRound([0, width], .5);
            var x1  = d3.scaleBand();
            var y   = d3.scaleLinear().rangeRound([height, 0]);
        
            var xAxis = d3.axisBottom().scale(x0)
                                        .tickFormat(function(d, i){return groupData[i].key})
                                        .tickValues(groupData.map(d=>d.key));
        
            var yAxis = d3.axisLeft().scale(y);
        
            const color = d3.scaleOrdinal(['#216fb4', '#f2c510']);

            var svg = d3.select('.histogram').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .classed("border", true)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var categoriesNames = groupData.map(function(d) { return d.key; });
            var rateNames       = groupData[0].values.map(function(d) { return d.grpName; });
            
            x0.domain(categoriesNames);
            x1.domain(rateNames).rangeRound([0, x0.bandwidth()]);
            y.domain([0, d3.max(groupData, function(key) { return d3.max(key.values, function(d) { return d.grpValue; }); })]);

            svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);


            svg.append("g")
            .attr("class", "y axis")
            .style('opacity','0')
            .call(yAxis)
                .append("text")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", ".71em")
                    .style("text-anchor", "end")
                    .style('font-weight','bold')
                    .text("Value");

            svg.select('.y').transition().duration(500).delay(1300).style('opacity','1');

            var slice = svg.selectAll(".slice")
            .data(groupData)
            .enter().append("g")
            .attr("class", "g")
            .attr("transform",function(d) { return "translate(" + x0(d.key) + ",0)"; });

            slice.selectAll("rect")
            .data(function(d) { return d.values; })
                .enter().append("rect")
                    .attr("width", x1.bandwidth())
                    .attr("x", function(d) { return x1(d.grpName); })
                    .style("fill", function(d) { return color(d.grpName) })
                    .attr("y", function(d) { return y(0); })
                    .attr("height", function(d) { return height - y(0); })
                    .on("mouseover", function(d) {
                        d3.select(this).style("fill", d3.rgb(color(d.grpName)).darker(2));
                    })
                    .on("mouseout", function(d) {
                        d3.select(this).style("fill", color(d.grpName));
                    });


            slice.selectAll("rect")
            .transition()
            .delay(function (d) {return Math.random()*1000;})
            .duration(1000)
            .attr("y", function(d) { return y(d.grpValue); })
            .attr("height", function(d) { return height - y(d.grpValue); });

                //Legend
            var legend = svg.selectAll(".legend")
                .data(groupData[0].values.map(function(d) { return d.grpName; }).reverse())
            .enter().append("g")
                .attr("class", "legend")
                .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
                .style("opacity","0");

            legend.append("rect")
                .attr("x", width - 18)
                .attr("width", 18)
                .attr("height", 18)
                .style("fill", function(d) { return color(d); });

            legend.append("text")
                .attr("x", width - 24)
                .attr("y", 9)
                .attr("dy", ".35em")
                .style("text-anchor", "end")
                .style("font-family", "monospace")
                .text(function(d) {return d; });

            legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");
        }       
    })
    pokemons.append("img").attr("src", function(d) {   
        if(d.Type1 == selectedType || d.Type2 == selectedType){
            return "./Kaggle/images/" + d.Name + ".png";
        }     
    }).style("width", "100px").style("height", "100px");
    pokemons.append("span").style("position", "absolute").style("top", "95%").style("left", "25%").style("font-family", "monospace").text(function(d){
        if(d.Type1 == selectedType || d.Type2 == selectedType){
            return d.Name;
        }
    });

}


