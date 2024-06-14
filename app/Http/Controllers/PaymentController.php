<?php

namespace App\Http\Controllers;

use App\Http\Requests\paymentRequest;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\DB;

class PaymentController extends Controller
{
    public function index()
    {
        $paye = DB::table('payment')->get();

        return response()->json([
            'results'=> $paye
        ],200);
    }

    public function payer(paymentRequest $request)
    {
       try{
        $date_payment = now();

        DB::table('payment')->insert([
            'numero_payment' =>$request->numero_payment,
            'nif'=>$request->nif,
            'numero_marche'=>$request->numero_marche,
            'compte_exp' =>$request->compte_exp,
            'compte_dest' =>$request->compte_dest,
            'montant' =>$request->montant,
            'banque' =>$request->banque,
            'code_etablisement' =>$request->code_etablisement,
            'code_guichet' =>$request->code_guichet,
            'RIB' =>$request->RIB,
            'motif' => $request->motif,
            'date_payment' =>$date_payment,
        ]);

        DB::table('marche_public')
        ->where('numero_marche', $request->numero_marche)
        ->update(['statut' => 'payé']);

        return response ()->json([
            'message'=>"Marche payer avec succes."
        ],200);

       }catch(\Exception $e){
        return response()->json([
            'message' => "Errrreurrrrr". $e->getMessage()
        ],500);
       }
    }

    public function affichepayment($nif)
    {
        $nif = intval($nif);
        $marches = DB::table('payment')->where('nif', $nif)->get();
        return response()->json([
            'results'=> $marches
        ],200);

        if (!$marches) {
            return response()->json([
                'code' => 404,
                'message' => 'il n y a aucun payment avec le numéro ' . $nif

            ], 404);
        }

        return response()->json([
            'marches' => $marches
        ], 200);
    }
}
