import { TestBed } from '@angular/core/testing';

import { PokemonsServiceTsService } from './pokemons.service.ts.service';

describe('PokemonsServiceTsService', () => {
  let service: PokemonsServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
