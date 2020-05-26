{{-- Desktop View --}}
<div class="is-hidden-touch">
	<nav class="navbar is-fixed-top is-white" role="navigation">
		<div class="navbar-brand">
			<div class="navbar-item">
				<figure class="image is-24x24">
					<img src="{{ asset('img/LineaseIcon.PNG') }}" alt="LinEase Logo">
				</figure>
				<div class="content">
					
				</div>
				<p class="title is-4">LinEase</p>
			</div>
		</div>
	</nav>
</div>

{{-- Mobile View --}}
<div class="is-hidden-desktop">
	<div class="content">
		<h4>MAP</h4>
	</div>
	<nav class="navbar is-fixed-top has-text-center">
		<div class="navbar-brand">
			<div class="navbar-item"></div>
			<a class="navbar-burger">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="{{ url($user->username) }}"><i class="fas fa-user"></i> Profile</a>
				@if ($user->type == 'ADMIN' || $user->type == 'SUPER')
				<a class="navbar-item" href="{{ url('accounts') }}"><i class="fas fa-users"></i> Accounts</a>
				<a class="navbar-item" href="{{ url('logs') }}"><i class="fas fa-stream"></i> Logs</a>
				@endif
				<a class="navbar-item" href="{{ url('settings') }}"><i class="fas fa-cogs"></i> Settings</a>
			</div>
		</div>
	</nav>
</div>