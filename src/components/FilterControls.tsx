"use client";

import { useState } from "react";

export function FilterControls() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? null : filter);
  };

  const getButtonClasses = (filter: string) => {
    return `px-4 py-2 rounded-md ${activeFilter === filter ? "bg-slate-800 text-white" : "bg-slate-200 text-slate-800"}`;
  };

  return (
    <div className="flex justify-center space-x-4 mb-8">
      <button className={getButtonClasses("perros")} onClick={() => handleFilterClick("perros")}>Perros</button>
      <button className={getButtonClasses("gatos")} onClick={() => handleFilterClick("gatos")}>Gatos</button>
      <button className={getButtonClasses("pequeno")} onClick={() => handleFilterClick("pequeno")}>Pequeño</button>
      <button className={getButtonClasses("mediano")} onClick={() => handleFilterClick("mediano")}>Mediano</button>
      <button className={getButtonClasses("grande")} onClick={() => handleFilterClick("grande")}>Grande</button>
    </div>
  );
}
