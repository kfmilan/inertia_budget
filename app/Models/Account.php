<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'balance',
    ];

    public function transactions(): BelongsToMany {
        return $this->belongsToMany(Account::class, 'transactions', 'account_id', 'account_id2')
        ->orWherePivot('account_id2', $this->id)
        ->as('transaction')
        ->withTimestamps()
        ->withPivot('id', 'amount', 'description')
        ->orderByPivot('created_at', 'desc');
    }

    public function updateBalance($amount)
    {
        $this->balance += $amount;
        $this->save();
    }
}
