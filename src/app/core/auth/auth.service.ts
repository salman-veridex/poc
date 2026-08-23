import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { APIMethod, ApiService, AuthEndpoint } from '../api';
import { AuthState, AuthTokens, LoginCredentials, UserPermission, UserProfile, UserRole } from './auth.models';

const MOCK_CURRENT_USER: UserProfile = {
  id: 'usr_vx_88921',
  email: 'alexander.vance@veridex.insurance',
  firstName: 'Alexander',
  lastName: 'Vance',
  displayName: 'Alexander Vance',
  tenantId: 'tnt_us_east_primary',
  tenantName: 'Veridex Global Underwriters',
  department: 'Enterprise Underwriting & Policy Operations',
  roles: ['SUPER_ADMIN', 'SENIOR_UNDERWRITER', 'PRODUCT_MANAGER'],
  permissions: [
    'PRODUCT_VIEW',
    'PRODUCT_CREATE',
    'PRODUCT_EDIT',
    'PRODUCT_PUBLISH',
    'QUOTE_VIEW',
    'QUOTE_CREATE',
    'QUOTE_UNDERWRITE',
    'QUOTE_BIND',
    'POLICY_VIEW',
    'POLICY_CREATE',
    'POLICY_ENDORSE',
    'POLICY_CANCEL',
    'POLICY_RENEW',
    'CLAIMS_VIEW',
    'CLAIMS_CREATE',
    'CLAIMS_ADJUDICATE',
    'CLAIMS_PAY',
    'FINANCE_VIEW',
    'FINANCE_BILLING',
    'FINANCE_PAYMENTS',
    'FINANCE_RECONCILE',
    'DOCUMENTS_VIEW',
    'DOCUMENTS_UPLOAD',
    'DOCUMENTS_GENERATE',
    'MARKETPLACE_VIEW',
    'MARKETPLACE_MANAGE',
    'LEGAL_VIEW',
    'LEGAL_MANAGE',
    'ADMIN_USERS',
    'ADMIN_ROLES',
    'ADMIN_AUDIT',
    'ADMIN_CONFIG'
  ],
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&q=80'
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly AUTH_STORAGE_KEY = 'veridex_auth_session';

  private readonly _state = signal<AuthState>({
    isAuthenticated: true,
    user: MOCK_CURRENT_USER,
    tokens: {
      accessToken: 'jwt_mock_veridex_access_token_sec_key',
      refreshToken: 'jwt_mock_veridex_refresh_token_sec_key',
      expiresIn: 3600
    },
    loading: false
  });

  // Public readonly signals
  readonly state = this._state.asReadonly();
  readonly user = computed(() => this._state().user);
  readonly isAuthenticated = computed(() => this._state().isAuthenticated);
  readonly userRoles = computed(() => this._state().user?.roles ?? []);
  readonly userPermissions = computed(() => this._state().user?.permissions ?? []);

  constructor() {
    this.initSession();
  }

  private initSession(): void {
    const saved = localStorage.getItem(this.AUTH_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AuthState;
        this._state.set(parsed);
      } catch {
        this.saveSession();
      }
    } else {
      this.saveSession();
    }
  }

  private saveSession(): void {
    localStorage.setItem(this.AUTH_STORAGE_KEY, JSON.stringify(this._state()));
  }

  login(credentials: LoginCredentials): Observable<{ user: UserProfile; tokens: AuthTokens }> {
    this._state.update(s => ({ ...s, loading: true }));

    if (!credentials.email || !credentials.password) {
      this._state.update(s => ({ ...s, loading: false }));
      return throwError(() => new Error('Invalid email or password'));
    }

    const fallbackResponse = {
      user: {
        ...MOCK_CURRENT_USER,
        email: credentials.email,
        displayName: credentials.email.split('@')[0].replace('.', ' ').toUpperCase()
      },
      tokens: {
        accessToken: `jwt_access_${Date.now()}`,
        refreshToken: `jwt_refresh_${Date.now()}`,
        expiresIn: 3600
      }
    };

    return this.api.httpRequest<{ user: UserProfile; tokens: AuthTokens }>(
      AuthEndpoint.LOGIN,
      APIMethod.POST,
      {
        body: credentials
      }
    ).pipe(
      catchError(() => of(fallbackResponse).pipe(delay(400))),
      tap(res => {
        this._state.set({
          isAuthenticated: true,
          user: res.user,
          tokens: res.tokens,
          loading: false
        });
        this.saveSession();
      })
    );
  }

  logout(): void {
    this.api.httpRequest<void>(AuthEndpoint.LOGOUT, APIMethod.POST).pipe(
      catchError(() => of(undefined))
    ).subscribe();

    this._state.set({
      isAuthenticated: false,
      user: null,
      tokens: null,
      loading: false
    });
    localStorage.removeItem(this.AUTH_STORAGE_KEY);
    this.router.navigate(['/auth/login']);
  }

  hasPermission(permission: UserPermission | string): boolean {
    const permissions = this.userPermissions();
    return permissions.includes(permission as UserPermission);
  }

  hasAnyPermission(permissions: (UserPermission | string)[]): boolean {
    if (!permissions || permissions.length === 0) return true;
    return permissions.some(p => this.hasPermission(p));
  }

  hasAllPermissions(permissions: (UserPermission | string)[]): boolean {
    if (!permissions || permissions.length === 0) return true;
    return permissions.every(p => this.hasPermission(p));
  }

  hasRole(role: UserRole | string): boolean {
    const roles = this.userRoles();
    return roles.includes(role as UserRole);
  }

  hasAnyRole(roles: (UserRole | string)[]): boolean {
    if (!roles || roles.length === 0) return true;
    return roles.some(r => this.hasRole(r));
  }

  getAccessToken(): string | null {
    return this._state().tokens?.accessToken ?? null;
  }
}
