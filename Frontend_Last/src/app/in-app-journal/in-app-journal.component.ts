import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-in-app-journal',
  templateUrl: './in-app-journal.component.html'
})
export class InAppJournalComponent implements OnInit {
  NoteArr = []
  formdata: FormGroup = new FormGroup({
    text: new FormControl("", Validators.required),
 });

  constructor() { }

  
  ngOnInit(): void {
  }

  onClickSubmit() {
    this.NoteArr.push(this.formdata.value.text)
    this.formdata.reset();
    console.log(this.NoteArr)
  }

  delete(i:any) {
    this.NoteArr.splice(i,1);
  }

  


}
