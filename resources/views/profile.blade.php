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
<aside class="menu">
  <strong class="menu-label">
    PROFILE
  </strong>
  <ul class="menu-list">
    <li><a href="{{ url($username . '/details') }}"><span class="icon"><i class="fas fa-user"></i></span><span>Account Details</span></a></li>
    <li><a href=""><span class="icon"><i class="fas fa-chart-bar"></i></span><span>Your Reports</span></a></li>
  </ul>
  <strong class="menu-label">
    SECURITY
  </strong>
  <ul class="menu-list">
    <li><a href=""><span class="icon"><i class="fas fa-lock"></i></span><span>Change Password</span></a></li>
  </ul>
  <strong class="menu-label">
    LINEASE
  </strong>
  <ul class="menu-list">
    <li><a href=""><span class="icon"><i class="fas fa-comment-dots"></i></span><span>Feedback</span></a></li>
  </ul>
</aside>
<form method="POST">
  @csrf
  <div class="buttons is-centered">
    <button id="logout" class="button" type="submit">Logout</button>
  </div>
</form>
@endsection

@section('scripts')
<script src="{{ asset('js/profile.js') }}"></script>
@endsection
