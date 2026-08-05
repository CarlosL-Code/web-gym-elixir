import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { PlansService, Plan } from '../../services/plans.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.html'
})
export class Plans implements OnInit {
  plans: Plan[] = [];
  private plansService = inject(PlansService);
  private http = inject(HttpClient);

  isModalOpen = false;
  
  // Estado para indicar qué plan se está procesando actualmente
  loadingPlan: string | null = null;

  ngOnInit() {
    this.plans = this.plansService.getPlans();
  }

  handlePlanClick(event: Event, planId: string) {
    if (planId === 'general') {
      event.preventDefault();
      this.isModalOpen = true;
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  processPayment(event: Event, title: string, price: number, loadingId: string) {
    event.preventDefault();
    
    // Evitar múltiples clics
    if (this.loadingPlan) return;
    
    this.loadingPlan = loadingId;

    this.http.post<any>('/api/create-preference', { title, price })
      .subscribe({
        next: (response) => {
          if (response && response.init_point) {
            // Redirigir al usuario al Checkout Pro de Mercado Pago
            window.location.href = response.init_point;
          } else {
            alert('Error al generar el link de pago. Intenta de nuevo.');
            this.loadingPlan = null;
          }
        },
        error: (error) => {
          console.error('Error procesando pago:', error);
          alert('Hubo un problema al procesar el pago. Verifica las credenciales de Mercado Pago.');
          this.loadingPlan = null;
        }
      });
  }
}
