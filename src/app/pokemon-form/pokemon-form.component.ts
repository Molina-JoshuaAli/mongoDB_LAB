import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { PokemonserviceService } from '../pokemonservice.service';
@Component({
  selector: 'app-pokemon-form',
  imports: [ReactiveFormsModule],
  templateUrl: './pokemon-form.component.html',
  styleUrl: './pokemon-form.component.css'
})
export class PokemonFormComponent {
  private formBuilder = inject(FormBuilder);
  pokemonservice = inject(PokemonserviceService);

  pokemonForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    type: ['', Validators.required],
    level: ['', Validators.required],
    nature: ['', Validators.required],
  })

  onSubmit(){
    if(this.pokemonForm.valid){
      this.pokemonservice.savePokemon(this.pokemonForm.getRawValue()).subscribe(() => {
        this.pokemonservice.fetchPokemon(); //Refreshes Data

        this.pokemonForm.reset; //Clear Form
      })
    }
  }
}
