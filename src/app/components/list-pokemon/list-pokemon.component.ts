import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllPokemons , ResponsePokemon } from 'src/app/models/AllPokemons.interface';
import { PokemonsServiceTsService } from 'src/app/services/pokemons.service.ts.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {
  @Input() classicMode: boolean = true;
  @Input() isLoading: boolean = true;
  @Input() isSearching : boolean = false;
  @Input() listPokemons : AllPokemons[] = [];
  @Input() searchPokemons : AllPokemons[] = []
  
  constructor(private router: Router , private route: ActivatedRoute ,
     private pokemonService: PokemonsServiceTsService ) { }

  ngOnInit(): void {

  }

  onScroll(event: Event): void {
    const element: HTMLDivElement = event.target as HTMLDivElement;
    if(element.scrollHeight - element.scrollTop < 1000) {
      this.listPokemons;
    }
  }

  

}
