@extends('_layout')

@section('body')
<div class="container is-fluid">
	<div class="level">
		<div class="level-item">
			<div class="card" style="width: 30%; margin-top: 5%">
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
						<p class="control has-icons-left" style="width: 100%">
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
					<button class="button is-fullwidth is-rounded is-outlined has-text-white" style="background-color: #00C944; margin-top: 25px; margin-bottom: 10px;">CREATE ACCOUNT</button>
					<div class="level">
						<div class="level-item">
							<div class="content">
								<small>Already have an account?<a href="{{ url('login') }}" class="has-text-warning">Sign in</a></small>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection