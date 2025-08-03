import React, { useState } from "react";
import { BecaCard } from "./expandable-card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Info, Search, Filter } from "lucide-react";

function ListBecas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest"); // newest, oldest

  // Dados das becas com timestamps para ordenação
  const becas = [
    {
      id: 1,
      nombre_beca: "Beca Embassador",
      institucion: "Universidad Stellar",
      valor_total: "50,000 XLM",
      cantidad_hito: 3,
      total_hitos: 5,
      status: 60,
      contract_address: "CDLZFC3SYJYDZT7K67VZ75HPJVIEUVNIXF47ZG2FB2RMQQAHHAGK6ZZXG",
      created_at: new Date('2024-01-15').getTime()
    },
    {
      id: 2,
      nombre_beca: "Beca Chile",
      institucion: "Stellar Foundation",
      valor_total: "75,000 XLM",
      cantidad_hito: 2,
      total_hitos: 4,
      status: 45,
      contract_address: "CBQHNAXSI55GX2GN6D67GK7BHKQXDGNYCDLZFC3SYJYDZT7K67VZ75HP",
      created_at: new Date('2024-01-20').getTime()
    },
    {
      id: 3,
      nombre_beca: "FONDECYT",
      institucion: "Pontificia Universidad Católica de Chile",
      valor_total: "30,000 XLM",
      cantidad_hito: 4,
      total_hitos: 4,
      status: 100,
      contract_address: "GCKFBEIYTKDEXNLHGXGCIOSTFOXIFVDEUWENZMQHPOIXLRYGENFLFKGX",
      created_at: new Date('2024-01-10').getTime()
    }
  ];

  // Filtrar e ordenar becas
  const filteredAndSortedBecas = becas
    .filter(beca => 
      beca.nombre_beca.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beca.institucion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beca.contract_address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "newest") {
        return b.created_at - a.created_at; // Mais recente primeiro
      } else {
        return a.created_at - b.created_at; // Mais antigo primeiro
      }
    });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Cabeçalho simplificado - estilo transactions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-stellar-black-900">Becas Activas</h2>
          <p className="text-sm text-stellar-black-600">Gestione todas las becas disponibles en el ecosistema Stellar</p>
        </div>
        <Button className="bg-black hover:bg-gray-900 text-white font-medium py-3 rounded-full shadow-lg transition-all duration-200 whitespace-nowrap flex items-center">
          <span className="flex-1">Crear Nueva Beca</span>
          <div className="bg-yellow-400 rounded-full p-1.5 ml-4">
            <PlusCircle className="h-4 w-4 text-black" />
          </div>
        </Button>
      </div>

      {/* Filtros e Busca - Mesmo estilo do componente de transações */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Barra de busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stellar-black-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, institución o dirección..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300"
            />
          </div>

          {/* Filtro de ordenação */}
          <div className="flex items-center space-x-4">
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-48">
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>
                      {sortOrder === "newest" ? "Más Recientes" : "Más Antiguos"}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más Recientes</SelectItem>
                <SelectItem value="oldest">Más Antiguos</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Contador de resultados */}
        {searchTerm && (
          <div className="mt-4 text-sm text-stellar-black-600">
            {filteredAndSortedBecas.length} beca{filteredAndSortedBecas.length !== 1 ? 's' : ''} encontrada{filteredAndSortedBecas.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
          
      {/* Grid de cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedBecas.length > 0 ? (
          filteredAndSortedBecas.map((beca) => (
            <BecaCard
              key={beca.id}
              nombre_beca={beca.nombre_beca}
              institucion={beca.institucion}
              valor_total={beca.valor_total}
              cantidad_hito={beca.cantidad_hito}
              total_hitos={beca.total_hitos}
              status={beca.status}
              contract_address={beca.contract_address}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-stellar-black-400 text-lg mb-2">No se encontraron becas</div>
            <div className="text-stellar-black-300 text-sm">
              {searchTerm ? `No hay becas que coincidan con \"${searchTerm}\"` : 'No hay becas disponibles'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListBecas;