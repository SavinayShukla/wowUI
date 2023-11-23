import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pend-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pend-order.component.html',
  styleUrl: './pend-order.component.css'
})
export class PendOrderComponent {
  @Output() dataEvent = new EventEmitter();
  sendData() {
    const dataToSend = 'Hello from child!';
    this.dataEvent.emit(dataToSend);
  }
}
