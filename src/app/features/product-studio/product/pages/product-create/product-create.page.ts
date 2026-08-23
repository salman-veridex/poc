import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-create.page.html',
  styleUrl: './product-create.page.scss'
})
export class ProductCreatePage {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  currentStep = signal<number>(1);
  saving = signal<boolean>(false);

  productForm: FormGroup = this.fb.group({
    // Step 1: Basic Metadata
    code: ['PRD-COMM-2026-X1', [Validators.required, Validators.pattern(/^[A-Z0-9-]+$/)]],
    name: ['', [Validators.required, Validators.minLength(5)]],
    lineOfBusiness: ['COMMERCIAL_PROPERTY', [Validators.required]],
    effectiveDate: [new Date().toISOString().split('T')[0], [Validators.required]],
    jurisdictions: ['US-ALL', [Validators.required]],
    description: [''],

    // Step 2: Coverages & Sub-limits FormArray
    coverages: this.fb.array([
      this.createCoverageGroup('Building & Direct Physical Loss', 5000000, 10000, 25000000, 25000, true),
      this.createCoverageGroup('Business Income & Extra Expense', 1500000, 5000, 10000000, 10000, true),
      this.createCoverageGroup('Commercial Equipment Breakdown', 1000000, 2500, 5000000, 5000, false)
    ]),

    // Step 3: Dynamic Questions Configuration FormArray
    questions: this.fb.array([
      this.createQuestionGroup('q_construction', 'Building Construction Class (ISO 1-6)', 'SELECT', true, 'Fire Resistive (Class 6)'),
      this.createQuestionGroup('q_sprinklered', 'Is 100% of the total square footage protected by NFPA automatic fire sprinklers?', 'BOOLEAN', true, 'true'),
      this.createQuestionGroup('q_prior_losses', 'Total number of property / water losses in past 36 months', 'NUMBER', true, '0')
    ]),

    // Step 4: Rating Algorithm Engine
    baseRatePerThousand: [4.85, [Validators.required, Validators.min(0.01)]],
    expenseLoadFactor: [1.25, [Validators.required]],
    commissionRate: [15.0, [Validators.required, Validators.min(0), Validators.max(40)]]
  });

  get coveragesArray(): FormArray {
    return this.productForm.get('coverages') as FormArray;
  }

  get questionsArray(): FormArray {
    return this.productForm.get('questions') as FormArray;
  }

  createCoverageGroup(name = '', defLimit = 1000000, minLimit = 5000, maxLimit = 10000000, defDeductible = 10000, mandatory = true): FormGroup {
    return this.fb.group({
      name: [name, Validators.required],
      defaultLimit: [defLimit, [Validators.required, Validators.min(0)]],
      minLimit: [minLimit, Validators.required],
      maxLimit: [maxLimit, Validators.required],
      defaultDeductible: [defDeductible, Validators.required],
      isMandatory: [mandatory]
    });
  }

  createQuestionGroup(code = '', prompt = '', type = 'TEXT', required = true, defaultValue = ''): FormGroup {
    return this.fb.group({
      questionCode: [code, Validators.required],
      prompt: [prompt, Validators.required],
      type: [type, Validators.required],
      isRequired: [required],
      defaultValue: [defaultValue]
    });
  }

  addCoverage(): void {
    this.coveragesArray.push(this.createCoverageGroup());
  }

  removeCoverage(index: number): void {
    this.coveragesArray.removeAt(index);
  }

  addQuestion(): void {
    this.questionsArray.push(this.createQuestionGroup(`q_${Date.now().toString().slice(-4)}`));
  }

  removeQuestion(index: number): void {
    this.questionsArray.removeAt(index);
  }

  setStep(step: number): void {
    this.currentStep.set(step);
  }

  nextStep(): void {
    if (this.currentStep() < 4) {
      this.currentStep.update(s => s + 1);
    }
  }

  prevStep(): void {
    if (this.currentStep() > 1) {
      this.currentStep.update(s => s - 1);
    }
  }

  saveProduct(): void {
    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    const formValue = this.productForm.value;

    this.productService.createProduct({
      code: formValue.code,
      name: formValue.name,
      lineOfBusiness: formValue.lineOfBusiness,
      effectiveDate: formValue.effectiveDate,
      description: formValue.description,
      jurisdiction: [formValue.jurisdictions],
      coverages: formValue.coverages
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/product-studio/products']);
      },
      error: () => {
        this.saving.set(false);
      }
    });
  }
}
