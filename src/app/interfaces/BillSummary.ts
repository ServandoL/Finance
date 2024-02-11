export interface BillSummary {
  name: string;
  value: number;
  category: string;
  clicked?: boolean;
}

export enum BillType {
  IMPORTANT,
  CREDIT_CARD,
  SUBSCRIPTION,
}
