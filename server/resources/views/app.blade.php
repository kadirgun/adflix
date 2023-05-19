<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{$link->name}}</title>
  <script>
    window.link = @json($link);
  </script>
</head>

<body>
  <div id="app"></div>
  @vite('resources/vue/app.js')
</body>

</html>