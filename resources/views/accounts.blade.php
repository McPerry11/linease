@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/accounts.css') }}">
@endsection

@section('body')
<div class="container is-fluid mt-2">
	<form id="search">
		<div class="field has-addons">
			<div class="control is-expanded">
				<input type="text" class="input" placeholder="Search username or name...">
			</div>
			<div class="control">
				<button class="button is-success">
					<span class="icon is-left">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</div>
		</div>
	</form>
	<button class="button is-fullwidth is-success mt-3">
		<span class="icon">
			<i class="fas fa-plus"></i>
		</span>
		<span>Add New Account</span>
	</button>
	
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/accounts.js') }}"></script>
@endsection