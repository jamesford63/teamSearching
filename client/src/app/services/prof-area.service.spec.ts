import { TestBed, inject } from '@angular/core/testing';

import { ProfAreaService } from './prof-area.service';


describe('ProfAreaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfAreaService]
    });
  });

  it('should be created', inject([ProfAreaService], (service: ProfAreaService) => {
    expect(service).toBeTruthy();
  }));
});
