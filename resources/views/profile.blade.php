@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">
<link rel="stylesheet" href="{{ asset('css/bulma-divider.min.css') }}">
@endsection

@section('body')
<figure class="image is-96x96 has-background-white">
</figure>
<div id="name">
  <div class="content">
    <h4 class="has-text-centered">{{ $name ?? $user->username }}</h4>
    <p class="has-text-centered">&#65312;{{ $user->username }}</p>
  </div>
</div>
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
    <div class="buttons is-right mb-0">
      <button id="edit" class="button is-text mb-0" type="button" title="Edit your profile">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
      </button>
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
              <p>{{ $name ?? '' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="lastname" class="input" placeholder="Last Name" value="{{ $user->lastname }}" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="firstname" class="input" placeholder="First Name" value="{{ $user->firstname }}" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="middlename" class="input" placeholder="Middle Initial" value="{{ $user->middlename }}">
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
              <p>&#65312;{{ $user->username }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field has-addons">
          <div class="control">
            <a class="button is-static">&#65312;</a>
          </div>
          <div class="control is-expanded">
            <input type="text" id="username" class="input" value="{{ $user->username }}" required>
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
              <p>{{ $user->email }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="email" id="email" class="input" value="{{ $user->email }}" required>
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
              <p>{{ $user->city }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="city" class="input" value="{{ $user->city }}" required>
          </div>
        </div>
      </div>
    </div>
    <div class="field is-horizontal">
      <div class="field-label">
        <div class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <label class="label">Phone Number</label>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <p>{{ $user->phone }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="text" id="phone" class="input" value="{{ $user->phone }}" required>
          </div>
        </div>
      </div>
    </div>
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
              <p>{{ $user->birthdate ? \Carbon\Carbon::parse($user->birthdate)->isoFormat('MM/DD/YYYY') : '' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="date" id="birthdate" class="input" value="{{ $user->birthdate ? \Carbon\Carbon::parse($user->birthdate)->isoFormat('YYYY-MM-DD') : '' }}" required>
          </div>
        </div>
      </div>
    </div>
    <div id="actions" class="buttons is-centered">
      <button id="cancel" class="button" type="button">Cancel</button>
      <button id="submit" class="button" type="submit">Submit</button>
    </div>
  </form>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/profile.js') }}"></script>
@endsection
