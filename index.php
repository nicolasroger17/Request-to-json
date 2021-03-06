<?php
    
    $whitelist = array(
        '127.0.0.1',
        '::1',
        'localhost'
    );

    $path = "";
    if(in_array($_SERVER['HTTP_HOST'], $whitelist))
        $path = "/Request-to-json";
?>

<html>
    <!-- v2 -->
    <head>
    	<title>Request to JSON</title>
    	<link rel="stylesheet" type="text/css" <?php echo "href='" . $path . "/css/bootstrap/css/bootstrap.min.css'"; ?>>
    	<link rel="stylesheet" type="text/css" <?php echo "href='" . $path . "/css/style.css'"; ?>>
        <link rel="icon" type="image/png" <?php echo "href='" . $path . "/favicon.png'"; ?> />
    </head>
    <body>
    	<div class="jumbotron">
          <div class="container">
            <h1>Request to JSON</h1>
          </div>
        </div>
        <div class="container">
        	<div class="form-group f1">
        		<h3>Request:</h3>
        		<textarea id="req" class="form-control" rows="11"></textarea>
        	</div>
        	<div class="form-group f2">
        		<h3>Params:</h3>
        		<div class='paramType'>
    	    		<label>GET: <input type='radio' name='param' value='get' checked></label>
    	    		<label>POST: <input type='radio' name='param' value='post'></label>
    	    	</div>
        		<textarea id="param" class="form-control" rows="9"></textarea>
        	</div>
        	<div style='clear:both'></div>
        	<button id="transform" class="btn btn-primary">Transform</button>
        
        	<div class="form-group f3">
        		<h3>JSON:</h3>
        		<textarea id="head" class="form-control" rows="12"></textarea>
        	</div>
            <button id="copy" title="Copy header" data-clipboard-target='head' class="btn btn-primary">Copy to clipboard</button>
        </div>
        <script type="text/javascript" <?php echo "src='" . $path . "/js/jquery.js'"; ?>></script>
    	<script type="text/javascript" <?php echo "src='" . $path . "/js/zeroclipboard/dist/ZeroClipboard.min.js'"; ?>></script>
    	<script type="text/javascript" <?php echo "src='" . $path . "/js/js.js'"; ?>></script>
    </body>
</html>