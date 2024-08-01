import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Protected Component</h1>
    <p>This is a protected route that requires authentication.</p>
  `,
  styles: [`
    h1 {
      color: green;
    }
  `]
})
export class ProtectedComponent {

}
