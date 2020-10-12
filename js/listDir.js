var linkList = ["link1","link2","link3","link4","link5","link6"];
var dirList  = ["dir1" ,"dir2" ,"dir3" ,"dir4" ,"dir5", "dir6" ];

var dirEnd   = listDirData.length - 1;
var dirStart = dirEnd - 6;
var j = 0;

for (i = dirStart ; i < dirEnd; i++){

    var strLink = listDirData[i] + "/index.html";

    document.getElementById(linkList[j]).setAttribute("href",strLink);
    document.getElementById(dirList[j]).innerHTML = "Results up to " + listDirData[i].split("/").pop().replace("dir_","");

    j = j + 1;

}
