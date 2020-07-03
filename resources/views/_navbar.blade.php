{{-- Desktop View --}}
<div class="is-hidden-touch">
	<div class="content">
		<h4 class="has-text-white">MAP</h4>
	</div>
	<nav class="navbar is-fixed-top" role="navigation">
		<div class="navbar-brand">
			<div class="navbar-item">
				<figure class="image is-24x24">
					<img src="{{ asset('img/LineaseLogo.png') }}" alt="LinEase Logo">
				</figure>
				<p class="subtitle is-5 has-text-white">LinEase</p>
			</div>
		</div>
		<div class="navbar-menu">
			<div class="navbar-end">
				<div id="profile" class="navbar-item has-dropdown">
					<a class="navbar-link is-arrowless navlink-inactive">
						<p class="has-text-white">Username</p>
						<figure id="avatar" class="image is-32x32">
							<img class="is-rounded" src="{{ asset('img/Blank.JPG') }}" alt="Avatar">
						</figure>
					</a>
					<div class="navbar-dropdown">
						<a href="{{ url('profile') }}" class="navbar-item"><span class="icon"><i class="fas fa-user"></i></span>Profile</a>
						@if ($user->type == 'ADMIN' || $user->type == 'SUPER')
						<a href="{{ url('accounts') }}" class="navbar-item"><span class="icon"><i class="fas fa-users"></i></span>Accounts</a>
						<a href="{{ url('logs') }}" class="navbar-item"><span class="icon"><i class="fas fa-stream"></i></span>Logs</a>
						@endif
						<a href="{{ url('settings') }}" class="navbar-item"><span class="icon"><i class="fas fa-cog"></i></span>Settings</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>

{{-- Mobile View --}}
<div class="is-hidden-desktop">
	<div class="content">
		<h4 class="has-text-white">MAP</h4>
	</div>
	<nav class="navbar is-fixed-top has-text-center">
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
				<a class="navbar-item" href="{{ url($user->username) }}"><span class="icon"><i class="fas fa-user"></i></span>Profile</a>
				@if ($user->type == 'ADMIN' || $user->type == 'SUPER')
				<a class="navbar-item" href="{{ url('accounts') }}"><span class="icon"><i class="fas fa-users"></i></span>Accounts</a>
				<a class="navbar-item" href="{{ url('logs') }}"><span class="icon"><i class="fas fa-stream"></i></span>Logs</a>
				@endif
				<a class="navbar-item" href="{{ url('settings') }}"><span class="icon"><i class="fas fa-cog"></i></span>Settings</a>
			</div>
		</div>
	</nav>
</div>