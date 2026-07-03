export type AppScreen =
  | 'landing'
  | 'l1-assessment'
  | 'l1-loading'
  | 'quick-result'
  | 'l2-assessment'
  | 'l2-loading'
  | 'full-result';

export type JourneyStage = 'Starter' | 'Builder' | 'Organizer' | 'Wealth Builder';
export type ProductId = 'premium' | 'ultimate' | 'advanced';
export type MaritalStatus = 'single' | 'married' | 'divorced' | '';
export type CreditCardManagement = 'full' | 'minimum' | 'sometimes' | '';
