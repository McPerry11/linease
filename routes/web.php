<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('login', 'IndexController@login')->name('login');
Route::post('login', 'LoginController@login')->middleware('throttle:10,3');

Route::get('register', 'UsersController@create');
Route::post('register', 'UsersController@store');

Route::post('users', 'UsersController@index');

Route::group(['middleware' => 'auth'], function() {
	Route::get('', 'IndexController@dashboard');
	Route::post('markers', 'ReportController@index');

	Route::get('camera', 'ReportController@create');
	Route::post('camera', 'ReportController@store');

  Route::get('accounts', 'IndexController@accounts');

  Route::get('settings', 'IndexController@settings');

  Route::get('logs', 'IndexController@logs');

  Route::get('{username}', 'UsersController@show');
  Route::post('{username}', 'LoginController@logout');
  Route::get('{username}/details', 'UsersController@edit');
});

// Route::fallback(function() {
// 	return 'Excuse me';
// });
