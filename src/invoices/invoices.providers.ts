import { Invoice } from './entities/invoice.entity';

export const InvoicesProviders = [
  {
    provide: 'INVOICES_REPOSITORY',
    useValue: Invoice,
  },
];