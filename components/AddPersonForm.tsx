"use client";

import { useState } from "react";

interface AddPersonFormProps {
  onAdd: (data: {
    name: string;
    food?: string;
    drink?: string;
    dessert?: string;
  }) => void;
  onCancel: () => void;
}

export default function AddPersonForm({ onAdd, onCancel }: AddPersonFormProps) {
  const [name, setName] = useState("");
  const [food, setFood] = useState("");
  const [drink, setDrink] = useState("");
  const [dessert, setDessert] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd({
        name: name.trim(),
        food: food.trim() || undefined,
        drink: drink.trim() || undefined,
        dessert: dessert.trim() || undefined,
      });
      setName("");
      setFood("");
      setDrink("");
      setDessert("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Adicionar nova pessoa ou família
      </h3>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-700 mb-2 text-start text-start"
        >
          Nome:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          placeholder="Digite o nome..."
          required
          autoFocus
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="food"
          className="block text-sm font-semibold text-gray-700 mb-2 text-start"
        >
          🍽️ Comida:
        </label>
        <input
          type="text"
          id="food"
          value={food}
          onChange={(e) => setFood(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          placeholder="Ex: Arroz, Farofa..."
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="drink"
          className="block text-sm font-semibold text-gray-700 mb-2 text-start"
        >
          🥤 Bebida:
        </label>
        <input
          type="text"
          id="drink"
          value={drink}
          onChange={(e) => setDrink(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          placeholder="Ex: Refrigerante, Suco..."
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="dessert"
          className="block text-sm font-semibold text-gray-700 mb-2 text-start"
        >
          🍰 Sobremesa:
        </label>
        <input
          type="text"
          id="dessert"
          value={dessert}
          onChange={(e) => setDessert(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800"
          placeholder="Ex: Bolo, Torta..."
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
        >
          Adicionar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-colors"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
