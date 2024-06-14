<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\LoginClientRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Entite;
use App\Models\Test;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class AuthController extends Controller
{
    public function signup(SignupRequest $request)
    {
        $data = $request->validated();

        /** @var \App\Models\User $user */
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' =>$data['password'],
        ]);
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        unset($credentials['remember']);

        $user = Test::where('nif', $credentials['nif'])->first();

        if (!$user || $user->password !== $credentials['password']) {
            return response([
                'error' => 'The provided credentials are not correct'
            ], 422);
    }

    $token = $user->createToken('main')->plainTextToken;

    return response([
        'user' => $user,
        'token' => $token
    ]);
    }

    public function logout(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();
        // Revoke the token that was used to authenticate the current request...
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }

    public function count_paye ($nif)
    {
        $count = DB::table('marche_public')->where('nif_fournisseur', $nif)->where('statut', 'payé')->count();;
        return response()->json(['counts' => $count]);
    }

    public function me(Request $request)
    {
        return $request->user();
    }
}
