<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginClientRequest;
use App\Http\Requests\SignupRequest;
use Illuminate\Http\Request;

use App\Models\Entite;
use App\Models\User;
use App\Models\Test;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Mail\email;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ClientController extends Controller
{

    public function loginClient(LoginClientRequest $request)
    {
        // dd('Reached loginClient method');

        $credentials = $request->validated();
        unset($credentials['remember']);

        $user = User::where('email', $credentials['email'])->first();

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

    public function me(Request $request)
    {
        return $request->user();
    }

    public function search()
    {
        $results = DB::table('marche_public')->get();

        return response()->json([
            'results' => $results
        ], 200);
    }

    public function sendNotification(Request $request)
    {
        try {
            $request->validate([
                'nif' => 'required',
                'message' => 'required',
                'numero_marche' => 'required',
                'statut' => 'required',
            ]);

            // Récupérer la date_enregistrement depuis la table marche_public
            $dateEnregistrement = DB::table('marche_public')
                ->where('numero_marche', $request->input('numero_marche'))
                ->value('date_enregistrement');

            // Ajouter 15 jours à la date_enregistrement
            $dateCible = Carbon::parse($dateEnregistrement)->addDays(15);

            // Calculer le nombre de jours restants
            $joursRestants = now()->diffInDays($dateCible);

            // Construire le message en incluant le nombre de jours restants
            $message = $request->input('message') . ' Il vous reste ' . $joursRestants . ' jours.';

            // Insérer une nouvelle notification dans la base de données
            DB::table('notification_client')->insert([
                'nif' => $request->input('nif'),
                'message' => $message,
                'statut' => $request->input('statut'),
                'numero_marche' => $request->input('numero_marche'),
                'date' => now(),
            ]);

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function affichenotif($nif)
    {
        $nif = intval($nif);
        $marches = DB::table('notification_client')->where('nif', $nif)->get();
        return response()->json([
            'results' => $marches
        ], 200);

        if (!$marches) {
            return response()->json([
                'code' => 404,
                'message' => 'Aucun Notification '

            ], 404);
        }

        return response()->json([
            'marches' => $marches
        ], 200);
    }

    public function modifNotif($id)
    {
        $notification = DB::table('notification_client')->find($id);

        if (!$notification) {
            return response()->json([
                'code' => 404,
                'message' => 'Notification non trouvée.'
            ], 404);
        }

        // Mettez à jour le statut de la notification à 0
        DB::table('notification_client')->where('id', $id)->update(['statut' => 0]);

        return response()->json([
            'code' => 200,
            'message' => 'Statut de la notification mis à jour avec succès.'
        ], 200);
    }

    public function supprimer($id)
    {

        try {
            $numero = intval($id);
            $marches = DB::table('notification_client')->where('id', $numero)->first();

            if (!$marches) {
                return response()->json([
                    'message' => 'Le marché public avec le numéro ' . $numero . ' n\'existe pas.'
                ], 404);
            }

            DB::table('notification_client')->where('id', $numero)->delete();

            return response()->json([
                'message' => "Marché supprimé avec succès."
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => "Erreur lors de la suppression du marché."
            ], 500);
        }
    }

    public function sendMail(Request $request)
    {

        $to = 'koloina.kol04@gmail.com'; // Remplacez ceci par l'adresse e-mail réelle

        Mail::to($to)->send(new email());
    }

    public function count_marche($nif)
    {
        $count = DB::table('marche_public')->where('nif_fournisseur', $nif)->count();
        return response()->json(['count' => $count]);
    }

    public function sendMess(Request $request)
    { {
            // Validation des données entrantes
            $validatedData = $request->validate([
                'id_sent' => 'required|string',
                'id_receiv' => 'required|string',
                'message' => 'required|string',
            ]);

            // Insérer le message dans la base de données
            DB::table('message')->insert([
                'id_sent' => $validatedData['id_sent'],
                'id_receiv' => $validatedData['id_receiv'],
                'message' => $validatedData['message'],
                'date' => now(),
            ]);

            // Retourner une réponse JSON
            return response()->json(['message' => 'Message sent successfully'], 200);
        }
    }

    public function indexMess()
    {
        $marches = DB::table('message')->get();

        return response()->json([
            'results' => $marches
        ], 200);
    }

    public function indexMessage($id_sent, $id_receiv)
    {
        // Convertir en entier
        $id_sent = intval($id_sent);
        $id_receiv = intval($id_receiv);

        // Récupérer les messages échangés entre id_sent et id_receiv
        $mess = DB::table('message')
            ->where(function ($query) use ($id_sent, $id_receiv) {
                $query->where('id_sent', $id_sent)
                    ->where('id_receiv', $id_receiv);
            })
            ->orWhere(function ($query) use ($id_sent, $id_receiv) {
                $query->where('id_sent', $id_receiv)
                    ->where('id_receiv', $id_sent);
            })
            ->get();

        if ($mess->isEmpty()) {
            return response()->json([
                'code' => 404,
                'message' => 'Aucun message trouvé entre les utilisateurs ' . $id_sent . ' et ' . $id_receiv,
            ], 404);
        }

        return response()->json([
            'results' => $mess,
        ], 200);
    }
}
