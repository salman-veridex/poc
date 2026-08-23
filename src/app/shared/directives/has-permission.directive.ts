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
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective {
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef<unknown>);
  private viewContainer = inject(ViewContainerRef);

  private requiredPermission: string | string[] = '';
  private isVisible = false;

  @Input()
  set hasPermission(permission: string | string[]) {
    this.requiredPermission = permission;
    this.updateView();
  }

  constructor() {
    effect(() => {
      // Re-evaluate whenever user permissions signal changes
      this.authService.userPermissions();
      this.updateView();
    });
  }

  private updateView(): void {
    if (!this.requiredPermission) {
      this.show();
      return;
    }

    let hasAccess = false;
    if (Array.isArray(this.requiredPermission)) {
      hasAccess = this.authService.hasAnyPermission(this.requiredPermission);
    } else {
      hasAccess = this.authService.hasPermission(this.requiredPermission);
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
