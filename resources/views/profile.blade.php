@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/profile.css') }}">
@endsection

@section('body')
<nav class="navbar">
  <div class="navbar-brand">
    <a href="{{ url('') }}" id="back" class="navbar-item has-text-white">
      <i class="fas fa-arrow-left"></i>
    </a>
    <div class="content navbar-item">
      <h3 class="has-text-white">Profile</h3>
    </div>
  </div>
</nav>
<figure class="image is-96x96 has-background-white">

</figure>
<div id="name">
  <div class="content">
    <h4 class="has-text-centered">Mack Perry Co</h4>
    <p class="has-text-centered">&#65312;McPerry</p>
  </div>
</div>
<aside class="menu">
  <strong class="menu-label">
    PROFILE
  </strong>
  <ul class="menu-list">
    <li><a href=""><i class="fas fa-user"></i><span>Account Details</span></a></li>
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
@endsection

@section('scripts')
<script src="{{ asset('js/profile.js') }}"></script>
@endsection