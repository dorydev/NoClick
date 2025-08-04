import { useState } from "react";
import { LayoutDashboard } from "lucide-react";

export default function App() {
  const [selectedCard, setSelectedCard,] = useState(null);

  const [selectedColor, setSelectedColor] = useState("#3b82f6"); // bleu par défaut

  const menuItems = ["Dashboard"];

  const cards = [
    { title: "Add task", description: "Add new task to personnal space" },
  ];
  const colors = [
    "#3b82f6", // bleu
    "#f87171", // rouge
    "#34d399", // vert
    "#fbbf24", // jaune
    "#a78bfa", // violet
    "#f472b6", // rose
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-gray-200 p-6 flex flex-col">
        <h1 className="text-2xl font-extrabold mb-8">NoClick</h1>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item}
              className="flex items-center gap-3 w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 font-medium"
            >
              <LayoutDashboard size={18} /> {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Zone principale */}
      <main className="flex-1 flex">
        {/* Colonne gauche */}
        <div className={`transition-all duration-500 ${selectedCard ? "w-3/5" : "w-full"} p-8 overflow-y-auto`}>
          {!selectedCard && (
            <>
              <h2 className="text-2xl font-semibold mb-8">Dashboard</h2>
              <div className="grid grid-cols-3 gap-6">
                {cards.map((card) => (
                  <div
                    key={card.title}
                    onClick={() => setSelectedCard(card)}
                    className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition cursor-pointer hover:scale-[1.02]"
                  >
                    <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                    <p className="text-gray-600 text-sm">{card.description}</p>
                  </div>
                ))}
              </div>
            </>
          )}
          {selectedCard && (
            <div className="text-gray-500 h-full flex items-center justify-center">
              <p>Sélectionné: <span className="font-semibold">{selectedCard.title}</span></p>
            </div>
          )}
        </div>


        {/* Colonne droite (formulaire) */}
        {selectedCard && (
          <div className="w-2/5 bg-white border-l border-gray-200 p-8 overflow-y-auto transition-all duration-500">
            <h2 className="text-xl font-bold mb-6">{selectedCard.title}</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nom de l’espace</label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Ex : Finish all my projects..."
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Priorité</label>
                <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none">
                  <option>Hight</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Describe task"
                  rows={4}
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Couleur</label>
                <div className="flex gap-4 flex-wrap">
                  {colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full transition-transform 
                        ${selectedColor === color ? "scale-110 ring-4 ring-offset-2 ring-opacity-50" : "hover:scale-105"}
                      `}
                      style={{
                        backgroundColor: color,
                        boxShadow:
                          selectedColor === color
                            ? `0 0 10px 2px ${color}80` // glow color avec opacité
                            : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedCard(null)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-100"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
          

        )}
      </main>
    </div>
  );
}
