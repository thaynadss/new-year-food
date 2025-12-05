"use client";

import { useEffect, useState } from "react";
import {
  Person,
  PersonUpdate,
  fetchPeople,
  createPerson,
  updatePerson,
} from "@/lib/api";
import PostItCard from "@/components/PostItCard";
import AddPersonForm from "@/components/AddPersonForm";
import Toast from "@/components/Toast";

export default function Home() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    loadPeople();
  }, []);

  async function loadPeople() {
    try {
      const data = await fetchPeople();
      setPeople(data);
    } catch (error) {
      console.error("Error fetching people:", error);
      alert("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdatePerson(id: string, updates: PersonUpdate) {
    try {
      const updatedPerson = await updatePerson(id, updates);
      setPeople(people.map((p) => (p.id === id ? updatedPerson : p)));
      setToast({ message: "Atualizado com sucesso! ✅", type: "success" });
    } catch (error) {
      console.error("Error updating person:", error);
      setToast({
        message: "Erro ao atualizar. Tente novamente.",
        type: "error",
      });
    }
  }

  async function handleAddPerson(data: {
    name: string;
    food?: string;
    drink?: string;
    dessert?: string;
  }) {
    try {
      const newPerson = await createPerson(data);
      setPeople(
        [...people, newPerson].sort((a, b) => a.name.localeCompare(b.name))
      );
      setShowAddForm(false);
      setToast({
        message: "Adicionado com sucesso! 🎉",
        type: "success",
      });
    } catch (error: any) {
      console.error("Error adding person:", error);
      if (error.message.includes("already exists")) {
        setToast({ message: "Este nome já existe na lista!", type: "error" });
      } else {
        setToast({
          message: "Erro ao adicionar pessoa. Tente novamente.",
          type: "error",
        });
      }
    }
  }

  const filteredPeople = people.filter((person) =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Carregando...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen pt-8 pb-8 px-4 sm:px-6 lg:px-8 relative z-10 lg:pt-16">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4">
            Organização Virada de Ano 2026 🎇
          </h1>
          <p className="text-amber-600 text-md sm:text-xl font-medium mb-2">
            ✨ Vamos celebrar mais um ano que o Senhor nos concedeu com muita
            alegria! ✨
          </p>
          <p className="text-gray-600 text-base sm:text-lg mb-6">
            Se você puder levar uma comida, bebida ou sobremesa, por favor,
            adicione seu nome à lista abaixo
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-lg shadow-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              + Adicionar pessoa ou família
            </button>
          </div>

          {showAddForm && (
            <div className="mt-6 max-w-md mx-auto">
              <AddPersonForm
                onAdd={handleAddPerson}
                onCancel={() => setShowAddForm(false)}
              />
            </div>
          )}
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPeople.map((person) => (
            <PostItCard
              key={person.id}
              person={person}
              onUpdate={(updates) => handleUpdatePerson(person.id, updates)}
            />
          ))}
        </div>

        {filteredPeople.length === 0 && (
          <div className="text-center text-white text-xl mt-12">
            {searchTerm
              ? "Nenhuma pessoa encontrada com esse nome."
              : "Nenhuma pessoa cadastrada ainda."}
          </div>
        )}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </main>
  );
}
