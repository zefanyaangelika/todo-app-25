'use client';

import React, { useState } from 'react';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';

type TodoFormProps = {
  onAddTodo: (title: string) => void;
};

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validasi Sederhana: jangan izinkan input kosong atau hanya spasi
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    // Kirim data ke komponen induk
    onAddTodo(trimmedTitle);

    // Reset input setelah berhasil menambahkan
    setTitle('');
  };

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tambahkan tugas baru..."
          className="flex-1 bg-white"
          variantSize="md"
        />

        <Button
          type="submit"
          disabled={!title.trim()}
          variant="default"
        >
          Tambah
        </Button>
      </form>
    </div>
  );
}