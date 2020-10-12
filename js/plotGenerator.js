
function plotGenerator(config) {

    reqPlot(["plotly"],function(Plotly) {
        var idChart = document.getElementById(config["chartName"]);
        var promise = jQuery.getJSON(config.dataFile);

        promise.then(
            function(result){
                        
                let shapeObj = [''];
                if ("future" in config) {
                    shapeObj = setShape(result);
                }

                configPlot(result, config, shapeObj);

                Plotly.newPlot(idChart, result.data, result.layout, result.config);
            },
            function(error){
                console.log(error);
            });
    });
};


function configPlot(result,config,shapeObj) {

    if ("mode" in config) {
        result.data.mode= config.mode;
    }; 

    if ("type" in config) {
        result.data.type= config.type;
    }; 

    if ("line_shape" in config) {
        result.data.line = {shape: config.line_shape};
    };

    if ("visible" in config) {
        for (i = 0; i < result.data.length; i++) {
            result.data[i].visible= config.visible[i];
        };
    };

    if ("threshold" in config) {

        for (const [key, value] of Object.entries(config.threshold)) {

            var lineObj = { type:"line",
                            xref:"paper",
                            yref:"y",
                            x0:0,
                            y0:value,
                            x1:1,
                            y1:value,
                            line:{
                                color:"rgb(0,0,0)",
                                width:3
                            }
                          };

            shapeObj.push(lineObj);
        };
    };

    if (! "xVals" in config) {
        config.xVals = "";
    };

    if (! "xText" in config) {
        config.xText = "";
    };

    if (! "yVals" in config) {
        config.yVals = "";
    };

    if (! "yText" in config) {
        config.yText = "";
    };

    if (! "yRange" in config) {
        config.yRange = "";
    };

    var showLeg = true
    if ( "showlegend" in config) {
	showLeg = config.showlegend;
    };

    // Setup the layout with a grey zone from from now to the end of the graph
    result.layout = {
        title: config.titleLabel,
        xaxis: {
            title: config.xCaption,
            tickvals: config.xVals,
            ticktext: config.xText
        },
        yaxis:{
            title: config.yCaption,
            tickvals: config.yVals,
            ticktext: config.yText,
            exponentformat: "e",
            zeroline: false,
            range: config.yRange
        },
        shapes : shapeObj,
        autosize: true,
	showlegend: showLeg,
        legend: {
            "orientation": "h"
        },
        margin: {
            l: 60,
            r: 20,
            b: 20,
            t: 40
        }
    };

    result.config = { responsive: true};

};


function setShape(result) {

    var today = new Date();
    var dd = String(today.getDate());
    var mm = ("0" + (today.getMonth() + 1)).slice(-2); //January is 0!
    var yyyy = today.getFullYear();
    var xMax;
    var todayCal = yyyy + '-' + mm + '-' + dd + 'T00:00:00.000';

    // Initialize the arrays
    var yArrayMin = [];
    var yArrayMax = [];
    var xArrayMax = [];
    var fileteredxArrayMax = [];
    var dateArray = [];

    // Get the max, min of y and last element of x
    result.data.forEach( function(element, index, array) {
        yArrayMin.push(Math.min(... element["y"]));
        yArrayMax.push(Math.max(... element["y"]));
        xArrayMax.push(element["x"][element["x"].length-1]);
    });

    var fileteredxArrayMax = xArrayMax.filter(Boolean);

    // Create an array with UNIX time
    fileteredxArrayMax.forEach( function(element, index, array) {
        dateArray.push(Date.parse(element))
    });

    // Get the maximum string time 
    xMax = fileteredxArrayMax[dateArray.indexOf(Math.max(... dateArray))];

    if (Date.parse(today) > dateArray[dateArray.indexOf(Math.max(... dateArray))]) {
        shapeObj = ['']
    } else {
        shapeObj = [
            {
                fillcolor: '#ccc',
                line: {
                    width:0
                },
                opacity: 0.5,
                type: 'rect',
                x0: todayCal,
                x1: xMax,
                xref: 'x',
                y0: Math.min(... yArrayMin),
                y1: Math.max(... yArrayMax),
                yref: 'y',
                z: -2000,
                layer: 'below'
            }
        ]
    };

    return shapeObj

};
