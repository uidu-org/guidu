import { Stripe } from '@stripe/stripe-js';
import { Contact, Service } from '@uidu/schema.d.ts';

export type BookProps = {
  bookable?: Partial<Service>;
  appointment?: Partial<Appointment>;
  embedded?: boolean;
  baseUrl: string;
  stripe?: Stripe | Promise<Stripe | null>;
  currentContact?: any;
  currentOrganization: any;
  createAppointment: (model: any) => Promise<Partial<Appointment>>;
  updateAppointment: (model: any) => Promise<Partial<Appointment>>;
  updateCurrentContact: (model: any) => Promise<Partial<Contact>>;
};
