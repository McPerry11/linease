@extends('_layout')

@section('body')
<form method="POST">
	{{ csrf_field() }}
	<button class="button is-danger">Logout</button>
</form>
@endsection