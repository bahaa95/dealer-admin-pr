export interface ITransaction {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  employeeId: string;
  mangerUserName: string;
  employeeUsername: string;
  orderId: number;
  purchasedCards: number;
  from: string;
  casherWaletId: string;
  fromUserName: string;
  toUserName: string;
}
