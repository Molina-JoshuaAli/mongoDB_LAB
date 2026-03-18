import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokemonserviceService } from '../pokemonservice.service';

@Component({
  selector: 'app-pokemon-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.css']
})
export class PokemonFormComponent implements OnInit {

  private pokemonService = inject(PokemonserviceService);

  pokemon = {
    name: '',
    type: '',
    level: '',
    nature: ''
  };

  pokemonList = this.pokemonService.pokemonList;

  ngOnInit() {
    this.pokemonService.fetchPokemon();
  }

  submitPokemon() {
    if (!this.pokemon.name || !this.pokemon.type) {
      alert('Name and Type are required!');
      return;
    }

    this.pokemonService.savePokemon(this.pokemon).subscribe({
      next: () => {
        this.pokemonService.fetchPokemon();

        this.pokemon = {
          name: '',
          type: '',
          level: '',
          nature: ''
        };
      },
      error: (err) => console.error('Save error:', err)
    });
  }
}