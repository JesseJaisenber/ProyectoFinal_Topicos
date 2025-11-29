export interface Subscription {
  id: string;
  name: string;
  price: number;
  currency: "USD" | "HNL";
  frequency: "monthly" | "annual";
  nextPaymentDate: string;
  createdAt?: string;
}


