import { Overview } from '@/components/dashboard/overview';
import { TransactionForm } from '@/components/forms/transaction-form';
import { TodoList } from '@/components/forms/todo-list';
import { RecentTransactions } from '@/components/dashboard/recent-transactions';
import { PiggyBank } from 'lucide-react';
import { getTransactions, getTodos } from '@/app/actions';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const transactions = await getTransactions();
  const todos = await getTodos();

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <PiggyBank className="h-8 w-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Family Bank</h1>
            <p className="text-slate-500">Track your savings, expenses, and future goals!</p>
          </div>
        </div>

        {/* Top Section: Overview Charts */}
        <Overview transactions={transactions} />

        {/* Bottom Section: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Actions */}
          <div className="space-y-8 lg:col-span-1">
            <TransactionForm />
            <TodoList initialTodos={todos} />
          </div>

          {/* Right Column: History */}
          <div className="lg:col-span-2">
            <RecentTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </main>
  );
}
