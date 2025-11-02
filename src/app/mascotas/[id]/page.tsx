import Image from "next/image";
import { Pet } from "@/types";

export default function PetDetailPage({ params }: { params: { id: string } }) {
  // For now, we'll use placeholder data
  const pet: Pet = {
    id: params.id,
    name: "Buddy",
    species: "Perro",
    breed: "Golden Retriever",
    age: 2,
    size: "Grande",
    sex: "Macho",
    description: "Buddy es un perro amigable y juguetón. Le encanta correr y jugar a la pelota. Es bueno con los niños y otros perros.",
    photoUrl: "/placeholder-dog.jpg",
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={pet.photoUrl} alt={pet.name} width={600} height={600} className="rounded-lg" />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{pet.name}</h1>
          <p className="text-lg mb-4">{pet.description}</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Especie:</strong> {pet.species}</p>
              <p><strong>Raza:</strong> {pet.breed}</p>
              <p><strong>Edad:</strong> {pet.age} años</p>
            </div>
            <div>
              <p><strong>Tamaño:</strong> {pet.size}</p>
              <p><strong>Sexo:</strong> {pet.sex}</p>
            </div>
          </div>
          <button className="bg-slate-800 text-white px-6 py-3 rounded-md mt-8 w-full">¡Adoptar a {pet.name}!</button>
        </div>
      </div>
    </main>
  );
}
