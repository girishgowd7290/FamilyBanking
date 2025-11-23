export type TransactionType = 'income' | 'expense';

export type Category =
    | 'Salary'
    | 'Fixed Subscription'
    | 'Fuel'
    | 'Groceries'
    | 'Baby'
    | 'Savings'
    | 'Loan'
    | 'Child Savings'
    | 'Other';

export interface Transaction {
    id: string;
    date: Date;
    amount: number;
    type: string;
    category: string;
    description: string;
    createdAt?: Date;
}

export interface Todo {
    id: string;
    title: string;
    amount?: number;
    dueDate?: Date;
    completed: boolean;
    createdAt?: Date;
}

export const CATEGORIES: Category[] = [
    'Salary',
    'Fixed Subscription',
    'Fuel',
    'Groceries',
    'Baby',
    'Savings',
    'Loan',
    'Child Savings',
    'Other'
];

export const EXPENSE_CATEGORIES = CATEGORIES.filter(c => c !== 'Salary');
