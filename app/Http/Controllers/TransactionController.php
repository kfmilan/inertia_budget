<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Router;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Account $account)
    {
        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Account $account)
    {
        $accounts = Account::all();
        return inertia('Transactions/CreateTransaction', ["account" => $account, 'accountList' => $accounts]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'account_id' => ['required', 'numeric'],
            'account_id2' => ['required', 'different:account_id', 'numeric'],
            'amount' => ['required', 'numeric'],
            'description' => ['required']
        ]);

        // Balance updates
        $account1 = Account::find($fields['account_id']);
        $account1->updateBalance($fields['amount']);
        Account::find($fields['account_id2'])->updateBalance($fields['amount']);

        // Transaction creation with pivot table
        $account1->transactions()->attach($fields['account_id2'], ['amount' => $fields['amount'], 'description' => $fields['description']]);

        return redirect(route('accounts.show', $fields['account_id']))->with('message', 'Transaction created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account, Transaction $transaction)
    {
        $fields = $request->validate([
            'amount' => ['required', 'numeric'],
            'description' => ['required']
        ]);

        $transaction->update($fields);
        return redirect(route('accounts.show', $account->id))->with('message',  'Transaction updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
