@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/login.css') }}">
@endsection

@section('body')
@if (session('status'))
<div class="notification is-success">
	<button class="delete" type="button"></button>
	{{ session('status') }}
</div>
@endif

{{-- Desktop View --}}
<div id="lmargin" class="container is-fluid is-hidden-touch mtop">
	<div class="columns is-vcentered">
		<div class="column is-7">
			<div class="level">
				<div class="level-item">
					<div class="content">
						<h1>LinEase</h1>
						<small>"Linis with Ease"</small>						
					</div>
				</div>
			</div>
			<p class="has-text-justified">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent imperdiet augue facilisis, consectetur dolor nec, sagittis lectus. Duis venenatis lacinia elit, vitae varius sapien dignissim sit amet. Nulla accumsan lectus eu urna semper, id imperdiet justo interdum. Mauris efficitur enim a luctus convallis. Integer in bibendum leo, non vulputate elit. Nullam at mi neque. Aenean sem dui, semper non elit in, dignissim malesuada massa. Praesent eu dapibus orci.</p>
		</div>
		<div class="column is-5">
			<div class="card">
				<div class="card-content">
					<div class="level">
						<div class="level-item">
							<figure class="image is-128x128">
								<img src="{{ asset('img/LineaseLogo.png') }}" alt="LinEase Logo">
							</figure>
						</div>
					</div>
					<div class="level">
						<div class="level-item">
							<p class="is-medium">NEW TO LINEASE? <a id="reglink" class="has-text-success" href="{{ url('register') }}">SIGN UP FOR FREE</a></p>
						</div>
					</div>
					<form>
						@csrf
						<div class="field">
							<p class="control has-icons-left">
								<input type="text" id="username" class="input" placeholder="Username" name="username" required>
								<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
							</p>
						</div>
						<div class="field has-addons is-marginless">
							<p class="control has-icons-left pass-field">
								<input type="password" id="password" class="input" placeholder="Password" name="password" required>
								<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
							</p>
							<div class="control">
								<button type="button" id="view" class="button has-background-grey-lighter"><i id="icon-pass" class="fas fa-eye"></i></button>
							</div>
						</div>
						<div class="columns">
							<div class="column is-7 has-text-left">
								<small id="message" class="has-text-danger"></small>
							</div>
							<div id="mright" class="column is-5 has-text-right">
								<small><a class="has-text-grey">Forgot Password?</a></small>
							</div>
						</div>
						<div class="level">
							<div class="level-item">
								<button type="submit" id="login" class="button is-rounded is-outlined has-text-white">LOG IN</button>
							</div>
							<div class="level-item">
								<small class="is-size-7">OR</small>
							</div>
							<div class="level-item">
								<a id="register" class="button is-rounded has-background-grey-darker has-text-white" href="{{ url('register') }}">CREATE ACCOUNT</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<footer class="footer">
		<div class="content has-text-centered has-background-white">
			<small class="is-size-7">© Copyright</small>
		</div>
	</footer>
</div>

{{-- Mobile View --}}
<div class="container is-fluid is-hidden-desktop has-text-centered-mobile mtop">
	<div class="level">
		<div class="level-item">
			<figure class="image is-128x128">
				<img src="{{ asset("img/LineaseLogo.png") }}" alt="LinEase Logo">
			</figure>
		</div>
	</div>
	<div class="level">
		<div class="level-item">
			<p class="is-size-7">NEW TO LINEASE? <a id="mreglink" class="has-text-success" href="{{ asset("register") }}" >SIGN UP FOR FREE</a></p>
		</div>
	</div>
	<form method="POST">
		@csrf
		<div class="field">
			<p class="control has-icons-left">
				<input type="text" id="musername" class="input" placeholder="Username" name="username" value="{{ $username ?? '' }}" required>
				<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
			</p>
		</div>
		<div class="field has-addons is-marginless">
			<p class="control has-icons-left pass-field">
				<input type="password" id="mpassword" class="input" placeholder="Password" name="password" required>
				<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
			</p>
			<div class="control">
				<button type="button" id="mview" class="button has-background-grey-lighter"><i id="micon-pass" class="fas fa-eye"></i></button>
			</div>
		</div>
		<div class="has-text-right">
			<small><a class="has-text-grey">Forgot Password?</a></small>
		</div>
		<small id="mmessage" class="has-text-danger"></small>
		<div id="buttons">
			<div class="level">
				<div class="level-item">
					<button type="submit" id="mlogin" class="button is-rounded is-outlined has-text-white">LOG IN</button>
				</div>
			</div>
			<div class="level">
				<div class="level-item">
					<small class="is-size-7">OR</small>
				</div>
			</div>
			<div class="level">
				<div class="level-item">
					<a id="mregister" class="button is-rounded has-background-grey-darker has-text-white" href="{{ asset("register") }}">CREATE ACCOUNT</a>
				</div>
			</div>
		</div>
	</form>
	<footer class="footer">
		<div class="content has-text-centered has-background-white">
			<small class="is-size-7">© Copyright</small>
		</div>
	</footer>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/login.js') }}"></script>
@endsection
