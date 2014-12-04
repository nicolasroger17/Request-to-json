function parseRequest(){
	var header = "headers = {\n";
	var lines = $("#req").val().split('\n').clean("");

	console.log(lines.length);
	for(var i = 1; i < lines.length; i++){
		var p = parseLine(lines[i], false);
		if(p != false)
			header += p;
	}

	var secondInput = $("#param").val();
	if(secondInput != ""){
		if($("input[name='param']:checked").val() == "get")
			header += "\t'params': {\n";
		else
			header += "\t'payload': {\n";

		lines = secondInput.split('\n');
		console.log(lines);
		for(var i = 0; i < lines.length; i++){
			var p = parseLine(lines[i], true);
			if(p != false)
				header += p;
		}
		header += "\t},\n";
	}
	
	header = header.slice(0, header.length - 2) + "\n}";
	$("#head").val(header);
	console.log(header);
}

function parseLine(line, twoTabs){
	var data = line.split(":");
	var ret = (twoTabs?"\t\t'":"\t'");
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