<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Entite extends Model
{
    use HasFactory,HasApiTokens,Notifiable;
      /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'entite';

      /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
   protected $fillable = [
        'nif',
        'nom_entite',
        'mdp',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'mdp',

    ];
}
