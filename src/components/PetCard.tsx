import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Pet } from "@/types";
import Link from "next/link";

interface PetCardProps {
  pet: Pet;
}

export function PetCard({ pet }: PetCardProps) {
  return (
    <Link href={`/mascotas/${pet.id}`}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader>
          <CardTitle>{pet.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-48 w-full">
            <Image src={pet.photoUrl} alt={pet.name} layout="fill" objectFit="cover" className="rounded-md" />
          </div>
          <p className="text-sm text-slate-600 mt-2">{pet.species}</p>
        </CardContent>
        <CardFooter>
          <button className="bg-slate-800 text-white px-4 py-2 rounded-md w-full">Adoptar</button>
        </CardFooter>
      </Card>
    </Link>
  );
}
