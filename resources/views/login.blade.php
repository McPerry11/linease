@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/login.css') }}">
@endsection

@section('body')
<div class="container is-fluid">
	<div class="columns is-vcentered is-flex-mobile">
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
							<p class="is-medium">NEW TO LINEASE? <a class="has-text-warning" href="{{ url('register') }}">SIGN UP FOR FREE</a></p>
						</div>
					</div>
					<form method="POST">
						{{ csrf_field() }}
						<div class="field">
							<p class="control has-icons-left">
								<input type="text" class="input" placeholder="Username" name="username" value="{{ $username ?? '' }}" required>
								<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
							</p>
						</div>
						<div class="field has-addons is-marginless">
							<p id="pass-field" class="control has-icons-left">
								<input type="password" id="password" class="input" placeholder="Password" name="password" required>
								<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
							</p>
							<div class="control">
								<button id="view" class="button has-background-grey-lighter" type="button"><i id="icon-pass" class="fas fa-eye"></i></button>
							</div>
						</div>
						<div class="columns">
							<div class="column is-7 has-text-left">
								<small id="message" class="has-text-danger">{{ $message ?? '' }}</small>
							</div>
							<div class="column is-5 has-text-right">
								<small><a href=" ">Forgot Password?</a></small>
							</div>
						</div>
						<div id="login-level" class="level">
							<div class="level-item">
								<button id="login" class="button is-rounded is-outlined has-text-white" type="submit">LOG IN</button>
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
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/login.js') }}"></script>
@endsection