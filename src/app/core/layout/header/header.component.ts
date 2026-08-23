import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  authService = inject(AuthService);
  router = inject(Router);

  currentUser = this.authService.user;
  environmentName = environment.environmentName.toUpperCase();
  isProduction = environment.production;

  userMenuOpen = signal(false);
  tenantMenuOpen = signal(false);
  quickActionsOpen = signal(false);

  tenants = [
    { id: 'tnt_us_east_primary', name: 'Veridex Global Underwriters', region: 'North America (US-East)' },
    { id: 'tnt_uk_london_market', name: 'Veridex Lloyd\'s Syndicate 1948', region: 'Europe (London)' },
    { id: 'tnt_apac_singapore', name: 'Veridex APAC Reinsurance Hub', region: 'Asia-Pacific (Singapore)' }
  ];

  selectedTenant = signal(this.tenants[0]);

  toggleUserMenu(): void {
    this.userMenuOpen.update(v => !v);
    this.tenantMenuOpen.set(false);
    this.quickActionsOpen.set(false);
  }

  toggleTenantMenu(): void {
    this.tenantMenuOpen.update(v => !v);
    this.userMenuOpen.set(false);
    this.quickActionsOpen.set(false);
  }

  toggleQuickActions(): void {
    this.quickActionsOpen.update(v => !v);
    this.userMenuOpen.set(false);
    this.tenantMenuOpen.set(false);
  }

  switchTenant(tenant: typeof this.tenants[0]): void {
    this.selectedTenant.set(tenant);
    this.tenantMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }
}
