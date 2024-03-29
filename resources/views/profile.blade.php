@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">
<link rel="stylesheet" href="{{ asset('css/bulma-divider.min.css') }}">
@if (Auth::user()->ob_profile == 0)
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.3.0/introjs.min.css">
@endif
@endsection

@section('body')
<figure id="avatar" class="image is-96x96 has-background-white">
  <img src="{{ $user->avatar ? asset('avatars/' . $user->avatar) : asset('img/profilePlaceholder.jpg') }}" data-base="{{ asset('avatars') }}" data-placeholder="{{ asset('img/profilePlaceholder.jpg') }}">
  @if ($user->username == Auth::user()->username)
  <div class="icon">
    <i class="fas fa-edit"></i>
  </div>
  @endif
</figure>
<form id="edit-avatar" data-user="{{ $user->username }}" data-auth="{{ Auth::user()->username }}">
  <input type="file" name="avatar" accept="image/*" hidden>
</form>
<div id="name">
  <div class="content">
    <h4 class="has-text-centered">{{ $name ?? $user->username }}</h4>
    <p class="has-text-centered">&#65312;{{ $user->username }}</p>
  </div>
</div>

{{-- TABS --}}
@if (Auth::user()->username == $user->username)
<div class="tabs is-boxed mt-4 mb-3">
  <ul>
    <li id="profile" class="is-active">
      <a>
        <div class="icon">
          <i class="fas fa-user"></i>
        </div>
        <div>PROFILE</div>
      </a>
    </li>
    <li id="security">
      <a>
        <div class="icon">
          <i class="fas fa-lock"></i>
        </div>
        <div>SECURITY</div>
      </a>
    </li>
    <li id="reports">
      <a>
        <div class="icon">
          <i class="fas fa-images"></i>
        </div>
        <div>REPORTS</div>
      </a>
    </li>
  </ul>
</div>

