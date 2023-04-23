<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::middleware('auth:sanctum')->get('/register',[AuthController::class, 'register']);

//Route::middleware('auth:sanctum')->post('/register', [AuthController::class, 'register']);
Route::post('/login', [LoginController::class, 'authenticate']);
Route::middleware('auth:sanctum')->post('/logout', [LoginController::class, 'disconnect']);
Route::post('/register', [AuthController::class, 'register']);
