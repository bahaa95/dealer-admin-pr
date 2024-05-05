import { IMeta } from "../orders/_types";

export interface ICasher {
  id: string;
  username: string;
  roles: "casher";
  fullName: string;
  createdAt: string;
  updatedAt: string;
  fcmTokens: string[];
  oddoAccount: object | null;
  totalAmount: number;
  orderCount: number;
  casherWalet: { balance: number };
}

export interface ICasherFilter {
  page: number;
  limit: number;
  search: string;
}

export interface ICasherResponse {
  data: ICasher[];
  meta: IMeta;
}
