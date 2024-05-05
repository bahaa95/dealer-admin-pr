import { ISas } from "@/lib/auth/types";

export interface IOrderResponse {
  id: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  mangerUsername: string;
  mangerId: string;
  employeeId: string;
  metadata: null;
  isPurchesed: boolean;
  MearchentOrderLineItems: IMearchentOrderLineItem[];
  Payment: IPayment;
  employee: IEmpolye;
}

export interface IMearchentOrderLineItem {
  id: number;
  name: string;
  quantity: number;
  profileId: number;
  price: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  mearchentOrderId: number;
}

export interface IPayment {
  id: string;
  amount: number;
  paymentMethod: string;
  provider: string;
  providerId: string;
  metadata: any;
  paymentStatus: "PENDING" | "COMPLETED" | "FAILED";
  createdAt: string;
  updatedAt: string;
  mearchentOrderId: number;
}

interface IManger {
  username: string;
}

export interface IOrdersResponse {
  data: IOrderResponse[];
  meta: IMeta;
}

export interface IMeta {
  total: number;
  lastPage: number;
  currentPage: number;
  perPage: number;
  prev: number | null;
  next: number;
}

export interface IFilter {
  dateFrom: string | null;
  dateTo: string | null;
  paymentStatus: IOrderResponse["Payment"]["paymentStatus"] | null;
  pay: string | null;
  type: ISas | null;
  search: string | null;
}

export interface IExportToExcelResponse {
  id: string;
  supportTicketId: any;
  path: string;
  mimeType: string;
  size: number;
  createdAt: string;
  updatedAt: string;
  supportTicketReplyId: any;
}

export interface IEmpolye {
  id: string;
  username: string;
  roles: ["casher"];
  fullName: string;
  createdAt: string;
  updatedAt: string;
  fcmTokens: [];
  lastLogin: string;
  status: string;
}
