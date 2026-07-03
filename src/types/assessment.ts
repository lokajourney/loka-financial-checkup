import type { MaritalStatus, CreditCardManagement } from './common';

export interface L1FormData {
  name: string;
  income: string;
  expenses: string;
  savingsMonthly: string;
  monthlyDebt: string;
  debtTypes: Record<string, boolean>;
  emergencyFund: string;
  investment: string;
  habits: Record<string, boolean>;
  goals: Record<string, boolean>;
}

export interface L2FormData {
  age: string;
  occupation: string;
  maritalStatus: MaritalStatus;
  dependents: string;
  totalAssets: string;
  hasHealthInsurance: boolean;
  hasLifeInsurance: boolean;
  hasCreditCard: boolean;
  creditCardManagement: CreditCardManagement;
  bankAccounts: string;
  investmentTypes: Record<string, boolean>;
  totalOutstandingDebt: string;
  debtTypes: Record<string, boolean>;
  financialStress: number;
  financialConfidence: number;
}

export const DEFAULT_L1: L1FormData = {
  name: '',
  income: '',
  expenses: '',
  savingsMonthly: '',
  monthlyDebt: '',
  debtTypes: {},
  emergencyFund: '',
  investment: '',
  habits: {},
  goals: {},
};

export const DEFAULT_L2: L2FormData = {
  age: '',
  occupation: '',
  maritalStatus: '',
  dependents: '0',
  totalAssets: '',
  hasHealthInsurance: false,
  hasLifeInsurance: false,
  hasCreditCard: false,
  creditCardManagement: '',
  bankAccounts: '1',
  investmentTypes: {},
  totalOutstandingDebt: '',
  debtTypes: {},
  financialStress: 3,
  financialConfidence: 3,
};
