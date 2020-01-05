@extends('_layout')

@section('body')
<form method="POST">
	@csrf
	<button class="button is-danger">Logout</button>
</form>
@endsection