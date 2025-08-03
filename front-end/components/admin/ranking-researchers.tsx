'use client';

import React, { useState, useEffect } from 'react';
import { Search, Trophy, Medal, Award, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import StellarAvatar from '@/components/ui/stellar-avatar';

interface Researcher {
  id: string;
  address: string;
  completedMilestones: number;
  position: number;
  activeGrants: number;
  score: number;
}

const mockResearchers: Researcher[] = [
  {
    id: '1',
    address: 'GCKFBEIYTKQTIQ6VF7EYHBN2QFVBRQOCGPKEQJSZQMPOGHQY4RJLVUFG',
    completedMilestones: 15,
    score: 950,
    position: 1,
    activeGrants: 3
  },
];

const RankingResearchers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'pontuacao' | 'milestones' | 'becas'>('pontuacao');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredResearchers = mockResearchers
    .filter(researcher =>
      researcher.address.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'milestones':
          return b.completedMilestones - a.completedMilestones;
        case 'becas':
          return b.activeGrants - a.activeGrants;
        default:
          return b.score - a.score;
      }
    });

  const totalPages = Math.ceil(filteredResearchers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResearchers = filteredResearchers.slice(startIndex, endIndex);

  const getRankIcon = (posicao: number) => {
    switch (posicao) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-stellar-black-600 font-bold">#{posicao}</span>;
    }
  };

  const getRankBadgeColor = (posicao: number) => {
    switch (posicao) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-400 to-amber-600 text-white';
      default:
        return 'bg-stellar-black-100 text-stellar-black-700';
    }
  };

  const simplifyAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset para primeira página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortBy]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-stellar-black-900">Ranking de Pesquisadores</h2>
          <p className="text-sm text-stellar-black-600">Classificação baseada em milestones completados</p>
        </div>
      </div>

      {/* Filtros e Busca - Mesmo estilo do componente de becas */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Barra de busca */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stellar-black-400" />
            <input
              type="text"
              placeholder="Buscar por endereço..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300"
            />
          </div>

          {/* Filtro de ordenação */}
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'pontuacao' | 'milestones' | 'becas')}
              className="w-48 px-4 py-2 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300 bg-white"
            >
              <option value="pontuacao">Ordenar por Puntuación</option>
              <option value="milestones">Ordenar por Milestones</option>
              <option value="becas">Ordenar por Becas Activas</option>
            </select>
          </div>
        </div>

        {/* Contador de resultados */}
        {searchTerm && (
          <div className="mt-4 text-sm text-stellar-black-600">
            {filteredResearchers.length} pesquisador{filteredResearchers.length !== 1 ? 'es' : ''} encontrado{filteredResearchers.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>

      {/* Informações de paginação */}
      <div className="flex justify-between items-center text-sm text-stellar-black-600">
        <span>
          Mostrando {startIndex + 1}-{Math.min(endIndex, filteredResearchers.length)} de {filteredResearchers.length} pesquisadores
        </span>
        <span>
          Página {currentPage} de {totalPages}
        </span>
      </div>

      {/* Lista de Ranking */}
      <div className="space-y-4">
        {currentResearchers.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="w-12 h-12 text-stellar-black-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-stellar-black-900 mb-2">Nenhum pesquisador encontrado</h3>
            <p className="text-stellar-black-600">Tente ajustar seus critérios de busca.</p>
          </div>
        ) : (
          currentResearchers.map((researcher) => (
            <div
              key={researcher.id}
              className="bg-white rounded-xl border border-stellar-black-200 p-6 hover:shadow-lg transition-all duration-200"
            >
              <div className="flex items-center gap-6">
                {/* Posição e Ícone */}
                <div className="flex flex-col items-center">
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${getRankBadgeColor(researcher.position)}`}>
                    #{researcher.position}
                  </div>
                  <div className="mt-2">
                    {getRankIcon(researcher.position)}
                  </div>
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  <StellarAvatar 
                    address={researcher.address} 
                    size="lg" 
                    className="ring-2 ring-stellar-gold-200"
                  />
                </div>

                {/* Informações do Pesquisador */}
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-6 text-center">
                    {/* Endereço */}
                    <div>
                      <div className="text-lg font-semibold text-stellar-black-900">
                        {simplifyAddress(researcher.address)}
                      </div>
                      <div className="text-xs text-stellar-black-500">Endereço</div>
                    </div>

                    {/* Milestones Concluídos */}
                    <div>
                      <div className="text-lg font-semibold text-stellar-gold-600">
                        {researcher.completedMilestones}
                      </div>
                      <div className="text-xs text-stellar-black-500">Milestones</div>
                    </div>

                    {/* Becas Ativas */}
                    <div>
                      <div className="text-lg font-semibold text-stellar-black-900">
                        {researcher.activeGrants}
                      </div>
                      <div className="text-xs text-stellar-black-500">Becas Activas</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Controles de Paginação */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          {/* Botão Anterior */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              currentPage === 1
                ? 'border-stellar-black-200 text-stellar-black-400 cursor-not-allowed'
                : 'border-stellar-black-300 text-stellar-black-700 hover:bg-stellar-gold-50 hover:border-stellar-gold-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </button>

          {/* Números das páginas */}
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg border transition-all duration-200 ${
                  currentPage === page
                    ? 'bg-stellar-gold-500 border-stellar-gold-500 text-white font-semibold'
                    : 'border-stellar-black-200 text-stellar-black-700 hover:bg-stellar-gold-50 hover:border-stellar-gold-300'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Botão Próximo */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              currentPage === totalPages
                ? 'border-stellar-black-200 text-stellar-black-400 cursor-not-allowed'
                : 'border-stellar-black-300 text-stellar-black-700 hover:bg-stellar-gold-50 hover:border-stellar-gold-300'
            }`}
          >
            Próximo
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default RankingResearchers;