import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'registration-helper',
  templateUrl: './registration-helper.component.html',
  styleUrls: ['./registration-helper.component.scss']
})
export class RegistrationHelperComponent {
  @Input() sidebarVisible: boolean = false;
  @Output() onClose = new EventEmitter<any>();

  constructor(){}

  ngOnChanges(_changes: SimpleChanges): void {
  }

  onDialogClose(){
    this.sidebarVisible = false;
    this.onClose.emit(this.sidebarVisible);
  }

  openEmailDraft() {
    const email = 'univreg@cornell.edu';
    const subject = 'Course Registration Help';
    const body = '';
    const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  }

}

