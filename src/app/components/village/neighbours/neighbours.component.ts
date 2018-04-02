import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Neighbour } from '../../../classes/neighbour';

@Component({
  selector: 'app-neighbours',
  templateUrl: './neighbours.component.html',
  styleUrls: ['./neighbours.component.css']
})
export class NeighboursComponent implements OnInit {

  constructor() { }

  @Input()
  neighbour: Neighbour;

  @Output() cardClick = new EventEmitter();

  ngOnInit() {
  }

  cardClicked(){
    this.cardClick.emit(this.neighbour.id);
  }

}
