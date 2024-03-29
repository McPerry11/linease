@if (isset($username) || Request::is('logs') || Request::is('accounts'))
{{-- Profile Navbar & Logs Navbar --}}
<nav class="navbar is-fixed-top">
	<div class="navbar-brand">
		<a href="{{ Request::is('logs') || Request::is('accounts') ? route('dashboard') : $previousPage }}" id="back" class="navbar-item has-text-white">
			<i class="fas fa-chevron-left"></i>
		</a>
		<div class="content navbar-item">
			<h3 class="has-text-white"></h3>
		</div>
	</div>
</nav>

@else
{{-- Dashboard Navbar --}}
<div id="navbar">
	<div class="content">
		<h4 class="has-text-white">MAP</h4>
	</div>
	@if (!(new \Jenssegers\Agent\Agent)->isDesktop())
	<nav class="navbar is-fixed-top">
		<div class="navbar-brand">
			<div class="navbar-item"></div>
			<a class="navbar-burger is-marginless">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div id="nb-mobile" class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="{{ url(Auth::user()->username) }}"><span class="icon"><i class="fas fa-user"></i></span>Profile</a>
				@if (Auth::user()->type != 'USER')
				@if (Auth::user()->type == 'ADMIN' || Auth::user()->type == 'SUPER')
				<a class="navbar-item" href="{{ url('accounts') }}"><span class="icon"><i class="fas fa-users"></i></span>Accounts</a>
				@endif
				<a class="navbar-item" href="{{ url('logs') }}"><span class="icon"><i class="fas fa-stream"></i></span>Logs</a>
				@endif
				{{-- <a class="navbar-item" href="{{ url('settings') }}"><span class="icon"><i class="fas fa-cog"></i></span>Settings</a> --}}
				<a class="navbar-item has-text-danger" data-id="logout"><span class="icon"><i class="fas fa-sign-out-alt"></i></span>Logout</a>
			</div>
		</div>
	</nav>
	@else
	<nav class="navbar is-fixed-top has-text-centered">
		<div class="navbar-brand">
			<div class="navbar-item"></div>
			<a class="navbar-burger is-marginless">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div id="nb-mobile" class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item has-text-danger" data-id="logout"><span class="icon"><i class="fas fa-sign-out-alt"></i></span>Logout</a>
			</div>
		</div>
	</nav>
	@endif
</div>
<form action="{{ route('logout') }}" method="POST" id="logout" hidden>
	@csrf
</form>
@endif

@if(isset($page))
<script id="navbar-back" data-link="{{ $page }}"></script>
@endif
