<?php

namespace App\Http\Controllers;

use Auth;
use App\Log;
use App\User;
use App\Report;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ReportController extends Controller
{
  /**
   * Display a listing of the resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function index(Request $request)
  {
    if ($request->source == 'map')
      return response()->json(Report::all());
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function create()
  {
    return view('camera');
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request)
  {
    $report = new Report;

    $report->user_id = Auth::id();
    $report->latitude = $request->lat;
    $report->longitude = $request->lng;
    $report->description = $request->des;
    $report->severity = $request->sev;
    $report->address = $request->add;

    do {
      $number = mt_rand(1, 99999);
      $filename = $number . '-' . Carbon::now()->isoFormat('MM-DD-YYYY HH-mm-ss') . '.jpg';
      $duplicate = Report::where('picture', $filename)->get();
    } while (count($duplicate) > 0);
    $report->picture = $filename;

    $img = $request->img;
    $img = str_replace('data:image/jpeg;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $imgData = base64_decode($img);
    Storage::disk('reports')->put($filename, $imgData);

    $report->save();
    Log::create([
      'user_id' => Auth::id(),
      'report_id' => $report->id,
      'ip_address' => $request->ip(),
      'description' => Auth::user()->username . ' added a ' . strtolower($report->severity) . ' report.'
    ]);

    return response()->json('Report Successfully Uploaded');
  }

  /**
   * Display the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function show($id)
  {
    $report = Report::find($id);
    $report->date = Carbon::parse($report->created_at)->isoFormat('MMM D, YYYY - hh:mma');
    $report->username = User::find($report->user_id)->username;

    return response()->json($report);
  }

  /**
   * Show the form for editing the specified resource.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function edit($id)
  {
    //
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id)
  {
    //
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  int  $id
   * @return \Illuminate\Http\Response
   */
  public function destroy($id)
  {
    //
  }
}
