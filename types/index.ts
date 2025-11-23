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
    type: TransactionType;
    category: Category;
    description: string;
}

export interface Todo {
    id: string;
    title: string;
    amount?: number;
    dueDate?: Date;
    completed: boolean;
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
