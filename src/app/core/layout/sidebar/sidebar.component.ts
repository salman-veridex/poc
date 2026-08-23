import { CommonModule } from '@angular/common';
import { Component, Input, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { NAVIGATION_CONFIG, NavItem, NavSection } from '../../config/navigation.config';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isCollapsed = false;

  authService = inject(AuthService);
  router = inject(Router);

  navSections: NavSection[] = NAVIGATION_CONFIG;
  expandedGroups = signal<Record<string, boolean>>({
    'product-studio': true,
    'quote-underwriting': true,
    'core-insurance': true,
    'claims': false,
    'finance': false,
    'documents': false,
    'marketplace': false,
    'legal': false,
    'administration': false
  });

  toggleGroup(groupId: string): void {
    this.expandedGroups.update(groups => ({
      ...groups,
      [groupId]: !groups[groupId]
    }));
  }

  isGroupExpanded(groupId: string): boolean {
    return !!this.expandedGroups()[groupId];
  }

  hasAccess(item: NavItem): boolean {
    if (!item.permissions || item.permissions.length === 0) {
      return true;
    }
    return this.authService.hasAnyPermission(item.permissions);
  }
}
