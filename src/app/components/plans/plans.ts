import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansService, Plan } from '../../services/plans.service';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.html'
})
export class Plans implements OnInit {
  plans: Plan[] = [];
  boxingPlans: any[] = [];
  private plansService = inject(PlansService);

  isModalOpen = false;

  ngOnInit() {
    this.plans = this.plansService.getPlans();
    this.boxingPlans = this.plansService.getBoxingPlans();
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
}
