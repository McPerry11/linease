@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/register.css') }}">
@endsection

@section('body')
{{-- Desktop View --}}
<div class="columns is-hidden-mobile has-text-centered is-centered">
	<div class="column is-5-tablet is-4-desktop is-3-widescreen">
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
				<form class="has-text-left">
					<div class="field">
						<div id="user-control" class="control has-icons-left">
							<input type="text" id="username" class="input" placeholder="Username" minlength="6" maxlength="30" required>
							<span class="icon is-small is-left"><i id="user-icon" class="fas fa-user"></i></span>
						</div>
						<small id="user-warning" class="has-text-danger"></small>
					</div>
					<div class="field">
						<div id="email-control" class="control has-icons-left">
							<input type="email" id="email" class="input" placeholder="Email Address" required>
							<span class="icon is-small is-left"><i id="email-icon" class="fas fa-at"></i></span>
						</div>
						<small id="email-warning" class="has-text-danger"></small>
					</div>
					<div class="field has-addons">
						<p class="control has-icons-left pass-field">
							<input type="password" id="password" class="input" placeholder="Password" minlength="8" required>
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
				</form>
				<small>Already have an account? <a id="login" class="has-text-success" href="{{ url('login') }}">Sign in</a></small>
			</div>
		</div>
		<footer class="footer">
			<div class="content has-text-centered has-background-white">
				<small class="is-size-7">© Copyright</small>
			</div>
		</footer>
	</div>
</div>

{{-- Mobile View --}}
<div class="container is-fluid is-hidden-tablet has-text-centered">
	<div class="level">
		<div class="level-item">
			<figure class="image is-128x128">
				<img src="{{ asset('img/LineaseLogo.png') }}" alt="LinEase Logo">
			</figure>
		</div>
	</div>
	<div class="level">
		<div class="level-item">
			<p class="is-size-6">Join the community</p>
		</div>
	</div>
	<form class="has-text-left">
		<div class="field">
			<div id="muser-control" class="control has-icons-left">
				<input type="text" id="musername" class="input" placeholder="Username" minlength="6" maxlength="30" required>
				<span class="icon is-small is-left"><i id="muser-icon" class="fas fa-user"></i></span>
			</div>
			<small id="muser-warning" class="has-text-danger"></small>
		</div>
		<div class="field">
			<div id="memail-control" class="control has-icons-left">
				<input type="email" id="memail" class="input" placeholder="Email Address" required>
				<span class="icon is-small is-left"><i id="memail-icon" class="fas fa-at"></i></span>
			</div>
			<small id="memail-warning" class="has-text-danger"></small>
		</div>
		<div class="field has-addons">
			<p class="control has-icons-left pass-field">
				<input type="password" id="mpassword" class="input" placeholder="Password" minlength="8" required>
				<span class="icon is-small is-left"><i id="mpass-icon" class="fas fa-key"></i></span>
				<small id="mpass-warning" class="has-text-danger"></small>
			</p>
			<div class="control">
				<button id="mview" class="button has-background-grey-lighter" type="button"><i id="micon-pass" class="fas fa-eye"></i></button>
			</div>
		</div>
		<div class="field">
			<div id="mcpass-control" class="control has-icons-left">
				<input type="password" id="mcpass" class="input" placeholder="Confirm Password" required>
				<span class="icon is-small is-left"><i id="mcpass-icon" class="fas fa-check"></i></span>
			</div>
			<small id="mcpass-warning" class="has-text-danger"></small>
		</div>
		<button id="mcreate" class="button is-fullwidth is-rounded is-outlined has-text-white" type="submit">CREATE ACCOUNT</button>
	</form>
	<small class="mbot">Already have an account? <a id="mlogin" class="has-text-success" href="{{ url('login') }}">Sign in</a></small>
	<footer class="footer">
		<div class="content has-text-centered has-background-white">
			<small class="is-size-7">© Copyright</small>
		</div>
	</footer>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/register.js') }}"></script>
@endsection