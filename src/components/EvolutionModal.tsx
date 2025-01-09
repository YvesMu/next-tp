'use client';

interface Evolution {
  id: number;
  name: string;
  image: string;
}

interface EvolutionModalProps {
  evolutions: Evolution[];
  onClose: () => void;
}

export default function EvolutionModal({ evolutions, onClose }: EvolutionModalProps) {
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-auto">
      <div className="max-w-4xl mx-auto py-12 px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-6">Lignée évolutive</h2>

        {/* Section des évolutions */}
        <div className="flex justify-center gap-4">
          {evolutions.map((evolution) => (
            <div key={evolution.id} className="text-center">
              <img
                src={evolution.image}
                alt={evolution.name}
                className="w-24 h-24 object-contain cursor-pointer hover:scale-105 transition-transform"
                onClick={() => window.location.href = `/pokedex/${evolution.id}`}
              />
              <p className="mt-2 font-semibold">{evolution.name}</p>
            </div>
          ))}
        </div>

        {/* Bouton de fermeture */}
        <button
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
