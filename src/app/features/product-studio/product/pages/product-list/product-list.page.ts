import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ColDef, ICellRendererParams } from 'ag-grid-community';
import { HasPermissionDirective } from '../../../../../shared/directives/has-permission.directive';
import { DataGridComponent } from '../../../../../shared/components/data-grid/data-grid.component';
import { AppDatepickerComponent } from '../../../../../shared/components/app-datepicker/app-datepicker.component';
import { DrawerComponent } from '@shared/components/drawer/drawer.component';
import { InsuranceProduct } from '../../models/product.models';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    DataGridComponent,
    HasPermissionDirective,
    DrawerComponent,
    AppDatepickerComponent
  ],
  templateUrl: './product-list.page.html',
  styleUrl: './product-list.page.scss'
})
export class ProductListPage implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  products = signal<InsuranceProduct[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);

  // Modern scheduling/expiry form with Date + Time support
  scheduleForm = this.fb.group({
    expiryDate: ['2026-12-31T23:59:00.000Z']
  });

  isDrawerOpen = false;
  issalmanDrawerOpen = false;

  columnDefs: ColDef<InsuranceProduct>[] = [
    {
      field: 'code',
      headerName: 'Product Code',
      width: 140,
      cellStyle: { fontFamily: 'var(--vx-font-mono)', fontWeight: '700', color: 'var(--vx-brand-primary)' }
    },
    {
      field: 'name',
      headerName: 'Product Name',
      minWidth: 260,
      flex: 2,
      cellStyle: { fontWeight: '600' }
    },
    {
      field: 'lineOfBusiness',
      headerName: 'Line of Business',
      minWidth: 180,
      valueFormatter: (params) => (params.value || '').replace(/_/g, ' ')
    },
    {
      field: 'version',
      headerName: 'Version',
      width: 100,
      cellStyle: { fontFamily: 'var(--vx-font-mono)', color: 'var(--vx-text-muted)' }
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      cellRenderer: (params: ICellRendererParams) => {
        const val = params.value || 'DRAFT';
        const colorClass = val === 'ACTIVE' ? 'badge-active' : (val === 'TESTING' ? 'badge-referred' : 'badge-draft');
        return `<span class="vx-status-badge ${colorClass}"><span class="badge-dot"></span>${val}</span>`;
      }
    },
    {
      field: 'activePoliciesCount',
      headerName: 'In-Force Policies',
      width: 150,
      type: 'numericColumn',
      valueFormatter: (params) => (params.value ? Number(params.value).toLocaleString() : '0')
    },
    {
      field: 'annualGWP',
      headerName: 'Annual GWP',
      width: 160,
      type: 'numericColumn',
      valueFormatter: (params) => (params.value ? `$${(params.value / 1000000).toFixed(2)}M` : '$0.00')
    },
    {
      field: 'updatedAt',
      headerName: 'Last Updated',
      width: 130
    }
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading.set(true);
    this.error.set(null);

    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err.message || 'Failed to load insurance product catalog');
        this.loading.set(false);
      }
    });
  }

  onRowDoubleClicked(product: InsuranceProduct): void {
    this.router.navigate(['/product-studio/products', product.id]);
  }

  openDrawer(): void {
    this.isDrawerOpen = true;
  }

  opensalmanDrawer(): void {
    this.issalmanDrawerOpen = true;
  }

  closeDrawer(): void {
    this.isDrawerOpen = false;
    this.issalmanDrawerOpen = false;
  }
}
