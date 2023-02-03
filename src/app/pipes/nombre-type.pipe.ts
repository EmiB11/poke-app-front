import { Pipe, PipeTransform } from '@angular/core';
import { AllPokemons, Pokemon } from '../models/AllPokemons.interface';

@Pipe({
  name: 'nombreType'
})
export class NombreTypePipe implements PipeTransform {

  transform(pokemon: AllPokemons | Pokemon, ...args: unknown[]): string {
     return pokemon.types[0].type
  }

}
