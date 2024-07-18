<?php

use App\Http\Controllers\AccountController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AccountController::class, 'index']);

Route::resource('accounts', AccountController::class)->except('index');