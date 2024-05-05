export interface IWalletInfo {
  id: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
  employeeId: string;
  transactions: ITransaction[];
  employee: IEmployee;
}

export interface ITransaction {
  id: string;
  amount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  userId: string | null;
  employeeId: string | null;
  from: string;
  casherWaletId: string;
}

export interface IEmployee {
  id: string;
  username: string;
  password: string;
  roles: string[];
  fullName: string;
  createdAt: string;
  updatedAt: string;
  fcmTokens: string[];
  lastLogin: string | null;
  status: string;
}

export interface ITransferSchema {
  amount: number;
}

export interface ITransferValues extends ITransferSchema {
  casherId: string;
}
