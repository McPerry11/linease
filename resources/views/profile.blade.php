@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">
@endsection

@section('body')
<figure class="image is-96x96 has-background-white">
</figure>
<div id="name">
  <div class="content">
    <h4 class="has-text-centered">{{ $name }}</h4>
    <p class="has-text-centered">&#65312;{{ $username }}</p>
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
      <button id="edit" class="button is-text is-small" type="button" title="Edit your profile">
        <span class="icon">
          <i class="fas fa-edit"></i>
        </span>
      </button>
    </div>
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
              <p>Mack Perry L. Co</p>
            </div>
          </div>
        </div>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="control is-expanded">
            <input type="text" class="input" placeholder="Last Name" value="Co" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" class="input" placeholder="First Name" value="Mack Perry" required>
          </div>
        </div>
        <div class="field">
          <div class="control is-expanded">
            <input type="text" class="input" placeholder="Middle Initial" value="L.">
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
              <p>&#65312;{{ $username }}</p>
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
            <input type="text" class="input" value="{{ $username }}">
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
