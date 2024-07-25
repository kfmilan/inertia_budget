<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\TransactionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AccountController::class, 'index'])->name('home');

Route::resource('accounts', AccountController::class)->except('index');

Route::resource('accounts.transactions', TransactionController::class)->except('index');