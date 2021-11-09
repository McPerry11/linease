@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/accounts.css') }}">
@endsection

@section('body')
<div class="container is-fluid mt-4">
	<form id="search ">
		<div class="field has-addons">
			<div class="control is-expanded">
				<input type="text" class="input mb-5" placeholder="Search username or name...">
			</div>
			<div class="control">
				<button class="button is-success" type="button">
					<span class="icon is-left">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</div>
		</div>
	</form>
	<div class="field">
		@if (Auth::user()->type == 'ADMIN')
		<button id = "button_add" class="button is-fullwidth is-success">
			<span class="icon">
				<i class="fas fa-plus"></i>
			</span>
			<span>Add Facilitator</span>
		</button>
		@elseif (Auth::user()->type == 'SUPER')
		<button id = "button_add" class="button is-fullwidth is-success">
			<span class="icon">
				<i class="fas fa-plus"></i>
			</span>
			<span>Add Admin</span>
		</button>
		@endif
	</div>
</div>
<div id = "account_content" class="container is-fluid mt-5">
	@if (count($users) > 0)
	@foreach ($users as $user)
	<div class="column is-variable px-0">
		<div class="card account_data">
			<div class="card-content px-3 py-4">
				<p class="is-size-7 has-text-weight-light is-pulled-right">{{ $user->created_at ? \Carbon\Carbon::parse($user->created_at)->FormatLocalized('%b %d %H:%M') : '' }}</p>
				<p class="is-size-6 has-text-weight-normal">Name {{ $user->firstname }}</p> 
				<a href="" class="is-size-7 has-text-weight-medium is-italic">&#65312;{{ $user->username }}</a>
			</div>
			<footer class="card-footer">
				<a id = "edit" class="card-footer-item acc-edit py-1">Edit</a>
				<a id = "delete" class="card-footer-item py-1">Delete</a>
			</footer>
		</div>
	</div>
	@endforeach
	@endif
</div>
{{-- MODAL --}}
<form class="modal">
	<div class="modal-background"></div>
	<div class="modal-content">
		<div class="card mx-2">
			@if (Auth::user()->type == 'ADMIN')
			<div class="box mb-0 p-0">
				<p class="header-title has-text-centered pb-0 is-size-5 has-text-weight-bold pt-2">
					BUILD YOUR TEAM! 
				</p>
				<p class="card-header-content has-text-centered pb-4 is-size-7 px-3">
					Add facilitators to monitor cleanliness in your barangay.
				</p>
			</div>
			@else
			<div class="box mb-0 p-0">
				<p class="header-title has-text-centered pb-0 is-size-5 has-text-weight-bold pt-2">
					START A TEAM! 
				</p>
				<p class="card-header-content has-text-centered pb-4 is-size-7 px-3">
					A small way to start saving the environment.
				</p>
			</div>
			@endif
			<div class="card-content">
				<div class="container">
					<div class="field mb-8">
						<div class="control has-icons-left">
							<input type="text" id="username" class="input" placeholder="Username" minlength="5" maxlength="20" required>
							<span class="icon is-small is-left"><i class="fas fa-user-circle"></i></span>
						</div>
					</div>
					<div class="field">
						<div class="control is-expanded has-icons-left">
							<input type="text" id="firstname" class="input" name="firstname" maxlength="30" placeholder="First Name" required>
							<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
						</div>
					</div>
					<div class="field">
						<div class="control is-expanded has-icons-left">
							<input type="text" id="lastname" class="input" name="lastname" maxlength="30" placeholder="Last Name" required>
							<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
						</div>
					</div>
					<div class="field">
						<div class="control has-icons-left has-icons-right">
							<input class="input" id ="email" type="email" placeholder="Email" required>
							<span class="icon is-small is-left">
								<i class="fas fa-envelope"></i>
							</span>
							<span class="icon is-small is-right">
								<i class="fas fa-check"></i>
							</span>
						</div>
					</div>
					<div class="field">
						<div class="field has-addons">
							<div class="control is-expanded">
								<input id = "pass" type="password" class="input" minlength="8" placeholder="Password" required>
								<div class="help has-text-danger"></div>
							</div>
							<div class="control">
								<button type="button" class="button has-background-grey-lighter view">
									<span class="icon">
										<i class="fas fa-eye"></i>
									</span>
								</button>
							</div>
						</div>
					</div>
					<div class="field">
						<div class="field has-addons">
							<div class="control is-expanded">
								<input id="confirm" type="password" class="input" placeholder=" Confirm Password" required>
								<div class="help has-text-danger"></div>
							</div>
							<div class="control">
								<button type="button" class="button has-background-grey-lighter view">
									<span class="icon">
										<i class="fas fa-eye"></i>
									</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<footer class="card-footer">
				<div id = "button_cancel" class="card-footer-item">Cancel</div>
				<div  id = "button_submit" class="card-footer-item">Submit</div>
			</footer>
		</div>
	</div>
</form>
@endsection

@section('scripts')
<script src="{{ asset('js/accounts.js') }}"></script>
@endsection