
var listName = "listId";
var configName = "dir_config.json";
var dirSpan = 6;

// Obtain JSON configuration file
var path       = window.location.pathname;
var pathList   = path.split("/");
var page       = pathList.pop();
var listFile = path.replace(page,"") + "config/" + configName;

var listPromise = jQuery.getJSON(listFile);

listPromise.then(
    function(result) {

	var dirEnd   = result.list.length;
	var dirStart = dirEnd - dirSpan;

	for( var i = dirStart; i < dirEnd; i++){

	    addLinkList(listName,result.list[i]);
	}
    },
    function(error){
        console.log(error);
    }
);

function addLinkList(listName,listEl) {

    var node = document.createElement("a");

    node.setAttribute('href',listEl + '/index.html');
    node.innerHTML = "Results up to " + listEl.split("/").pop().replace("dir_","");

    document.getElementById(listName).appendChild(document.createElement('br'));
    document.getElementById(listName).appendChild(node);
};
