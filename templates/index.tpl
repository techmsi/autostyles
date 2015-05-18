<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Automatic Style Guide</title>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/autostyles.css">
  {%- for item in menu -%}
  <link rel="stylesheet" href="css/{{item}}">
  {%- endfor -%}
</head>
<body>
  <h1 class="autostyles-h1">Automatic Style Guide</h1>

  <nav>
  {%- for item in menu -%}
    <a href="page{{loop.index0}}.html" class="autostyles-button">{{item}}</a>
  {%- endfor -%}
  </nav>

  <script type="text/javascript" src="css/autostyles.js"></script>
</body>
</html>
