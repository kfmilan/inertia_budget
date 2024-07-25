<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $accounts = Account::latest()->paginate(10);
        return inertia('Home', ['accounts' => $accounts]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Accounts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => ['required'],
            'balance' => ['required', 'numeric'],
        ]);

        Account::create($fields);
        return redirect('/')->with('message', 'Account created.');
    }


    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        $transactions = $account->transactions->map(function ($transaction) {return $transaction->transaction;});
        return inertia('Accounts/Show', ['account' => $account, 'transactions'=> $transactions]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        return inertia('Accounts/Edit', ['account' => $account]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        $fields = $request->validate([
            'name' => ['required'],
            'balance' => ['required'],
        ]);

        $account->update($fields);
        return redirect('/')->with('message', 'Account updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        $account->delete();
        return redirect('/')->with('message', 'Account deleted.');
    }

}
