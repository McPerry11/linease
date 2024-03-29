@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/login.css') }}">
@endsection

@section('body')
{{-- Desktop View --}}
<div class="container is-fluid is-hidden-mobile">
	<div class="columns is-vcentered is-centered">
		<div class="column is-7 is-hidden-tablet-only">
			<div class="level">
				<div class="level-item">
					<div class="content">
						<h1>LinEase</h1>
						<small>"Linis with Ease"</small>						
					</div>
				</div>
			</div>
			<p class="has-text-justified">LinEase is a land pollution action network created to monitor and spread awareness on land pollution while simultaneously serving as a platform to contribute in solving the issue on land pollution and the prevention of it. LinEase gathers data from individual people whom have reported or issued polluted areas using images with descriptive captions. LinEase intends to serve those who understand the importance of the environment and keeping it as healthy as possible and hope to have a platform for them to spread awareness and/or even contribute on by reporting any issue regarding land pollution in certain areas themselves.</p>
		</div>
		<div class="column is-5-desktop is-7-tablet">
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
							<p class="is-medium">NEW TO LINEASE? <a id="reglink" class="has-text-success" href="{{ url('register') }}">SIGN UP FOR FREE</a></p>
						</div>
					</div>
					<form autocomplete="off">
						<div class="field">
							<p class="control has-icons-left">
								<input type="text" id="username" class="input" placeholder="Username" required>
								<span class="icon is-small is-left">
									<i class="fas fa-user"></i>
								</span>
							</p>
						</div>
						<div class="field has-addons is-marginless">
							<p class="control has-icons-left pass-field">
								<input type="password" id="password" class="input" placeholder="Password" required>
								<span class="icon is-small is-left">
									<i class="fas fa-key"></i>
								</span>
							</p>
							<div class="control">
								<button type="button" id="view" class="button has-background-grey-lighter">
									<span class="icon">
										<i id="icon-pass" class="fas fa-eye"></i>
									</span>
								</button>
							</div>
						</div>
						<div class="columns">
							<div class="column is-7-widescreen is-8-tablet has-text-left">
								<small id="message" class="has-text-danger"></small>
							</div>
							<div id="mright" class="column is-5-widescreen is-4-tablet has-text-right">
								<a class="has-text-grey help">Forgot Password?</a>
							</div>
						</div>
						<div class="columns is-vcentered is-centered">
							<div id="col-login" class="column is-5">
								<button type="submit" id="login" class="button is-rounded is-outlined has-text-white">LOG IN</button>
							</div>
							<div class="column is-2 has-text-centered">
								<small class="is-size-7">OR</small>
							</div>
							<div id="col-register" class="column is-5">
								<a id="register" class="button is-rounded has-background-grey-darker has-text-white" href="{{ url('register') }}">CREATE ACCOUNT</a>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
	<footer class="footer">
		<div class="content has-text-centered has-background-white">
			<small class="is-size-7">© Copyright</small>
		</div>
	</footer>
</div>

{{-- Mobile View --}}
<div class="container is-fluid is-hidden-tablet has-text-centered">
	<div class="level">
		<div class="level-item">
			<figure class="image is-128x128">
				<img src="{{ asset("img/LineaseLogo.png") }}" alt="LinEase Logo">
			</figure>
		</div>
	</div>
	<div class="level">
		<div class="level-item">
			<p class="is-size-7">NEW TO LINEASE? <a id="mreglink" class="has-text-success" href="{{ asset("register") }}" >SIGN UP FOR FREE</a></p>
		</div>
	</div>
	<form autocomplete="off">
		<div class="field">
			<p class="control has-icons-left">
				<input type="text" id="musername" class="input" placeholder="Username" required>
				<span class="icon is-small is-left"><i class="fas fa-user"></i></span>
			</p>
		</div>
		<div class="field has-addons is-marginless">
			<p class="control has-icons-left pass-field">
				<input type="password" id="mpassword" class="input" placeholder="Password" required>
				<span class="icon is-small is-left"><i class="fas fa-key"></i></span>
			</p>
			<div class="control">
				<button type="button" id="mview" class="button has-background-grey-lighter"><i id="micon-pass" class="fas fa-eye"></i></button>
			</div>
		</div>
		<div class="has-text-right">
			<a class="has-text-grey help">Forgot Password?</a>
		</div>
		<small id="mmessage" class="has-text-danger"></small>
		<div id="buttons">
			<div class="level">
				<div class="level-item">
					<button type="submit" id="mlogin" class="button is-rounded is-outlined has-text-white">LOG IN</button>
				</div>
				<div class="level-item">
					<small class="is-size-7">OR</small>
				</div>
				<div class="level-item">
					<a id="mregister" class="button is-rounded has-background-grey-darker has-text-white" href="{{ asset("register") }}">CREATE ACCOUNT</a>
				</div>
			</div>
		</div>
	</form>
	<footer class="footer">
		<div class="content has-text-centered has-background-white">
			<small class="is-size-7">© Copyright</small>
		</div>
	</footer>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/login.js') }}" id="js" data-link="{{ URL::previous() }}"></script>
@if ((new \Jenssegers\Agent\Agent)->isDesktop())
<script>
	Swal.fire({
		icon: 'info',
		title: 'LinEase Desktop',
		text: 'LinEase desktop still has incomplete features. If you would like to get the full experience of LinEase, try it on your mobile device!'
	});
</script>
@endif
@endsection
