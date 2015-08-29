<!DOCTYPE html>
<html>
<head>
<title>Network Tool</title>
<link href="dist/css/bootstrap.min.css" rel="stylesheet">
<link href="dist/css/style.css" rel="stylesheet">
<script src="dist/js/jquery-1.8.3.min.js" type="text/javascript"></script>
<style>
</style>
</head>
<body>
<div class="form-inline" style="width:100%;background:#ecf0f1;padding:5px;box-shadow:0px 1px #bdc3c7;">
    <div class="input-group">
      <input type="text" class="form-control" id="ip" placeholder="IP Address" onkeypress="keyhandler(event)"/>
      <span class="input-group-btn">
        <button type="button" class="btn btn-default" onclick="run();"><span class="glyphicon glyphicon-list-alt" aria-hidden="true"></span></button>
      </span>
    </div>
  <div class="form-group">
    <label for="machine">Machine: <span id="total">0</span>/<span id="max">0</span></label>
  </div>
</div>
<div id="ping"></div>
<script src="dist/js/script.js" type="text/javascript"></script>
</body>
</html>
<!-- Created By: Hangs Breaker -->
