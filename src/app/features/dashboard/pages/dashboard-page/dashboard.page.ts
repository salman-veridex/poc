import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyFormatPipe } from '../../../../shared/pipes/currency-format.pipe';
import { StatusBadgeComponent } from '../../../../shared/components/status-badge/status-badge.component';
import { DashboardMetric, PipelineItem, RecentTransaction, UnderwritingTask } from '../../models/dashboard.models';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyFormatPipe, StatusBadgeComponent],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss'
})
export class DashboardPage implements OnInit {
  private dashboardService = inject(DashboardService);

  loading = signal(true);
  metrics = signal<DashboardMetric[]>([]);
  pipeline = signal<PipelineItem[]>([]);
  tasks = signal<UnderwritingTask[]>([]);
  transactions = signal<RecentTransaction[]>([]);

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.loading.set(true);

    this.dashboardService.getMetrics().subscribe(m => this.metrics.set(m));
    this.dashboardService.getUnderwritingPipeline().subscribe(p => this.pipeline.set(p));
    this.dashboardService.getRecentTasks().subscribe(t => this.tasks.set(t));
    this.dashboardService.getRecentTransactions().subscribe(tx => {
      this.transactions.set(tx);
      this.loading.set(false);
    });
  }
}
