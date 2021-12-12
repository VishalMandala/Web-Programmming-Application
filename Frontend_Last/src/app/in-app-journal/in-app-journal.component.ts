import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-in-app-journal',
  templateUrl: './in-app-journal.component.html',
  styleUrls: ['./in-app-journal.component.css']
})
export class InAppJournalComponent implements OnInit {
  NoteArr = []
  formdata: any;

  constructor() { }

  
  ngOnInit(): void {
    this.formdata = new FormGroup({
      text: new FormControl("", Validators.required),
   });
  }

  onClickSubmit() {
    this.NoteArr.push(this.formdata.value.text)
    this.formdata.reset();
    console.log(this.NoteArr)
  }

  delete(i) {
    this.NoteArr.splice(i,1);
  }

  


}

