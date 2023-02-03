import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AllPokemons, DetailPokemon, Pokemon, ResponsePokemon } from 'src/app/models/AllPokemons.interface';
import { PokemonsServiceTsService } from 'src/app/services/pokemons.service.ts.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss']
})
export class DetailPokemonComponent implements OnInit ,OnDestroy {

  subscriptions: Subscription[] = [];
  pokemon : Pokemon | undefined;
  evolutionPokemon : any = []
  description : string[] = []
  descriptionStr : string = ''
  constructor(private route : ActivatedRoute , private pokemonService : PokemonsServiceTsService , private router :Router) { }
  
  set subscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      ( params : any) => {
         if(params.id){
         this.subscription = this.pokemonService.getPokemonDetail(params.id).subscribe(
            {
            next:(response : DetailPokemon) => {
              this.pokemon = response.body
            this.description =  this.pokemon.species.split("|").filter((str, i) => {
                 return this.pokemon?.species.split("|").indexOf(str) === i
              })
              
              this.descriptionStr = this.description.join(",")
              this.descriptionStr = this.descriptionStr.replaceAll("," ,"")
              console.log(this.descriptionStr)
              if(!this.evolutionPokemon.length){
              this.subscription = this.pokemonService.getSpecies(this.pokemon.name).subscribe(response => {
                const id = this.getId(response.evolution_chain.url);
                console.log(id)
                this.subscription =  this.pokemonService.getEvolution(id).subscribe(response => this.getEvolves(response.chain));
              });
            }
            },
            error: (error) => console.error(error),
            complete:()=> {
              console.log(this.evolutionPokemon)
            }

            }
           )
         }
       }
     )
     
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription ? subscription.unsubscribe() : 0);
    this.evolutionPokemon = []
   
  }
  getId(url: string): number {
    const splitUrl = url.split('/')
    return +splitUrl[splitUrl.length - 2];
  }

  getEvolves(chain: any) {
    this.evolutionPokemon.push({
      id: this.getId(chain.species.url),
      name: chain.species.name
    });

    if (chain.evolves_to.length) {
      this.getEvolves(chain.evolves_to[0]);
    }
  }

  reloadPag(id: number){
    if(id !== this.pokemon?.id){
    this.router.navigate(['detail/'+ id])
    this.evolutionPokemon = []
    }
  }
  
}
