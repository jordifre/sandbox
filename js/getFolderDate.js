var path = window.location.pathname;
var pathList = path.split("/");
var page = pathList.pop();
var dir  = pathList.pop();
var date = dir.replace("dir_","").replace(".html","");

document.getElementById("folderDate").innerHTML = date;
document.title = mission + " AOCS Monitoring - Results up to " + date

for (i = 0 ; i < plotList.length; i++){
    (function() {
	var myId = document.getElementById(plotList[i] + "Plot")
	if (myId) {
            document.getElementById(plotList[i] + "Plot").setAttribute("href", date + "_" + plotList[i] + ".png");
	}
    })();
    (function() {
	var myInteractive = document.getElementById(plotList[i] + "Interactive")
	if (myInteractive) {
            document.getElementById(plotList[i] + "Interactive").setAttribute("href", "interactive/" + plotList[i] + ".html");
	}
    })();
    (function() {
        document.getElementById(plotList[i] + "SrcPlot").setAttribute("src", date + "_" + plotList[i] + ".png");
    })();
}
