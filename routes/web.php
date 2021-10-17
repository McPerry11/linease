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


Route::middleware(['desktop'])->group(function() {
  Route::get('desktop', 'IndexController@desktop');
  Route::get('not_found', 'IndexController@notfound');

  Route::get('login', 'IndexController@login')->name('login');
  Route::post('login', 'LoginController@login')->middleware('throttle:10,3')->name('login_post');
  Route::post('logout', 'LoginController@logout')->name('logout');

  Route::get('register', 'UsersController@create');
  Route::post('register', 'UsersController@store');

  Route::post('users', 'UsersController@index');

  Route::middleware(['auth'])->group(function() {
    Route::get('', 'IndexController@dashboard')->name('dashboard');
    Route::post('markers', 'ReportController@index');

    Route::get('camera', 'ReportController@create');
    Route::post('camera', 'ReportController@store');

    Route::get('logs', 'IndexController@logs')->middleware('access:logs');

    Route::get('accounts', 'IndexController@accounts')->middleware('access:accounts');

    // Route::get('settings', 'IndexController@settings');

    Route::get('{username}', 'UsersController@show');
    Route::post('{username}/profile', 'UsersController@edit');
    Route::post('{username}/update', 'UsersController@update');
  });
});

Route::fallback(function() {
  return redirect('not_found');
});
