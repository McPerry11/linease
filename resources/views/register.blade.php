@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/register.css') }}">
@endsection

@section('body')
{{-- Desktop View --}}
<div class="container is-fluid is-hidden-touch">
	<div class="level">
		<div class="level-item">
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
							<p class="is-medium">Join the community</p>
						</div>
					</div>
					<form method="POST">
						@csrf
						<div class="field">
							<div id="user-control" class="control has-icons-left">
								<input type="text" id="username" class="input" placeholder="Username" name="username" required>
								<span class="icon is-small is-left"><i id="user-icon" class="fas fa-user"></i></span>
							</div>
							<small id="user-warning" class="has-text-danger"></small>
						</div>
						<div class="field">
							<div id="email-control" class="control has-icons-left">
								<input type="email" id="email" class="input" placeholder="Email Address" name="email" required>
								<span class="icon is-small is-left"><i id="email-icon" class="fas fa-at"></i></span>
							</div>
							<small id="email-warning" class="has-text-danger"></small>
						</div>
						<div class="field has-addons">
							<p id="pass-field" class="control has-icons-left">
								<input type="password" id="password" class="input" placeholder="Password" name="password" required>
								<span class="icon is-small is-left"><i id="pass-icon" class="fas fa-key"></i></span>
								<small id="pass-warning" class="has-text-danger"></small>
							</p>
							<div class="control">
								<button id="view" class="button has-background-grey-lighter" type="button"><i id="icon-pass" class="fas fa-eye"></i></button>
							</div>
						</div>
						<div class="field">
							<div id="cpass-control" class="control has-icons-left">
								<input type="password" id="cpass" class="input" placeholder="Confirm Password" required>
								<span class="icon is-small is-left"><i id="cpass-icon" class="fas fa-check"></i></span>
							</div>
							<small id="cpass-warning" class="has-text-danger"></small>
						</div>
						<button id="create" class="button is-fullwidth is-rounded is-outlined has-text-white" type="submit">CREATE ACCOUNT</button>
						<div class="level">
							<div class="level-item">
								<div class="content">
									<small>Already have an account? <a href="{{ url('login') }}" class="has-text-warning">Sign in</a></small>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>

{{-- Mobile View --}}
<div class="container is-fluid is-hidden-desktop has-text-centered-mobile">
	
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/register.js') }}"></script>
@endsection