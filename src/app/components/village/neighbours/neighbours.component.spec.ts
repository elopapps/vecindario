import {TestBed, ComponentFixture, inject, async} from '@angular/core/testing';
import {NeighboursComponent} from './neighbours.component';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import { Neighbour } from '../../../classes/neighbour';


describe('Component: Neighbours', () => {

  let component: NeighboursComponent;
  let fixture: ComponentFixture<NeighboursComponent>;
  let imgel: DebugElement;
  let cardel:DebugElement;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [NeighboursComponent]
    });


    // create component and test fixture
    fixture = TestBed.createComponent(NeighboursComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    imgel = fixture.debugElement.query(By.css('.card-img-top'));
    cardel = fixture.debugElement.query(By.css('.holder'));
  });

  it('passing empty neighbour renders nothing', () => {
    let newNeigh:Neighbour = {};
    newNeigh.thumbnail = '';
    newNeigh.professions = [];
    newNeigh.friends = [];
    component.neighbour = newNeigh;
    fixture.detectChanges();
    expect(imgel.attributes['src']).toBeFalsy;
  });

  it('Clicking the card holder emits clicked neighbours id', (done) => {
    let newNeigh:Neighbour = {};
    newNeigh.id = 666;
    newNeigh.thumbnail = '';
    newNeigh.professions = [];
    newNeigh.friends = [];
    component.neighbour = newNeigh;
    fixture.detectChanges();

    let emitid:number = null;
    // Subscribe to the Observable and store the user in a local variable.
    component.cardClick.subscribe((value) => {
        emitid = value;
           // Now we can check to make sure the emitted value is correct
        expect(emitid).toBe(666);
        done();
    });
    cardel.triggerEventHandler('click', null);
    fixture.detectChanges();


  });
})
;