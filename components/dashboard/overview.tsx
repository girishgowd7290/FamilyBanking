"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { EXPENSE_CATEGORIES, Transaction } from '@/types';
import { Wallet, TrendingDown, TrendingUp } from 'lucide-react';

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'];

interface OverviewProps {
    transactions: Transaction[];
}

export function Overview({ transactions }: OverviewProps) {
    // const { transactions } = useFinanceStore(); // Removed

    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((acc, t) => acc + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => acc + t.amount, 0);

    const balance = totalIncome - totalExpense;

    // Data for Expense by Category Pie Chart
    const expenseByCategory = EXPENSE_CATEGORIES.map(cat => {
        const amount = transactions
            .filter(t => t.type === 'expense' && t.category === cat)
            .reduce((acc, t) => acc + t.amount, 0);
        return { name: cat, value: amount };
    }).filter(item => item.value > 0);

    // Data for Monthly Income vs Expense Bar Chart (Simplified to just totals for now)
    const barData = [
        { name: 'Income', amount: totalIncome, fill: '#4ECDC4' },
        { name: 'Expenses', amount: totalExpense, fill: '#FF6B6B' },
    ];

    return (
        <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-gradient-to-br from-green-400 to-emerald-500 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-100">Total Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-green-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
                        <p className="text-xs text-green-100">Current available funds</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-400 to-cyan-500 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-100">Total Income</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalIncome.toFixed(2)}</div>
                        <p className="text-xs text-blue-100">Salary & Earnings</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-red-400 to-pink-500 text-white border-none shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-red-100">Total Expenses</CardTitle>
                        <TrendingDown className="h-4 w-4 text-red-100" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
                        <p className="text-xs text-red-100">Spending & Bills</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Bar Chart */}
                <Card className="col-span-1 border-2 border-slate-100 shadow-md">
                    <CardHeader>
                        <CardTitle>Income vs Expenses</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={barData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" />
                                    <YAxis tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="amount" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card className="col-span-1 border-2 border-slate-100 shadow-md">
                    <CardHeader>
                        <CardTitle>Where is the money going?</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px]">
                            {expenseByCategory.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={expenseByCategory}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {expenseByCategory.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            formatter={(value: number) => `$${value.toFixed(2)}`}
                                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="h-full flex items-center justify-center text-muted-foreground">
                                    No expenses recorded yet
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
