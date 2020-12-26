/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VehicleTelematicsService } from './vehicle-telematics.service';

describe('Service: VehicleTelematics', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VehicleTelematicsService]
    });
  });

  it('should ...', inject([VehicleTelematicsService], (service: VehicleTelematicsService) => {
    expect(service).toBeTruthy();
  }));
});
