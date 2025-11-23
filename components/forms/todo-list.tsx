"use client"

import { useState } from 'react';
import { useFinanceStore } from '@/hooks/use-finance-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ListTodo, Plus } from 'lucide-react';

export function TodoList() {
    const { todos, addTodo, toggleTodo, deleteTodo } = useFinanceStore();
    const [newTodo, setNewTodo] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        addTodo({
            title: newTodo,
        });
        setNewTodo('');
    };

    return (
        <Card className="w-full bg-white/50 backdrop-blur-sm border-2 border-pink-100 shadow-xl">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-pink-900 flex items-center gap-2">
                    <ListTodo className="h-6 w-6 text-pink-600" />
                    Future Expenses & Todos
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleAdd} className="flex gap-2 mb-4">
                    <Input
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="Add a new task..."
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" className="bg-pink-600 hover:bg-pink-700">
                        <Plus className="h-4 w-4" />
                    </Button>
                </form>

                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                    {todos.length === 0 && (
                        <p className="text-center text-muted-foreground py-4">No tasks yet!</p>
                    )}
                    {todos.map((todo) => (
                        <div
                            key={todo.id}
                            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors group"
                        >
                            <Checkbox
                                checked={todo.completed}
                                onCheckedChange={() => toggleTodo(todo.id)}
                            />
                            <span className={`flex-1 ${todo.completed ? 'line-through text-muted-foreground' : ''}`}>
                                {todo.title}
                            </span>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteTodo(todo.id)}
                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
