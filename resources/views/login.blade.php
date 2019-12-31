@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/login.css') }}">
@endsection

@section('body')
<div class="contianer">
	<div class="row align-items-center justify-content-center">
		<div class="col-md-6">
			{{-- LinEase Description --}}
		</div>
		<div class="col-md-5">
			<div class="card">
				<div class="card-body text-center">
					<img src="{{ asset('img/LineaseLogo.png') }}" alt="LinEase Logo" height="150">
					<h6 >NEW TO LINEASE? <a id="register" href="#">SIGN UP FOR FREE</a></h6>
					<form action="#">
						<input type="text" class="form-control mb-2" placeholder="Username" name="username">
						<div class="input-group flex-nowrap">
							<input type="password" class="form-control" placeholder="Password" name="password">
							<div class="input-group-append">
								<button class="btn btn-outline-secondary" type="button"><i class="fas fa-eye"></i></button>
							</div>
						</div>
						<small class="float-right"><a href="#">Forgot Password?</a></small>

					</form>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection