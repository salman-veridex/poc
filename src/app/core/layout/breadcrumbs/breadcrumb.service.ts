import { Injectable, signal } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface BreadcrumbItem {
  label: string;
  url: string;
  icon?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private readonly _breadcrumbs = signal<BreadcrumbItem[]>([]);
  readonly breadcrumbs = this._breadcrumbs.asReadonly();

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        const root = this.router.routerState.snapshot.root;
        const breadcrumbs: BreadcrumbItem[] = [];
        this.buildBreadcrumbs(root, '', breadcrumbs);
        this._breadcrumbs.set(breadcrumbs);
      });
  }

  private buildBreadcrumbs(route: ActivatedRouteSnapshot, url: string, breadcrumbs: BreadcrumbItem[]): void {
    const path = route.routeConfig?.path;
    let nextUrl = url;

    if (path) {
      nextUrl = `${url}/${path}`.replace(/\/+/g, '/');
      const breadcrumbLabel = route.data['breadcrumb'] || route.routeConfig?.title || this.formatPathLabel(path);
      
      if (breadcrumbLabel && !path.startsWith(':') && path !== '') {
        breadcrumbs.push({
          label: String(breadcrumbLabel),
          url: nextUrl
        });
      }
    }

    if (route.firstChild) {
      this.buildBreadcrumbs(route.firstChild, nextUrl, breadcrumbs);
    }
  }

  private formatPathLabel(path: string): string {
    return path
      .split('-')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }
}
