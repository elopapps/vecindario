import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VillageComponent } from './village.component';
import { VillageService } from '../../services/village.service';
import { FilterService } from '../../services/filter.service';
import { MemoryService } from '../../services/memory.service';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NeighboursComponent } from './neighbours/neighbours.component';

describe('VillageComponent', () => {
  let component: VillageComponent;
  let fixture: ComponentFixture<VillageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, InfiniteScrollModule ],
      declarations: [ VillageComponent, NeighboursComponent ], 
      providers: [VillageService, MemoryService, FilterService, VillageComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VillageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load neighbours from the server', () => {
    let service = TestBed.get(VillageComponent);
    spyOn(service, 'getItems').and.returnValue(Observable.from([1,2,3]));
    fixture.detectChanges();
    expect(component.people.length).toBe(3);
  });
});
