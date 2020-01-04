@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/register.css') }}">
@endsection

@section('body')
<div class="container is-fluid">
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
						{{ csrf_field() }}
						<div class="field">
							<div class="control has-icons-left">
								<input type="text" class="input" placeholder="Username">
								<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
							</div>
						</div>
						<div class="field">
							<div class="control has-icons-left">
								<input type="email" class="input" placeholder="Email Address">
								<span class="icon is-small is-left"><i class="fas fa-at"></i></span>
							</div>
						</div>
						<div class="field has-addons">
							<p id="pass-field" class="control has-icons-left">
								<input type="password" class="input" placeholder="Password">
								<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
							</p>
							<div class="control">
								<button class="button has-background-grey-lighter" type="button"><i class="fas fa-eye"></i></button>
							</div>
						</div>
						<div class="field">
							<div class="control has-icons-left">
								<input type="password" class="input" placeholder="Confirm Password">
								<span class="icon is-small is-left"><i class="fas fa-check"></i></span>
							</div>
						</div>
						<button id="create" class="button is-fullwidth is-rounded is-outlined has-text-white">CREATE ACCOUNT</button>
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
@endsection