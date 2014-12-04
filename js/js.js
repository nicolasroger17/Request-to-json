$(document).ready(function(){
	$("#transform").click(function(){
		parseRequest();
	});

	var clip = new ZeroClipboard($("#copy"));

	clip.on("ready", function() {

		/*
		this.on("beforecopy", function(event) {
			parseRequest();
		});
		*/

		clip.on("error", function(event) {
		ZeroClipboard.destroy();
		});

	});
});

var url;

function parseRequest(){
	url = ["http://",""];
	var requestInfo = "requestInfos = {\n";
	requestInfo += "\t'url': '";

	var tempReq = "',\n";
	tempReq += "\t'method': '" + $("input[name='param']:checked").val().toUpperCase() + "',\n";
	tempReq += parseHeader();

	if(url[0] != "" && url[1] != "")
		requestInfo += url[0] + url[1];
	requestInfo += tempReq;

	var params = $("#param").val();
	if(params != "")
		requestInfo += parseParam();

	requestInfo += "}";
	$("#head").val(requestInfo);
}

function parseHeader(){
	var header = "\t'headers': {\n";
	var lines = $("#req").val().split('\n').clean("");

	for(var i = 0; i < lines.length; i++){
		if(i == 0 && (lines[0].split(" ")[0] == "GET" || lines[0].split(" ")[0] == "POST")){
			setUrl(lines[0].split(" ")[1].split("?")[0], false);
			continue;
		}
		var p = parseLine(lines[i], 2);
		if(p != false)
			header += p;
	}
	header = header.slice(0, header.length - 2) + "\n\t},\n";
	return header;
}

function setUrl(value, isHost){
	if(isHost)
		url[0] += value;
	else
		url[1] += value;
}

function parseParam(){
	var ret = "";

	if($("input[name='param']:checked").val() == "get")
		ret += "\t'params': {\n";
	else
		ret += "\t'payload': {\n";

	lines = $("#param").val().split('\n').clean("");

	for(var i = 0; i < lines.length; i++){
		var p = parseLine(lines[i], 2);
		if(p != false)
			ret += p;
	}

	ret = ret.slice(0, ret.length - 2) + "\n\t}\n";
	return ret;
}

function parseLine(line, nbTabs){
	var data = line.split(":");
	var ret = "";
	for(var i = 0; i < nbTabs; i++)
		ret += "\t";
	ret += "'";

	if(data[1][0] == " ")
		data[1] = data[1].replace(" ", "");
	if(data[0] == "Host")
		setUrl(data[1], true);
	if(data[0] != "" && data[0] != "Connection" && data[0] != "Host" && data[0] != "Cookie"){
		ret += data[0] + "': '";
		for(var i = 1; i < data.length; i++){
			if(i > 1)
				ret += ":";
			ret += data[i];
		}
		ret += "',\n";
		return ret;
	}
	return false;
}

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};