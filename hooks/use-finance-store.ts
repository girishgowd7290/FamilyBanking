"use client"

import { useState, useEffect } from 'react';
import { Transaction, Todo } from '@/types';

export function useFinanceStore() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedTransactions = localStorage.getItem('finance_transactions');
        const storedTodos = localStorage.getItem('finance_todos');

        if (storedTransactions) {
            setTransactions(JSON.parse(storedTransactions).map((t: any) => ({
                ...t,
                date: new Date(t.date)
            })));
        }

        if (storedTodos) {
            setTodos(JSON.parse(storedTodos).map((t: any) => ({
                ...t,
                dueDate: t.dueDate ? new Date(t.dueDate) : undefined
            })));
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('finance_transactions', JSON.stringify(transactions));
        }
    }, [transactions, isLoaded]);

    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('finance_todos', JSON.stringify(todos));
        }
    }, [todos, isLoaded]);

    const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
        const newTransaction = {
            ...transaction,
            id: crypto.randomUUID(),
        };
        setTransactions(prev => [newTransaction, ...prev]);
    };

    const deleteTransaction = (id: string) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    };

    const addTodo = (todo: Omit<Todo, 'id' | 'completed'>) => {
        const newTodo = {
            ...todo,
            id: crypto.randomUUID(),
            completed: false
        };
        setTodos(prev => [newTodo, ...prev]);
    };

    const toggleTodo = (id: string) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
    };

    const deleteTodo = (id: string) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    return {
        transactions,
        todos,
        addTransaction,
        deleteTransaction,
        addTodo,
        toggleTodo,
        deleteTodo,
        isLoaded
    };
}
