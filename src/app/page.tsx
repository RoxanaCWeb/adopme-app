import { PetCard } from "@/components/PetCard";
import { FilterControls } from "@/components/FilterControls";
import { Pet } from "@/types";

const samplePets: Pet[] = [
  {
    id: "1",
    name: "Buddy",
    species: "Perro",
    photoUrl: "/placeholder-dog.jpg",
  },
  {
    id: "2",
    name: "Lucy",
    species: "Gato",
    photoUrl: "/placeholder-cat.jpg",
  },
  {
    id: "3",
    name: "Rocky",
    species: "Perro",
    photoUrl: "/placeholder-dog.jpg",
  },
  {
    id: "4",
    name: "Misty",
    species: "Gato",
    photoUrl: "/placeholder-cat.jpg",
  },
];

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Encuentra a tu nuevo mejor amigo</h1>
      <FilterControls />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {samplePets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </div>
    </main>
  );
}
