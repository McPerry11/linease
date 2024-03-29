<!DOCTYPE html>
<html lang="en" class="has-navbar-fixed-top">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="csrf-token" content="{{ csrf_token() }}">
	<title>LinEase</title>
	@include('_styles')
	@yield('styles')
</head>
<body ondragstart="return false;" ondrop="return false;">
	<div class="pageloader is-success is-bottom-to-top is-active">
		<span class="title"></span>
		<span id="nojs" class="title has-text-centered">JavaScript is off
			<br><span class="details">LinEase requires JavaScript to fully operate.</span>
			<br><span class="details">Turn on JavaScript and try again.</span>
		</span>
	</div>
	@if (!Request::is('login') && !Request::is('register') && !Request::is('camera') && !Request::is('not_found') && !Request::is('desktop'))
	@include('_navbar')
	@endif
	@yield('body')

	@include('_scripts')
	@yield('scripts')
</body>
</html>
