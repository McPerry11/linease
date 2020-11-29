@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">
<link rel="stylesheet" href="{{ asset('css/bulma-divider.min.css') }}">
@endsection

@section('body')
<figure class="image is-96x96 has-background-white">
  <img src="{{ asset('img/profilePlaceholder.jpg') }}" alt="Profile Placeholder">
</figure>
<div id="name">
  <div class="content">
    <h4 class="has-text-centered">{{ $name ?? $user->username }}</h4>
    <p class="has-text-centered">&#65312;{{ $user->username }}</p>
  </div>
</div>
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
            <input type="text" id="lastname" class="input" name="lastname" placeholder="Last Name" value="{{ $user->lastname }}"  data-val="{{ $user->lastname }}" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="firstname" class="input" name="firstname" placeholder="First Name" value="{{ $user->firstname }}" data-val="{{ $user->firstname }}" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="middlename" class="input" name="middlename" placeholder="Middle Initial" value="{{ $user->middlename }}" data-val="{{ $user->middlename }}">
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
            <input type="email" class="input" value="{{ $user->email }}" data-val="{{ $user->email }}" name="email" required>
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
            <input type="text" id="city" class="input" value="{{ $user->city }}" data-val="{{ $user->city }}" name="city" required>
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
      <button id="submit" class="button is-success" type="submit">Submit</button>
      <button id="cancel" class="button is-danger is-outlined" type="button">Cancel</button>
    </div>
  </form>
</div>
<div id="security_content" class="container is-fluid is-hidden">
  <form id="security_form">
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
      <div id="sec-actions" class="buttons is-centered mt-5">
        <button class="button is-success" type="submit">Submit</button>
        <button class="button is-danger is-outlined" type="button">Cancel</button>
      </div>
    </div>
  </form>
</div>
@endif
@endsection

@section('scripts')
<script src="{{ asset('js/profile.js') }}" id="js" data-user="{{ $user->username }}"></script>
@endsection
