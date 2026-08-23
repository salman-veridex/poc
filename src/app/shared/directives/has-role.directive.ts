import {
  Directive,
  Input,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject
} from '@angular/core';
import { AuthService } from '../../core/auth/auth.service';

@Directive({
  selector: '[hasRole]',
  standalone: true
})
export class HasRoleDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  private requiredRole: string | string[] = '';
  private isVisible = false;

  @Input()
  set hasRole(role: string | string[]) {
    this.requiredRole = role;
    this.updateView();
  }

  constructor() {
    effect(() => {
      this.authService.userRoles();
      this.updateView();
    });
  }

  private updateView(): void {
    if (!this.requiredRole) {
      this.show();
      return;
    }

    let hasAccess = false;
    if (Array.isArray(this.requiredRole)) {
      hasAccess = this.authService.hasAnyRole(this.requiredRole);
    } else {
      hasAccess = this.authService.hasRole(this.requiredRole);
    }

    if (hasAccess && !this.isVisible) {
      this.show();
    } else if (!hasAccess && this.isVisible) {
      this.hide();
    }
  }

  private show(): void {
    this.viewContainer.createEmbeddedView(this.templateRef);
    this.isVisible = true;
  }

  private hide(): void {
    this.viewContainer.clear();
    this.isVisible = false;
  }
}
