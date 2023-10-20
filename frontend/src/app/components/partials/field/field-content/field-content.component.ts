import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-field-content',
  templateUrl: './field-content.component.html',
  styleUrls: ['./field-content.component.scss'],
})
export class FieldContentComponent {
  @Input() label!: string;
}
