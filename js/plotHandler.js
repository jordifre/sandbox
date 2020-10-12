

// Obtain JSON configuration file
var path       = window.location.pathname;
var pathList   = path.split("/");
var page       = pathList.pop();

// If page not specified the index.html is automatically loaded
// this will create a wrong configFile
if (page == ""){
    page = "index.html"
};
var configFile = path.replace(page,"") + "config/" + page.replace(".html","_config.json");

// Obtain JSON data and plot it
var objs = new Array();

var plotData = jQuery.getJSON(configFile, function(data) {
    jQuery.each(data, function(key, val){
        objs.push(new plotGenerator(val));
    });
})


