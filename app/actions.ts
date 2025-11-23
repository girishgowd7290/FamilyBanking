'use server';

import { prisma } from '@/lib/prisma';
import { Transaction, Todo } from '@/types';
import { revalidatePath } from 'next/cache';

// Transactions
export async function getTransactions() {
    const transactions = await prisma.transaction.findMany({
        orderBy: {
            date: 'desc',
        },
    });
    return transactions;
}

export async function addTransaction(data: Omit<Transaction, 'id'>) {
    const transaction = await prisma.transaction.create({
        data: {
            amount: data.amount,
            description: data.description,
            type: data.type,
            category: data.category,
            date: data.date,
        },
    });
    revalidatePath('/');
    return transaction;
}

export async function deleteTransaction(id: string) {
    await prisma.transaction.delete({
        where: { id },
    });
    revalidatePath('/');
}

// Todos
export async function getTodos() {
    const todos = await prisma.todo.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });
    return todos;
}

export async function addTodo(data: { title: string }) {
    const todo = await prisma.todo.create({
        data: {
            title: data.title,
            completed: false,
        },
    });
    revalidatePath('/');
    return todo;
}

export async function toggleTodo(id: string, completed: boolean) {
    await prisma.todo.update({
        where: { id },
        data: { completed },
    });
    revalidatePath('/');
}

export async function deleteTodo(id: string) {
    await prisma.todo.delete({
        where: { id },
    });
    revalidatePath('/');
}
