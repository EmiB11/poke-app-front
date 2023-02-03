import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { Pokemon, ResponseCreation, responseType, Type } from 'src/app/models/AllPokemons.interface';
import { PokemonsServiceTsService } from 'src/app/services/pokemons.service.ts.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-create-pokemon',
  templateUrl: './create-pokemon.component.html',
  styleUrls: ['./create-pokemon.component.scss']
})
export class CreatePokemonComponent implements OnInit {
  miFormValidado: FormGroup = new FormGroup({})
  matcher = new MyErrorStateMatcher();
  file = null;
  urlImage = '';
  loadingImage : boolean = false;
  listTypes : Type[] = [];
  types : string[] = [];
  selectTypes : Type[] = [];
  fileCorrect : boolean = false;

  constructor(private formBuilder : FormBuilder ,  private pokemonService: PokemonsServiceTsService) {
    this.miFormValidado = this.formBuilder.group({
      name:[null, Validators.compose([Validators.required , Validators.minLength(4), Validators.pattern(/^[A-Za-z]+$/),Validators.nullValidator] )], // campo obligatorio
      weight:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(1000) , Validators.pattern(/^([1-9]\d{0,2}|1000)$/)])],
      //campo obligatorio con valore minimos y maximos
      height:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(1000), Validators.pattern(/^([1-9]\d{0,2}|1000)$/)])],
      species:['', Validators.compose([Validators.required , Validators.minLength(30)])],
      abilities:this.formBuilder.array([this.formBuilder.group({
        name:["", Validators.required],
        slot: 1
      })]),
      stats:this.formBuilder.array([this.formBuilder.group({
        baseStat:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(255) , Validators.pattern(/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/)])],
        stat:"hp"
      }),this.formBuilder.group({
        baseStat:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(255) , Validators.pattern(/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/)])],
        stat:"attack"
      }),this.formBuilder.group({
        baseStat:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(255) , Validators.pattern(/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/)])],
        stat:"defense"
      }),this.formBuilder.group({
        baseStat:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(255) , Validators.pattern(/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/)])],
        stat:"special-attack"
      }),this.formBuilder.group({
        baseStat:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(255) , Validators.pattern(/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/)])],
        stat:"special-defense"
      }),this.formBuilder.group({
        baseStat:['',Validators.compose([Validators.required , Validators.min(1) , Validators.max(255) , Validators.pattern(/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/)])],
        stat:"speed"
      })]),
      
  
    })
   }

  ngOnInit(): void {
   console.log(this.types)
    this.pokemonService.getTypes().subscribe(
      {
        next:(response:responseType) => {
          response.body.forEach((type : Type) => this.listTypes.push(type) )
          
        },
        error: (error) => console.error(error),
        complete:()=> console.log(this.listTypes)
      }
    )
    
   
  }

  
   
  get name(){
    return this.miFormValidado.get('name')
  }
  get weight(){
    return this.miFormValidado.get('weight')
  }
  get height(){
    return this.miFormValidado.get('height')

  }
  get species(){
    return this.miFormValidado.get('species')
  }

  get abilities(): FormArray{
    
    return this.miFormValidado.get('abilities') as FormArray
  }
  
  get stats(): FormArray{
    return this.miFormValidado.get('stats') as FormArray
  }
  
    
  onChange(event : any) {
    this.file = event.target.files[0];
    
    let str = event.target.value
    console.log(str.substring(str.length , str.length - 3))
    if(str.substring(str.length,str.length -3) !== 'png' && str.substring(str.length,str.length -3) !== 'jpg' && str.substring(str.length,str.length -3) !== 'peg'
    && str.substring(str.length,str.length -3) !== 'gif' && str.substring(str.length,str.length -3) !== 'svg'){
       this.fileCorrect = true
     alert("Formato incorrecto.El formato aceptado para guardar una imagen es png , jpg , jpeg , svg , gif")
    }
    else{
      this.fileCorrect = false
    }

    }
   // Metodo para añadir habilidades a la lista
   addAbility(e : any){
    e.preventDefault()
    const ability = this.formBuilder.group({
      name:"",
      slot: 1
    })
    //Añadimos el grupo a la lista 
    this.abilities.push(ability)
    console.log(ability)
  }

  handleChange(event : any){
    console.log(event)
    if(!this.types.find(type => type === event.value)){

      this.types.push(event.value)
      console.log(this.types)
    }
  }

  saveImage(){
    if(this.file){

      let imageOk = Object.values(this.file) 
      console.log(imageOk)
   this.loadingImage = true;
    this.pokemonService.uploadImage(this.file).subscribe(
      {
        next:(response : any) => {
           this.urlImage = response.secure_url
           console.log(this.urlImage)
           this.loadingImage = false
        },
        error: (error) => console.error(error)
      }
    )
    }
  }

  //Metodo de submit del formulario
  envairFormulario(){
     
     
      //controlamos que el formulario sa valido
    if(!this.urlImage.length){
      alert("Falta agregar una imagen para crear el pokemon")
     return
    }
    if(this.urlImage.substring(this.urlImage.length,this.urlImage.length -3) !== 'png' && this.urlImage.substring(this.urlImage.length,this.urlImage.length -3) !== 'jpg' && this.urlImage.substring(this.urlImage.length,this.urlImage.length -3) !== 'peg'
       && this.urlImage.substring(this.urlImage.length,this.urlImage.length -3) !== 'gif' && this.urlImage.substring(this.urlImage.length,this.urlImage.length -3) !== 'svg'){
        console.log(this.urlImage.substring(this.urlImage.length,this.urlImage.length -3))
        alert("Formato incorrecto.El formato aceptado para guardar una imagen es png , jpg , jpeg , svg , gif")
       }

    if(!this.types.length){
      alert("Por favor ingrese un tipo de pokemon ")
     return
    }
    if(this.miFormValidado.valid){

      this.types.forEach((t : string) => {
         this.listTypes.forEach(type => {
         if(t === type.type){
            this.selectTypes.push(type)
         }
        }) 
        
      })

      let sprites;
      if(this.urlImage.substring(this.urlImage.length,this.urlImage.length -3) === 'gif'){
       sprites = {
        backDefault:  'https://res.cloudinary.com/herway-app/image/upload/v1671081649/Pokemon08_ihwvtv.png',
        frontDefault: 'https://res.cloudinary.com/herway-app/image/upload/v1671081649/Pokemon08_ihwvtv.png',
        versions: this.urlImage   
      } 
      }else{
         sprites = {
          backDefault: this.urlImage,
          frontDefault: this.urlImage,
          versions: "https://res.cloudinary.com/herway-app/image/upload/v1670988086/profesor_ozv6rl.gif"   
        } 
      }
      console.log(sprites)
    const body = {
      
      weight: this.miFormValidado.value.weight ,    
      height: this.miFormValidado.value.height,   
      name: this.miFormValidado.value.name.toLowerCase(),  
      species:this.miFormValidado.value.species,  
      sprites: sprites ,
      abilities: this.miFormValidado.value.abilities,
      stats: this.miFormValidado.value.stats,    
      types: this.selectTypes   
    }
      //console.table(this.miFormValidado.value.abilities)
      console.log(body)
      this.pokemonService.createPokemon(body).subscribe(
        {
          next:(response : ResponseCreation) => {
            alert(response.body)
          },
          error:(err) => alert(err)
        }
      ) 
      // resetear los campos del fomrulario
    }else{
      alert("no se pudo crear")
    }
  }
  deleteAbility(index : number){
    this.abilities.removeAt(index)
  }
  deleteType(index : number){
    this.types = this.types.filter((type,  i) => i !== index)
  }
  
}
