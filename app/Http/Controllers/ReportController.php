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
    if (Auth::user()->verified) {
      return view('camera');
    }
    return redirect('dashboard');
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

    $number = Auth::id();
    $filename = $number . '-' . Carbon::now()->isoFormat('MMDDYYYY-HHmmss') . '.jpg';
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
    $report->username = $report->user->username;

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
    $report = Report::find($id);
    $id = $report->id;
    $user = User::find($report->user_id);
    if ($request->status == 'resolved') {
      $report->verified = true;
      $report->severity = 'RESOLVED';
      $user->sat+=2;
      $user->save();
      $report->save();
      $response = 'Report Marked As Resolved';
      $description = Auth::user()->username . ' marked Report #' . $report->id . ' as resolved.';
    } else if ($request->status == 'verified') {
      $report->verified = true;
      $user->sat++;
      $user->save();
      $report->save();
      $response = 'Report Marked As Verified';
      $description = Auth::user()->username . ' marked Report #' . $report->id . ' as verified.';
    } else {
      if ($request->status == 'inaccurate') {
        $user->unsat++;
        $user->save();
        $response = 'Report Marked As Inaccurate';
        $description = Auth::user()->username . ' marked Report #' . $report->id . ' as inaccurate and removed from the map.';
      } else {
        $user->unsat+=2;
        $user->save();
        $response = 'Report Marked As Invalid';
        $description = Auth::user()->username . ' marked Report #' . $report->id . ' as invalid and removed from the map.';
      }
      Storage::disk('reports')->delete($report->picture);
      $report->delete();
    }

    Log::create([
      'user_id' => Auth::id(),
      'ip_address' => $request->ip(),
      'description' => $description
    ]);

    return response()->json($response);
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
