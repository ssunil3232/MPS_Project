import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.scss']
})
export class DialogModalComponent implements OnChanges {

  @Input() isVisible: boolean = false;
  @Input() message: DialogMessage = {title: '', message: ''};
  @Output() onClose = new EventEmitter<any>();


  ngOnChanges(_changes: SimpleChanges): void {

  }

  onDialogClose(){
    this.isVisible = false;
    this.onClose.emit(this.isVisible);
  }

}

export type DialogMessage = {
  title: String,
  message: String
}
