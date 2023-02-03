import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { AllPokemons, DetailPokemon, NewPokemon, Pokemon, ResponseCreation, ResponsePokemon, responseType } from '../models/AllPokemons.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonsServiceTsService {

  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse){
    if(error.status === 0){
      console.error((`Ha ocurrido un error: ${error.error}`))
    }else {
      console.error((`Ha ocurrido un error en el backend: ${error.status}. El error es: ${error.error}`))
    }
    return throwError(() => new Error("Error en la petición de conctacto"))
  }

  getAllPokemons() : Observable<ResponsePokemon> {
    return this.http.get<ResponsePokemon>("http://localhost:8080/pokemon").pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getPokemonDetail(id : number) : Observable<DetailPokemon> {
    return this.http.get<DetailPokemon>("http://192.168.1.10:8080/pokemon/"+ id).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  searchPokemon(name : String) : Observable<ResponsePokemon>{
    console.log(name)
    return this.http.get<ResponsePokemon>("http://192.168.1.10:8080/pokemon?name="+name).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  getEvolution(id: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/evolution-chain/${id}`;
    return this.http.get<any>(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}`;
    return this.http.get<any>(url);
  }
  
  uploadImage(file : File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'preset_pabs');
    console.log(formData)
    return this.http.post("https://api.cloudinary.com/v1_1/herway-app/image/upload" , formData)
  }

  getTypes() : Observable<responseType> {
    return this.http.get<responseType>("http://192.168.1.10:8080/types").pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  createPokemon(body : NewPokemon) : Observable<ResponseCreation>{
    return this.http.post<ResponseCreation>("http://192.168.1.10:8080/pokemon",body).pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  paginado(numPage : number , order : string | null , filterType : string | null) : Observable<ResponsePokemon>{

    if(order && filterType){
      return this.http.get<ResponsePokemon>(`http://192.168.1.10:8080/pokemon/page/${numPage}?filter=${order}&filterType=${filterType}`).pipe(
      retry(2),
      catchError(this.handleError)
    )
    } else if(filterType){
      return this.http.get<ResponsePokemon>(`http://192.168.1.10:8080/pokemon/page/${numPage}?filterType=${filterType}`).pipe(
      retry(2),
      catchError(this.handleError)
      )
    } else if(order){
      return this.http.get<ResponsePokemon>(`http://192.168.1.10:8080/pokemon/page/${numPage}?filter=${order}`).pipe(
        retry(2),
        catchError(this.handleError)
        )
    }
    else{

      return this.http.get<ResponsePokemon>("http://192.168.1.10:8080/pokemon/page/"+ numPage).pipe(
      retry(2),
      catchError(this.handleError)
    )
    }
    
  }


}
