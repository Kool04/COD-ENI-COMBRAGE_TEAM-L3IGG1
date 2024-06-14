<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('marche_public', function (Blueprint $table) {
            $table->string('numero_marche',20)->primary();
            $table->string('numero_convention',50)->nullable();
            $table->string('titulaire_marche',50)->nullable();
            $table->string('nature', 50)->nullable();
            $table->text('objet')->nullable();
            $table->string('montant_marche', 30)->nullable();
            $table->string('financement',30)->nullable();
            $table->string('imputation_budgetaire',50)->nullable();
            $table->string('compte',50)->nullable();
            $table->string('mode_passation',30)->nullable();
            $table->string('type_marche', 50)->nullable();
            $table->string('fournisseur',50)->nullable();
            $table->string('nom_fournisseur',50)->nullable();
            $table->string('nif_fournisseur',10)->nullable();
            $table->string('lieu',30)->nullable();
            $table->date('date_signature')->nullable();
            $table->date('date_approbation')->nullable();
            $table->date('date_notification')->nullable();
            $table->timestamp('date_enregistrement')->nullable();
            $table->string('dure_validite',20)->nullable();
            $table->string('statut', 20)->nullable();
            $table->string('pourcentage',30)->nullable();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('marche_public');
    }
};
