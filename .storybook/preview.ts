import 'zone.js';
import { provideZoneChangeDetection, provideAppInitializer, inject } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG, PrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import type { Preview } from '@storybook/angular-vite';
import { applicationConfig } from '@storybook/angular-vite';
import '../src/styles.scss';

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideAnimationsAsync(),
        providePrimeNG({
          theme: {
            preset: (Aura as any)?.default || Aura,
            options: {
              darkModeSelector: 'system'
            }
          }
        }),
        provideAppInitializer(() => {
          const config = inject(PrimeNG);
          if ((config as any)._setVerified) {
            (config as any)._setVerified(true);
          }
        })
      ]
    })
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f8fafc' },
        { name: 'white', value: '#ffffff' },
        { name: 'dark', value: '#0f172a' }
      ]
    }
  }
};

export default preview;
