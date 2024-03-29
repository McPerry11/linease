@extends('_layout')

@section('styles')
<link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.15.0/maps/maps.css'>
<link rel="stylesheet" href="{{ asset('css/dashboard.css') }}">
@if ($user->ob_dashboard == 0)
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.3.0/introjs.min.css">
@endif
@endsection

@section('body')
<div id="map-container">
	<div id="map"></div>
	<div id="legend"></div>
	<form id="search">
		<div class="field has-addons">
			<p class="control has-icons-left">
				<input class="input is-rounded" type="text" name="search" placeholder="Search Address, City, or District...">
				<span class="icon is-left">
					<i class="image is-24x24">
						<img src="{{ asset('img/LineaseIcon.PNG') }}" alt="LinEase Pin">
					</i>
				</span>
			</p>
			<div class="control">
				<button type="submit" id="btn-search" class="button is-rounded" title="Search">
					<span class="icon">
						<i class="fas fa-search"></i>
					</span>
				</button>
			</div>
		</div>
	</form>
	@if(Auth::user()->type != 'USER')
	<button id="dbscan" class="button is-rounded" title="Analyze Reports">
		<span class="icon is-medium">
			<i class="fas fa-lg fa-search-location"></i>
		</span>
	</button>
	@endif
	@if (!(new \Jenssegers\Agent\Agent)->isDesktop())
	<figure id="center" class="image is-64x64 is-hidden-desktop" data-valid="{{ $user->verified }}" data-profile="{{ url($user->username) }}" data-camera="{{ url('camera') }}">
		<img class="is-rounded" src="{{ asset('img/CenterLogo.png') }}" alt="MAP PIN">
	</figure>
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
		<div class="card mx-4">
			<div class="card-image">
				<p class="image is-1by1">
					<img src="" alt="" data-base="{{ asset('reports') }}">
				</p>
			</div>
			<div class="card-content">
				<div class="content">
					@if (Auth::user()->type != 'USER')
					<div class="level is-mobile mb-0">
						<div class="level-left">
							<span id="status" class="icon-text has-text-success">
								<span class="icon">
									<i class="fas fa-check"></i>
								</span>
								<span>Verified</span>
							</span>
						</div>
						<div class="level-right">
							<div class="level-item">
								<div class="dropdown is-right">
									<div class="dropdown-trigger">
										<button class="button">
											<span>Evaluate</span>
											<span class="icon is-small">
												<i class="fas fa-angle-down"></i>
											</span>
										</button>
									</div>
									<div class="dropdown-menu">
										<div class="dropdown-content">
											<a id="resolved" class="dropdown-item">
												<span class="icon-text has-text-success">
													<span class="icon">
														<i class="fas fa-check-double"></i>
													</span>
													<span>Resolved</span>
												</span>
											</a>
											<a id="verified" class="dropdown-item">
												<span class="icon-text has-text-success">
													<span class="icon">
														<i class="fas fa-check"></i>
													</span>
													<span>Verified</span>
												</span>
											</a>
											<a id="inaccurate" class="dropdown-item">
												<span class="icon-text has-text-danger">
													<span class="icon">
														<i class="fas fa-exclamation-triangle"></i>
													</span>
													<span>Inaccurate</span>
												</span>
											</a>
											<a id="invalid" class="dropdown-item">
												<span class="icon-text has-text-danger">
													<span class="icon">
														<i class="fas fa-times"></i>
													</span>
													<span>Invalid Report</span>
												</span>
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					@endif
					<div class="level is-mobile mb-0">
						<div class="level-left">
							<p id="title" class="is-size-5 has-text-weight-bold mb-1 level-item"></p>
						</div>
						<div class="level-right">
							<p id="date" class="is-size-7 has-text-weight-light level-item"></p>             
						</div>
					</div>
					<p id="reporter" class="is-size-7 has-text-weight-medium" data-base="{{ url('') }}">Reported by: <a href=""></a></p>
					<p id="address" class="is-size-7 has-text-weight-medium"></p>
					<p id="description" class="is-size-6"></p>
				</div>
			</div>
		</div>
	</div>
</div>
@endsection

@section('scripts')
<script src="https://unpkg.com/@googlemaps/markerclusterer/dist/index.min.js"></script>
@if ($user->ob_dashboard == 0)
<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.3.0/intro.min.js"></script>
@endif
<script id="dashboard" src="{{ asset('js/dashboard.js') }}" data-link="{{ asset('img') }}" data-expire="{{ route('login') }}" data-survey="{{ $user->survey }}" data-ob="{{ $user->ob_dashboard }}" data-user="{{ $user->username }}"></script>
<script async defer src="https://maps.googleapis.com/maps/api/js?key=&libraries=places&callback=initMap"></script>
@endsection