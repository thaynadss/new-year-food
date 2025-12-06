"use client";

import { useState } from "react";
import { Person, PersonUpdate } from "@/lib/api";

interface PostItCardProps {
  person: Person;
  onUpdate: (updates: PersonUpdate) => void;
}

const colors = [
  "bg-yellow-200",
  "bg-pink-200",
  "bg-blue-200",
  "bg-green-200",
  "bg-purple-200",
  "bg-orange-200",
];

function getColorForName(name: string): string {
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function PostItCard({ person, onUpdate }: PostItCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [food, setFood] = useState(person.food || "");
  const [drink, setDrink] = useState(person.drink || "");
  const [dessert, setDessert] = useState(person.dessert || "");

  const handleSave = () => {
    onUpdate({
      food: food.trim() || null,
      drink: drink.trim() || null,
      dessert: dessert.trim() || null,
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFood(person.food || "");
    setDrink(person.drink || "");
    setDessert(person.dessert || "");
    setIsEditing(false);
  };

  const bgColor = getColorForName(person.name);

  return (
    <div
      className={`${bgColor} p-5 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200 relative flex flex-col`}
      style={{
        transform: `rotate(${Math.random() * 4 - 2}deg)`,
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      }}
    >
      {/* Pin effect */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-3xl drop-shadow-lg">
        📌
      </div>

      <h3 className="text-xl text-center font-bold text-gray-800 mb-4 break-words">
        {person.name}
      </h3>

      {!isEditing ? (
        <div className="flex flex-col flex-1 md:space-y-3 text-gray-700">
          <div className="flex md:flex-col items-center md:items-start gap-1">
            <strong className="text-sm uppercase tracking-wide">
              🍽️ Comida:
            </strong>
            <p className="break-words">{person.food || "-"}</p>
          </div>
          <div className="flex md:flex-col items-center md:items-start gap-1">
            <strong className="text-sm uppercase tracking-wide">
              🥤 Bebida:
            </strong>
            <p className="break-words">{person.drink || "-"}</p>
          </div>
          <div className="flex md:flex-col items-center md:items-start gap-1">
            <strong className="text-sm uppercase tracking-wide">
              🍰 Sobremesa:
            </strong>
            <p className="break-words">{person.dessert || "-"}</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-3">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🍽️ Comida:
            </label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
              placeholder="Ex: Arroz, Farofa..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🥤 Bebida:
            </label>
            <input
              type="text"
              value={drink}
              onChange={(e) => setDrink(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
              placeholder="Ex: Refrigerante, Suco..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              🍰 Sobremesa:
            </label>
            <input
              type="text"
              value={dessert}
              onChange={(e) => setDessert(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-sm"
              placeholder="Ex: Bolo, Torta..."
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition-colors text-sm"
            >
              ✓ Salvar
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded transition-colors text-sm"
            >
              ✕ Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
