import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlansService, Plan } from '../../services/plans.service';
import { GradientTextComponent } from '../ui/gradient-text/gradient-text';

@Component({
  selector: 'app-plans',
  standalone: true,
  imports: [CommonModule, GradientTextComponent],
  templateUrl: './plans.html'
})
export class Plans implements OnInit {
  plans: Plan[] = [];
  private plansService = inject(PlansService);

  isModalOpen = false;

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
}
