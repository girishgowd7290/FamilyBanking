"use client"

import { useFinanceStore } from '@/hooks/use-finance-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { ArrowDownRight, ArrowUpRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function RecentTransactions() {
    const { transactions, deleteTransaction } = useFinanceStore();

    const sortedTransactions = [...transactions].sort((a, b) => b.date.getTime() - a.date.getTime());

    return (
        <Card className="h-full border-2 border-slate-100 shadow-md">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {sortedTransactions.length === 0 && (
                        <p className="text-center text-muted-foreground py-8">No transactions yet.</p>
                    )}
                    {sortedTransactions.map((t) => (
                        <div
                            key={t.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {t.type === 'income' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                </div>
                                <div>
                                    <p className="font-medium text-sm">{t.description}</p>
                                    <p className="text-xs text-muted-foreground">{format(t.date, 'MMM d, yyyy')} • {t.category}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`font-bold ${t.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => deleteTransaction(t.id)}
                                    className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-600"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
