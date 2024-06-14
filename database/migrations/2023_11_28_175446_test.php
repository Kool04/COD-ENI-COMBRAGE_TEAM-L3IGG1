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
        Schema::create('test', function (Blueprint $table) {
            $table->id();
            $table->string('nif')->unique();
            $table->string('nom_entite', 50)->nullable();
            $table->string('email')->unique();
            $table->string('nom_responsable', 50)->nullable();
            $table->string('activite', 100)->nullable();
            $table->string('localisation', 30)->nullable();
            $table->integer('statistique')->nullable();
            $table->date('delivrance_stat')->nullable();
            $table->string('registre_commerce', 20)->nullable();
            $table->date('date_commerce')->nullable();
            $table->date('debut_exercicecomptable')->nullable();
            $table->string('impo_expo', 20)->nullable();
            $table->string('adresse_actuel', 20)->nullable();
            $table->string('fokotany', 20)->nullable();
            $table->string('province', 20)->nullable();
            $table->string('region', 20)->nullable();
            $table->string('district', 20)->nullable();
            $table->string('quartier', 20)->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('test');
    }
};
