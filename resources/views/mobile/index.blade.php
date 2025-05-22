<html>
<head>
    <title>{{ config('app.name') }} | Mobile API's Swagger</title>
    <link href="{{asset('swagger/style.css')}}" rel="stylesheet">
</head>
</head>
<body>
<div id="swagger-ui"></div>
</body>
<script src="{{asset('swagger/swagger-bundle.js')}}"></script>
<script type="application/javascript">
    const ui = SwaggerUIBundle({
        url: "{{ asset('mobile/m1/openapi.yaml') }}",
        dom_id: '#swagger-ui',
    });
</script>
</html>