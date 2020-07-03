@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">
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
<aside class="menu">
  <strong class="menu-label">
    PROFILE
  </strong>
  <ul class="menu-list">
    <li><a href="{{ url($user->username . '/details') }}"><i class="fas fa-user"></i><span>Account Details</span></a></li>
    <li><a href=""><i class="fas fa-chart-bar"></i><span>Your Reports</span></a></li>
  </ul>
  <strong class="menu-label">
    SECURITY
  </strong>
  <ul class="menu-list">
    <li><a href=""><i class="fas fa-lock"></i><span>Change Password</span></a></li>
  </ul>
  <strong class="menu-label">
    LINEASE
  </strong>
  <ul class="menu-list">
    <li><a href=""><i class="fas fa-comment-dots"></i><span>Feedback</span></a></li>
  </ul>
</aside>
<div class="level">
  <div class="level-item">
    <form method="POST">
      @csrf
      <button id="logout" class="button" type="submit">Logout</button>
    </form>
  </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/profile.js') }}"></script>
@endsection
