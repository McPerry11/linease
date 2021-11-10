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
		<button id="add" class="button is-fullwidth is-success">
			<span class="icon">
				<i class="fas fa-plus"></i>
			</span>
			<span>Add Facilitator</span>
		</button>
		@elseif (Auth::user()->type == 'SUPER')
		<button id="add" class="button is-fullwidth is-success">
			<span class="icon">
				<i class="fas fa-plus"></i>
			</span>
			<span>Add Admin</span>
		</button>
		@endif
	</div>
</div>
<div id="account_content" class="container is-fluid mt-5">
	@if (count($users) > 0)
	@foreach ($users as $user)
	<div class="column is-variable px-0">
		<div class="card account_data">
			<div class="card-content px-3 py-4">
				<p class="is-size-7 has-text-weight-light is-pulled-right">{{ \Carbon\Carbon::parse($user->created_at)->isoFormat('MMM D, YYYY - hh:mma') }}</p>
				<a href="{{ url('') . '/' . $user->username }}" class="is-size-7 has-text-weight-medium is-italic">&#65312;{{ $user->username }}</a>
				<p class="is-size-6 has-text-weight-normal">Name: {{ $user->firstname && $user->lastname ? $user->firstname . ' ' . ($user->middlename ?? '') . ($user->middlename ? ' ' : '') . $user->lastname : $user->username }}</p> 
			</div>
			<footer class="card-footer">
				<a class="card-footer-item acc-edit py-1" data-user="{{ $user->username }}">Edit</a>
				<a class="card-footer-item acc-delete py-1 has-text-danger" data-user="{{ $user->username }}">Delete</a>
			</footer>
		</div>
	</div>
	@endforeach
	@endif
</div>

<div class="modal">
	<div class="modal-background"></div>
	<div id="loader" class="modal-card">
		<div class="modal-card-body">
			<span class="icon is-large has-text-success">
				<i class="fas fa-circle-notch fa-spin fa-3x"></i>
			</span>
		</div>
	</div>
	<div class="modal-content is-hidden">
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
					<div class="field">
						<div id="user-control" class="control has-icons-left">
							<input type="text" id="username" class="input" placeholder="Username" minlength="5" maxlength="20" required>
							<span class="icon is-small is-left"><i id="user-icon" class="fas fa-user-circle"></i></span>
						</div>
						<small id="user-warning" class="has-text-danger"></small>
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
							<input class="input" id="email" type="email" placeholder="Email" required>
							<span class="icon is-small is-left">
								<i class="fas fa-envelope"></i>
							</span>
						</div>
					</div>
					<div class="field field-pass">
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
					<div class="field field-pass">
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
				<div id="cancel" class="card-footer-item has-text-danger">Cancel</div>
				<div  id="submit" class="card-footer-item has-text-white has-background-success">Submit</div>
			</footer>
		</div>
	</div>
</div>
@endsection

@section('scripts')
<script id="accounts" src="{{ asset('js/accounts.js') }}" data-link="{{ url('accounts') }}"></script>
@endsection