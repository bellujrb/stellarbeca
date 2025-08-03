import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Copy, CheckCircle, Clock, Users, Wallet, Building2, ExternalLink, Link, Info, DollarSign, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface BecaDetailsProps {
  becaData: {
    id: number;
    nombre_beca: string;
    institucion: string;
    valor_total: string;
    cantidad_hito: number;
    total_hitos: number;
    status: number;
    contract_address: string;
    details_beca: string;
    responsables: {
      investigador: { nombre_completo: string; wallet_publica: string; correo_electronico: string };
      tutor: { nombre_completo: string; wallet_publica: string; correo_electronico: string };
      gestor: { nombre_completo: string; wallet_publica: string; correo_electronico: string };
    };
    milestones: Array<{
      id: string;
      nome: string;
      descripcion: string;
      completed: boolean;
      signatures_required: number;
      signatures_received: number;
    }>;
  };
  onBack: () => void;
}

const BecaDetails: React.FC<BecaDetailsProps> = ({ becaData, onBack }) => {
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>({});
  const [expandedSections, setExpandedSections] = useState({
    informacion: false,
    progreso: false,
    responsables: false,
    hitos: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Verificar se há milestones completados disponíveis para claim
  const hasCompletedMilestones = becaData.milestones.some(milestone => milestone.completed);
  const completedMilestonesCount = becaData.milestones.filter(milestone => milestone.completed).length;

  const generateReleaseLink = (milestoneId: string) => {
    // Simular geração de link único para liberação
    return `https://stellarbeca.com/release/${becaData.contract_address}/${milestoneId}`;
  };

  const copyToClipboard = async (text: string, milestoneId: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLinks(prev => ({ ...prev, [milestoneId]: true }));
      setTimeout(() => {
        setCopiedLinks(prev => ({ ...prev, [milestoneId]: false }));
      }, 2000);
    } catch (err) {
      console.error('Error copying to clipboard:', err);
    }
  };

  const handleContractClick = () => {
    window.open(`https://stellar.expert/explorer/public/contract/${becaData.contract_address}`, '_blank');
  };

  const handleClaimClick = () => {
    // Lógica para processar o claim
    console.log('Processando claim para beca:', becaData.nombre_beca);
    // Aqui você pode adicionar a lógica real do claim
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="p-2 hover:bg-stellar-black-50 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-stellar-black-700" />
            </Button>
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-stellar-black-900">Detalles de la Beca</h2>
                <p className="text-sm text-stellar-black-600">{becaData.nombre_beca}</p>
              </div>
              <Badge
                variant="secondary"
                className={
                  becaData.status === 100
                    ? "bg-green-100 text-green-700 border-green-200"
                    : "bg-yellow-100 text-yellow-700 border-yellow-200"
                }
              >
                {becaData.status === 100 ? "Completado" : "En Progreso"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Información sobre la beca - Expandible */}
      <div className="bg-white rounded-2xl shadow-lg border border-stellar-black-100">
        <div 
          className="p-6 cursor-pointer hover:bg-stellar-black-25 transition-colors rounded-t-2xl"
          onClick={() => toggleSection('informacion')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-stellar-black-900">Información de la Beca</h3>
            <div className="flex items-center gap-2">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasCompletedMilestones) {
                    handleClaimClick();
                  }
                }}
                disabled={!hasCompletedMilestones}
                className={`px-4 py-2 font-medium rounded-full flex items-center gap-2 ${
                  hasCompletedMilestones
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <DollarSign className="h-4 w-4" />
                Claim Funds
              </Button>
              {expandedSections.informacion ? (
                <ChevronUp className="h-5 w-5 text-stellar-black-600" />
              ) : (
                <ChevronDown className="h-5 w-5 text-stellar-black-600" />
              )}
            </div>
          </div>
        </div>
        
        {expandedSections.informacion && (
          <div className="px-6 pb-6">
            {/* Aviso informativo sobre o claim quando há milestones completados */}
            {hasCompletedMilestones && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Fondos disponibles para Claim:</p>
                  <p>Tienes {completedMilestonesCount} hito(s) completado(s) con fondos disponibles para reclamar. Los fondos serán enviados directamente a la wallet del investigador principal ({becaData.responsables.investigador.nombre_completo}). Esta acción es irreversible una vez confirmada en la blockchain de Stellar.</p>
                </div>
              </div>
            )}
            
            {/* Aviso quando não há milestones completados */}
            {!hasCompletedMilestones && (
              <div className="mb-6 flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-800">
                  <p className="font-medium mb-1">Claim no disponible:</p>
                  <p>El botón de claim estará disponible cuando al menos un hito de la beca esté completado. Hitos completados: {completedMilestonesCount}/{becaData.total_hitos}</p>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-stellar-black-700 mb-1">Nombre de la Beca</label>
                  <p className="text-stellar-black-900 font-medium">{becaData.nombre_beca}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stellar-black-700 mb-1">Institución</label>
                  <div className="flex items-center">
                    <Building2 className="h-4 w-4 mr-2 text-stellar-black-500" />
                    <p className="text-stellar-black-900">{becaData.institucion}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stellar-black-700 mb-1">Valor Total</label>
                  <div className="flex items-center">
                    <Wallet className="h-4 w-4 mr-2 text-stellar-gold-600" />
                    <p className="text-stellar-gold-600 font-semibold text-lg">{becaData.valor_total}</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-stellar-black-700 mb-1">Descripción</label>
                <p className="text-stellar-black-700 leading-relaxed">{becaData.details_beca}</p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    onClick={handleContractClick}
                    className="border-stellar-black-300 text-stellar-black-700 hover:bg-stellar-black-50"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver Contrato Inteligente
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Progreso de la Beca - Expandible */}
      <div className="bg-white rounded-2xl shadow-lg border border-stellar-black-100">
        <div 
          className="p-6 cursor-pointer hover:bg-stellar-black-25 transition-colors rounded-t-2xl"
          onClick={() => toggleSection('progreso')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-stellar-black-900">Progreso de la Beca</h3>
            {expandedSections.progreso ? (
              <ChevronUp className="h-5 w-5 text-stellar-black-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-stellar-black-600" />
            )}
          </div>
        </div>
        
        {expandedSections.progreso && (
          <div className="px-6 pb-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-stellar-black-700">Progreso General</span>
                <span className="font-semibold text-stellar-black-900">{becaData.status}%</span>
              </div>
              <div className="w-full bg-stellar-black-100 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-300 ease-out ${
                    becaData.status === 100 ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                  style={{ width: `${becaData.status}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-stellar-black-600">
                <span>Hitos completados: {becaData.cantidad_hito}/{becaData.total_hitos}</span>
                <span>Última actualización: hace 2 horas</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Responsables - Expandible */}
      <div className="bg-white rounded-2xl shadow-lg border border-stellar-black-100">
        <div 
          className="p-6 cursor-pointer hover:bg-stellar-black-25 transition-colors rounded-t-2xl"
          onClick={() => toggleSection('responsables')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-stellar-black-900">Responsables</h3>
            {expandedSections.responsables ? (
              <ChevronUp className="h-5 w-5 text-stellar-black-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-stellar-black-600" />
            )}
          </div>
        </div>
        
        {expandedSections.responsables && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {Object.entries(becaData.responsables).map(([role, data]) => (
                <Card key={role} className="border border-stellar-black-100">
                  <CardHeader className="pb-3">
                    <h4 className="font-medium text-stellar-black-900 capitalize">
                      {role === 'investigador' ? 'Investigador Principal' : 
                       role === 'tutor' ? 'Tutor' : 'Gestor'}
                      {role === 'investigador' && ' 💰'}
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-stellar-black-900">{data.nombre_completo}</p>
                      <p className="text-xs text-stellar-black-600">{data.correo_electronico}</p>
                    </div>
                    <div className="bg-stellar-black-50 p-2 rounded text-xs font-mono text-stellar-black-700">
                      {data.wallet_publica.substring(0, 20)}...
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Hitos de la Beca - Expandible */}
      <div className="bg-white rounded-2xl shadow-lg border border-stellar-black-100">
        <div 
          className="p-6 cursor-pointer hover:bg-stellar-black-25 transition-colors rounded-t-2xl"
          onClick={() => toggleSection('hitos')}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-stellar-black-900">Hitos de la Beca</h3>
            {expandedSections.hitos ? (
              <ChevronUp className="h-5 w-5 text-stellar-black-600" />
            ) : (
              <ChevronDown className="h-5 w-5 text-stellar-black-600" />
            )}
          </div>
        </div>
        
        {expandedSections.hitos && (
          <div className="px-6 pb-6">
            <div className="space-y-4">
              {becaData.milestones.map((milestone, index) => (
                <Card key={milestone.id} className="border border-stellar-black-100">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            milestone.completed 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
                            {milestone.completed ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-stellar-black-900">
                              Hito {index + 1}: {milestone.nome}
                            </h4>
                            <p className="text-sm text-stellar-black-600">{milestone.descripcion}</p>
                          </div>
                        </div>
                        
                        {!milestone.completed && (
                          <div className="ml-11 space-y-3">
                            <div className="flex items-center space-x-2 text-sm">
                              <Users className="h-4 w-4 text-stellar-black-500" />
                              <span className="text-stellar-black-700">
                                Firmas: {milestone.signatures_received}/{milestone.signatures_required}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                {milestone.signatures_required - milestone.signatures_received} faltando
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => copyToClipboard(generateReleaseLink(milestone.id), milestone.id)}
                                className="bg-stellar-gold-600 hover:bg-stellar-gold-700 text-white"
                              >
                                {copiedLinks[milestone.id] ? (
                                  <>
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    ¡Copiado!
                                  </>
                                ) : (
                                  <>
                                    <Link className="h-4 w-4 mr-2" />
                                    Generar Link de Liberación
                                  </>
                                )}
                              </Button>
                              {copiedLinks[milestone.id] && (
                                <span className="text-xs text-green-600">Link copiado al portapapeles</span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BecaDetails;