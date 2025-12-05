export interface Person {
  id: string;
  name: string;
  food: string | null;
  drink: string | null;
  dessert: string | null;
  created_at: string;
  updated_at: string;
}

export type PersonUpdate = Partial<
  Omit<Person, "id" | "name" | "created_at" | "updated_at">
>;
export type PersonCreate = {
  name: string;
  food?: string | null;
  drink?: string | null;
  dessert?: string | null;
};

const API_BASE = "/api/people";

export async function fetchPeople(): Promise<Person[]> {
  const response = await fetch(API_BASE);
  if (!response.ok) {
    throw new Error("Failed to fetch people");
  }
  return response.json();
}

export async function createPerson(data: PersonCreate): Promise<Person> {
  const response = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to create person");
  }

  return response.json();
}

export async function updatePerson(
  id: string,
  updates: PersonUpdate
): Promise<Person> {
  const response = await fetch(`${API_BASE}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    throw new Error("Failed to update person");
  }

  return response.json();
}
