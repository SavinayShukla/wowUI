import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resultcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resultcard.component.html',
  styleUrl: './resultcard.component.css'
})
export class ResultcardComponent {
  @Output() buttonClick = new EventEmitter();
  onButtonClick() {
    this.buttonClick.emit("Something");
  }
}
