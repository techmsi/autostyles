<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Automatic Style Guide - {{title}}</title>
  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/autostyles.css">
  <link rel="stylesheet" href="css/{{title}}">
</head>
<body>
  <h1 class="autostyles-h1">Automatic Style Guide / {{title}}</h1>
  <a href="index.html" class="autostyles-button">Back</a>
  {%- for rule in rules -%}
  {% set show = 'closed' if not loop.first %}
    {%- for tag in rule.selectors -%}
    <h2 class="autostyles-block-title">{{tag.selector}}
      {%- if (tag.state != 'none') -%}
      <span>{{tag.state}}</span>
      {%- endif -%}
      </h2>
    <div class="autostyles-block {{ show }}">
      <div class="autostyles-tag">
        <{{tag.selector}}{%- if (tag.state != 'none') %} class="{{tag.state}}"{%- endif -%}>
        {%- if (tag.selector == 'p') or (tag.selector == 'div') or (tag.selector == 'section') or (tag.selector == 'article') %}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo debitis ipsum qui nesciunt sapiente explicabo quod laboriosam sed maxime voluptas at amet ducimus eligendi, et labore dolore, nihil natus expedita.
        {%- else -%}
          Lorem ipsum
        {%- endif -%}
        </{{tag.selector}}>
      </div>
    {%- endfor -%}

  <pre class="autostyles-code">
   <code>
    {%- for declaration in rule.declarations -%}
      <span class="autostyles-attr">{{declaration.property}}:</span><span class="autostyles-val">{{declaration.value}}</span>;
      <br>
    {%- endfor -%}
    </code>
  </pre>

  </div>
  {%- endfor -%}

  <script type="text/javascript" src="css/autostyles.js"></script>
</body>
</html>
