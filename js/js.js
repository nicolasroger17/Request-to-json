function parseRequest(){
	var header = "headers = {\n";
	var lines = $("#req").val().split('\n');

	for(var i = 1; i < lines.length; i++){
		var key = lines[i].substring(0, lines[i].indexOf(":"));
		console.log(key);
		if(key != "" && key != "Connection" && key != "Host" && key != "Cookie")
			header += "\t'" + key + "': '" + lines[i].substring(key.length + 2, lines[i].length) + "',\n";
	}

	var secondInput = $("#param").val();
	console.log(secondInput);
	if(secondInput != ""){
		if($("input[name='param']:checked").val() == "get")
			header += "\t'params': '" + secondInput + "',\n";
		else
			header += "\t'payload': '" + secondInput + "',\n";
	}
	
	header = header.slice(0, header.length - 2) + "\n}";
	$("#head").val(header);
	console.log(header);
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