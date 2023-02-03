import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PokemonsServiceTsService } from 'src/app/services/pokemons.service.ts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AllPokemons, Pokemon, ResponsePokemon, responseType, Type } from 'src/app/models/AllPokemons.interface';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[]
})
export class HomeComponent implements OnInit {
  classicMode: boolean = true;
  isSearching = false;
  search : FormControl = new FormControl("");
  isLoading : boolean = true
  searchPokemons : AllPokemons[] = []
  listPokemons : AllPokemons[] = []
  numberPage : number = 1;
  listTypes : Type[] = []
  allPokemons : AllPokemons[] = []
  auxListPokemon : AllPokemons[] = []
  disabledPagin : boolean = false;
  orden : string | null = null
  type : string | null = null
  lengthList : number = 0
 
  constructor(private pokemonService : PokemonsServiceTsService,  private snackBar: MatSnackBar , private router: Router ) {
    
   }

  ngOnInit(): void {
     
    this.pokemonService.getAllPokemons().subscribe(
      {
        next:(response:ResponsePokemon) => {
          response.body.forEach((pokemon : AllPokemons) => {
            this.allPokemons.push(pokemon) 
            this.lengthList = this.allPokemons.length 
          })
          
        },
        error: (error) => console.error(error)
       
      }
    ) 

    this.pokemonService.getTypes().subscribe(
      {
        next:(response:responseType) => {
          response.body.forEach((type : Type) => this.listTypes.push(type) )
          
        },
        error: (error) => console.error(error),
        complete:()=> console.log(this.listTypes)
      }
    )
    
   
    this.pokemonService.paginado(this.numberPage, this.orden , this.type).subscribe(
      {
        next:(response:ResponsePokemon) => {
         this.listPokemons = response.body
         this.auxListPokemon = response.body
        console.log(this.listPokemons)
        },
        error: () => {this.snackBar.open('Internal Server error', 'Error 500', {
          duration: 5000,
        })
         this.isLoading = false
         this.router.navigate(['server-error'])
      },
        complete:()=> this.isLoading = false
      }
    )

  }
   
  onSearchPokemon(): void {
    const value = this.search.value;
    if(value === '') {
      this.isSearching = false;
      this.disabledPagin = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.disabledPagin = true
      this.pokemonService.searchPokemon(value.toLowerCase())
      .subscribe(
        {
          next:(response : ResponsePokemon) => {
            this.isLoading = false;
            this.searchPokemons = []
            response.body.forEach((pokemon : AllPokemons) => this.searchPokemons.push(pokemon) )
            console.log(this.searchPokemons)
            this.lengthList = this.searchPokemons.length   
          },
          error: () => this.snackBar.open('Sorry, Pokemon not found', 'Ok', {
            duration: 5000,
          }),
          complete:()=>{ 
            this.isLoading = false
             this.search.reset()
          }
        }
      )
        
        
    }
  }
  
  
  handlePage(e : PageEvent){
    
    this.numberPage = e.pageIndex + 1
    console.log(this.numberPage)
     
    this.pokemonService.paginado(this.numberPage, this.orden , this.type).subscribe(
      {
        next:(response:ResponsePokemon) => {
         this.listPokemons = response.body
        },
        error: (error) => console.error(error),
        complete:()=> this.isLoading = false
      }
    )

  }

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Page 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${amountPages}`;
  }
  createPokemon(): void {
    this.router.navigate(['create-pokemon'])
  }

  filterByTypes(event : any): void{
    
    this.disabledPagin = false;
    this.isSearching = false;
    this.type = null
    this.lengthList = this.allPokemons.length
    if(event.value !== 'ALL' ){
        this.disabledPagin = true
        this.type= event.value
       let auxPokemons : AllPokemons[] = []
        for(let pokemon of this.allPokemons){
          for(let t of pokemon.types){
            if(t.type === event.value){
              auxPokemons.push(pokemon)
            }
          }
        }
        this.lengthList = auxPokemons.length

        this.pokemonService.paginado(1, this.orden , this.type).subscribe(
          {
            next:(response:ResponsePokemon) => {
             this.listPokemons = response.body
             console.log(response)
            },
            error: (error) => console.error(error),
            complete:()=> this.isLoading = false
          }
        )   
    }
    else {
      
      this.pokemonService.paginado(1, this.orden , this.type).subscribe(
        {
          next:(response:ResponsePokemon) => {
           this.listPokemons = response.body
           console.log(response)
          },
          error: (error) => console.error(error),
          complete:()=> this.isLoading = false
        }
      )   
    }
   
  }

  orderAlfab(event : any):void {
     
      console.log(event.value , 'ASC')
      if(event.value !== 'NOT_ORDER'){
      this.orden = event.value
         this.pokemonService.paginado(1, this.orden , this.type).subscribe(
          {
            next:(response:ResponsePokemon) => {
             this.listPokemons = response.body
             console.log(response)
            },
            error: (error) => console.error(error),
            complete:()=> this.isLoading = false
          }
        ) 
    }
    else{
      this.orden = null
      this.pokemonService.paginado(1, this.orden , this.type).subscribe(
        {
          next:(response:ResponsePokemon) => {
           this.listPokemons = response.body
           console.log(response)
          },
          error: (error) => console.error(error),
          complete:()=> this.isLoading = false
        }
      ) 
    }
     
  }
}