{{-- PROFILE --}}
<div id="profile_content" class="container is-fluid">
  <form id="profile_form">
    <div class="level is-mobile mb-0 pt-2">
      <div class="level-left"></div>
      <div class="level-right">
        <div class="level-item">
          <a id="edit" class="mt-2" title="Edit your profile">
            <span class="icon">
              <i class="fas fa-edit"></i>
            </span>
            <span>Edit Profile</span>
          </a>
        </div>
      </div>
    </div>
    <div class="divider is-left mt-0">BASIC INFORMATION</div>
    <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level item">
              <label class="label">Name</label>
            </div>
          </div>
          <div class="level-right">
            <div class="level item">
              <p id="name-label">{{ $name ?? '' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="lastname" class="input" name="lastname" maxlength="30" placeholder="Last Name" value="{{ $user->lastname }}"  data-val="{{ $user->lastname }}" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="firstname" class="input" name="firstname" maxlength="30" placeholder="First Name" value="{{ $user->firstname }}" data-val="{{ $user->firstname }}" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="middlename" class="input" name="middlename" maxlength="30" placeholder="Middle Initial" value="{{ $user->middlename }}" data-val="{{ $user->middlename }}">
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <label class="label">Username</label>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p id="username-label">&#65312;{{ $user->username }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field has-addons">
          <div class="control">
            <a class="button is-static">&#65312;</a>
          </div>
          <div id="username" class="control is-expanded">
            <input type="text" class="input" value="{{ $user->username }}" data-val="{{ $user->username }}" minlength="5" maxlength="20" name="username" required>
            <div id="username-warning" class="help has-text-danger"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="divider is-left">PRIVATE DETAILS</div>
    <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <div class="field-label">
                <label class="label">Email</label>
              </div>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p id="email-label">{{ $user->email }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div id="email" class="control is-expanded">
            <input type="email" class="input" value="{{ $user->email }}" data-val="{{ $user->email }}" name="email" maxlength="320" required>
            <div id="email-warning" class="help has-text-danger"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <label class="label">City</label>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p id="city-label">{{ $user->city }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <div class="select is-fullwidth">
              <select id="city" required data-val="{{ $user->city }}">
                <option value="" selected disabled>Choose your city</option>
                <option value="Caloocan">Caloocan</option>
                <option value="Las Piñas">Las Piñas</option>
                <option value="Makati">Makati</option>
                <option value="Malabon">Malabon</option>
                <option value="Mandaluyong">Mandaluyong</option>
                <option value="Manila">Manila</option>
                <option value="Marikina">Marikina</option>
                <option value="Muntinlupa">Muntinlupa</option>
                <option value="Navotas">Navotas</option>
                <option value="Parañaque">Parañaque</option>
                <option value="Pasay">Pasay</option>
                <option value="Pasig">Pasig</option>
                <option value="Quezon City">Quezon City</option>
                <option value="San Juan">San Juan</option>
                <option value="Taguig">Taguig</option>
                <option value="Valenzuela">Valenzuela</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
    {{-- <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <label class="label">Phone Number</label>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p id="phone-label">{{ $user->phone != '' ? 0 . $user->phone : $user->phone }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field has-addons">
          <div class="control">
            <a class="button is-static">+63</a>
          </div>
          <div id="phone" class="control is-expanded">
            <input type="tel" class="input" value="{{ $user->phone }}" data-val="{{ $user->phone }}" maxlength="10" name="phone" required>
            <div id="phone-warning" class="help has-text-danger"></div>
          </div>
        </div>
      </div>
    </div> --}}
    <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <label class="label">Birth Date</label>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p id="birthdate-label">{{ $user->birthdate ? \Carbon\Carbon::parse($user->birthdate)->isoFormat('MM/DD/YYYY') : '' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="date" id="birthdate" class="input" value="{{ $user->birthdate ? \Carbon\Carbon::parse($user->birthdate)->isoFormat('YYYY-MM-DD') : '' }}" data-val="{{ $user->birthdate ? \Carbon\Carbon::parse($user->birthdate)->isoFormat('YYYY-MM-DD') : '' }}" name="birthdate" required>
          </div>
        </div>
      </div>
    </div>
    <div id="actions" class="buttons is-centered mt-5">
      <button id="cancel" class="button is-danger is-outlined" type="button">Cancel</button>
      <button id="submit" class="button is-success" type="submit">Submit</button>
    </div>
  </form>
</div>

{{-- SECURITY --}}
<div id="security_content" class="container is-fluid is-hidden">
  <form id="security_form" autocomplete="off">
    <div class="divider is-left">Change Password</div>
    <button id="change" class="button is-fullwidth is-danger" type="button">Change Password</button>
    <div id="change-pass-form">
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Current Password</label>
        </div>
        <div class="field-body">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input id="current" type="password" class="input" required>
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
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">New Password</label>
        </div>
        <div class="field-body">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input id="new" type="password" class="input" required>
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
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Confirm New Password</label>
        </div>
        <div class="field-body">
          <div class="field has-addons">
            <div class="control is-expanded">
              <input id="confirm" type="password" class="input" required>
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
      <div class="help">Changing password will log you out from other devices with your account</div>
      <div id="sec-actions" class="buttons is-centered mt-5">
        <button class="button is-danger is-outlined" type="button">Cancel</button>
        <button class="button is-success" type="submit">Submit</button>
      </div>
    </div>
  </form>
  <form action="{{ route('logout') }}" method="POST" id="logout" hidden>
    @csrf
  </form>
</div>

<!-- REPORTS -->
<div id="reports_content" class="container is-fluid is-hidden">
  @if (count($reports) > 0) 
  @php
  $previousDate = "";
  @endphp
  @foreach ($reports as $report)
  @if ($previousDate != \Carbon\Carbon::parse($report->created_at)->isoFormat('MMM D, YYYY'))
  @php
  $previousDate = \Carbon\Carbon::parse($report->created_at)->isoFormat('MMM D, YYYY');
  @endphp
  <div class="divider mb-1 is-left">{{ \Carbon\Carbon::parse($report->created_at)->isoFormat('MMM D, YYYY') }}</div>
  @endif
  <div class="column is-variable px-0">
    <div class="box {{ strtolower($report->severity) }} px-3 py-4" data-id="{{ $report->id }}">
      <div class="media">
        <div class="media-content">
          <p class="is-size-6 has-text-weight-bold is-uppercase">{{ $report->severity }}</p> 
          <p class="is-size-7 has-text-weight-medium">{{ $report->address }}</p>
          <p class="is-size-7 has-text-weight-light">{{ \Carbon\Carbon::parse($report->created_at)->isoFormat('MMM D, YYYY - hh:mma') }}</p>   
        </div>
        <figure class="media-right">
          <p class="image is-48x48">
            <img src="{{ asset('reports/' . $report->picture) }}" alt="Report #{{ $report->id }}">
          </p>
        </figure>
      </div>
    </div>
  </div>
  @endforeach
  <hr>
  @else
  <div class="has-text-centered">No reports found.</div>
  @endif
</div>
@else
<div class="container is-fluid">
  @if (count($reports) > 0) 
  @php
  $previousDate = ""; 
  @endphp
  @foreach ($reports as $report)
  @if ($previousDate != \Carbon\Carbon::parse($report->created_at)->isoFormat('MM/DD/YYYY'))
  @php
  $previousDate = \Carbon\Carbon::parse($report->created_at)->isoFormat('MM/DD/YYYY');
  @endphp
  <div class="divider mb-1 is-left">{{ \Carbon\Carbon::parse($report->created_at)->isoFormat('MM/DD/YYYY') }}</div>
  @endif
  <div class="column is-variable px-0">
    <div class="box {{ strtolower($report->severity) }} px-3 py-4" data-id="{{ $report->id }}">
      <div class="media">
        <div class="media-content">
          <p class="is-size-6 has-text-weight-bold is-uppercase">{{$report->severity }}</p> 
          <p class="is-size-7 has-text-weight-medium">{{ $report->address }}</p>
          <p class="is-size-7 has-text-weight-light">{{ $report->created_at ? \Carbon\Carbon::parse($report->created_at)->FormatLocalized('%b %d %H:%M') : '' }}</p>   
        </div>
        <figure class="media-right">
          <p class="image is-48x48">
            <img src="{{ asset('reports/' . $report->picture) }}" alt="Report #{{ $report->id }}">
          </p>
        </figure>
      </div>
    </div>
  </div>
  @endforeach
  <hr>
  @else
  <hr class="mt-2">
  <div class="has-text-centered">No reports found.</div>
  @endif
</div>
@endif
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
      <div class="card-image mt-2">
        <p class="image is-1by1">
          <img src="" alt="" data-base="{{ asset('reports') }}">
        </p>
      </div>
      <div class="card-content">
        <div class="media-content">
          <p id="report_date" class="is-size-7 has-text-weight-light is-pulled-right"></p>             
          <p id="report_title" class="is-size-5 has-text-weight-bold is-uppercase"></p> 
          <p id="report_address" class="is-size-7 has-text-weight-medium"></p>
          <br>
          <p id="report_description" class="is-size-6"></p>
        </div>
      </div>
    </div>
  </div>
</div>
@endsection

@section('scripts')
@if (Auth::user()->ob_profile == 0)
<script src="https://cdnjs.cloudflare.com/ajax/libs/intro.js/4.3.0/intro.min.js"></script>
@endif
<script src="{{ asset('js/profile.js') }}" id="js" data-user="{{ $user->username }}" data-auth="{{ Auth::user()->username }}" data-ob="{{ Auth::user()->ob_profile }}"></script>
@endsection
