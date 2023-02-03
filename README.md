# FrontPokeApp

#  Pokemon App

<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando Angular, Typescript , Java y Spring.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.
- Usar y practicar testing.



## Descripción del proyecto

 Es una aplicación en la cual se puedan ver los distintos Pokemon utilizando la api externa [pokeapi](https://pokeapi.co/) guardar los datos mas importantes en la base de datos y a partir de la base de datos creada  poder, entre otras cosas:

  - Buscar pokemons
  - Filtrarlos / Ordenarlos
  - Crear nuevos pokemons
  - Editar los nuevos pokemons creados , no se pueden editar los pokemons existentes.
  - Eliminar los pokemons creados , no se pueden eliminar los pokemons existentes.


#### Frontend

 Aplicación desarrollada en Angular que contiene las siguientes pantallas/rutas.

__Pagina inicial__: una landing page con
- [ ] imagen de fondo representativa al proyecto
- [ ] Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: contiene
- [ ] Input de búsqueda para encontrar pokemons por nombre (La búsqueda será exacta, es decir solo encontrará al pokemon si se coloca el nombre completo)
- [ ] Área donde se ve el listado de pokemons. Al iniciar carga los primeros resultados obtenidos desde la ruta `GET /pokemons` y muestra su:
  - Imagen
  - Nombre
  - Tipos (Electrico, Fuego, Agua, etc)
- [ ] Botones/Opciones para filtrar por tipo de pokemon y los creados
- [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemons por orden alfabético y por fuerza
- [ ] Paginado para ir buscando y mostrando los siguientes pokemons, 12 pokemons por pagina.



__Ruta de detalle de Pokemon__: contiene
- [ ] Los campos mostrados en la ruta principal para cada pokemon (imagen, nombre y tipos)
- [ ] Número de Pokemon (id)
- [ ] Estadísticas (vida, fuerza, defensa, velocidad , defensa especial , ataque especial)
- [ ] Altura y peso
- [ ] Botón de editar que lleva a otra ruta para la edición del pokemon
- [ ] Botón de eliminar
__Ruta de creación__: contiene
- [ ] Un formulario __controlado con JavaScript__ con los campos mencionados en el detalle del Pokemon
- [ ] Posibilidad de seleccionar/agregar más de un tipo de Pokemon
- [ ] Botón para crear un nuevo Pokemon

__Ruta de Edición__: contiene
- [ ] Un formulario __controlado con JavaScript__ con los campos mencionados en el detalle del Pokemon
- [ ] Botón para editar un Pokemon


#### Base de datos

El modelo de la base de datos tiene las siguientes entidades :

- [ ] Pokemon con las siguientes propiedades:
  - ID (Número de Pokemon): 
  - Nombre 
  - Imagenes (Sprites)
  - Abilities
  - Description (Species)
  - Stats
  - Types
  - Heigth
  - Weigth

- [ ] Types con las siguientes propiedades:
  - ID
  - Nombre
- [ ] Stats con las siguientes propiedades:
  - ID
  - BaseStat
  - stat
- [ ] Abilities con las siguientes propiedades:
  - ID
  - Nombre
  - slot
- [ ] Imagenes con las siguientes propiedades:
  - ID
  - imagen_big (frontDefault)
  - image      (backDefault)
  - image_animated (versions)
