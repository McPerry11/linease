@extends('_layout')

@section('styles')
<link rel="stylesheet" href="{{ asset('css/accdetails.css') }}">
@endsection

@section('body')
@include('_navbar_acc')
@endsection

@section('scripts')
<script src="{{ asset('js/accdetails.js') }}"></script>
@endsection