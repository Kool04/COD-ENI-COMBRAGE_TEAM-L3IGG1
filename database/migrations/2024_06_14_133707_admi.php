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
        Schema::create('admi', function (Blueprint $table) {
            $table->id();
            $table->string('utilisateur', 20)->nullable();
            $table->string('nom', 20)->nullable();
            $table->string('prenom', 20)->nullable();
            $table->string('poste', 30)->nullable();
            $table->string('localisation')->nullable();
            $table->string('mdp')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admi');
    }
};
