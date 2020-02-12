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
<div class="is-hidden-desktop has-text-centered">
	<nav class="navbar is-fixed-top">
		<div class="navbar-item">
			<div class="content">
				<h4 id="title">MAP</h4>
			</div>
		</div>
	</nav>
	<nav class="navbar is-fixed-bottom">
		<div class="navbar-brand">
			<a class="navbar-item">
				<div id="profile" class="has-text-left"><i class="is-size-4 fas fa-user"></i></div>
			</a>
			<a class="navbar-item">
				<div id="settings" class="has-text-right"><i class="is-size-4 fas fa-bars"></i></div>
			</a>
		</div>
	</nav>
	<figure id="center" class="image is-64x64">
		<a>
			<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN">
		</a>
	</figure>
</div>