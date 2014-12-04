function parseRequest(){
	var requestInfo = "requestsInfo = {\n";
	requestInfo += "\t'url: '',\n";
	requestInfo += "\t'method': '" + $("input[name='param']:checked").val() + "',\n";
	requestInfo += parseHeader();

	var params = $("#param").val();
	if(params != "")
		requestInfo += parseParam();
	
	requestInfo += "}";
	$("#head").val(requestInfo);
}

function parseHeader(){
	var header = "\theaders : {\n";
	var lines = $("#req").val().split('\n').clean("");

	for(var i = 1; i < lines.length; i++){
		var p = parseLine(lines[i], 2);
		if(p != false)
			header += p;
	}
	header = header.slice(0, header.length - 2) + "\n\t},\n";

	return header;
}

function parseParam(){
	var ret = "";

	if($("input[name='param']:checked").val() == "get")
			ret += "\t'params': {\n";
		else
			ret += "\t'payload': {\n";

		lines = $("#param").val().params.split('\n').clean("");

		for(var i = 0; i < lines.length; i++){
			var p = parseLine(lines[i], 2);
			if(p != false)
				ret += p;
		}
		ret += "\t}\n";
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
	if(data[0] != "" && data[0] != "Connection" && data[0] != "Host" && data[0] != "Cookie")
		return ret + data[0] + "': '" + data[1] + "',\n";
	return false;
}

$(document).ready(function() {
	var clip = new ZeroClipboard($("#transform"));

	clip.on("ready", function() {

	    this.on("beforecopy", function(event) {
	    	parseRequest();
	    });

	  clip.on("error", function(event) {
	    ZeroClipboard.destroy();
	  });

	});
});

Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};