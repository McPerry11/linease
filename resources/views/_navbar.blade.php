{{-- Desktop View --}}
<div class="is-hidden-touch">
	<nav class="navbar is-fixed-top" role="navigation">
		<form method="POST">
			@csrf
			<button class="button is-danger">Logout</button>
		</form>
	</nav>
</div>

{{-- Mobile View --}}
<div class="is-hidden-desktop">
	<nav class="navbar is-fixed-top has-text-center">
		<div class="navbar-brand">
			<div class="navbar-item">
				<div class="content">
					<h4>MAP</h4>
				</div>
			</div>
			<a class="navbar-burger">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div class="navbar-menu">
			<div class="navbar-end">
				<a class="navbar-item" href="{{ url('profile') }}"><i class="fas fa-user"></i> Profile</a>
				<a class="navbar-item" href=""><i class="fas fa-users"></i> Accounts</a>
				<a class="navbar-item" href=""><i class="fas fa-stream"></i> Logs</a>
				<a class="navbar-item" href=""><i class="fas fa-cogs"></i> Settings</a>
			</div>
		</div>
	</nav>
</div>