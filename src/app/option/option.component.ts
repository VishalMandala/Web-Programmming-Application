import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css']
})
export class OptionComponent implements OnInit {
  @Output() role = new EventEmitter<string>();


  constructor() { }

  ngOnInit(): void {
  }

  onClick(value: string) {
    this.role.emit(value);
  }

}
