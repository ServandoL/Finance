export interface BillSummary {
  name: string;
  value: number;
  clicked: boolean;
}

export enum BillType {
  IMPORTANT,
  CREDIT_CARD,
  SUBSCRIPTION,
}
