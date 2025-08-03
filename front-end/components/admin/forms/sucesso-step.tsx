import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, Home, Copy } from 'lucide-react';
import ProgressBar from './progress-bar';

interface SucessoStepProps {
  onBackToList: () => void;
}

const SucessoStep: React.FC<SucessoStepProps> = ({ onBackToList }) => {
  // Dados simulados da transação
  const transactionData = {
    hash: "7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b",
    contractAddress: "CCKFBEIYTKDEXNLHGXGCIOSTFOXIFVDEUWENZMQHPOIXLRYGENFLFKGX"
  };

  // Função para copiar para clipboard
  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Aqui você pode adicionar um toast de sucesso se tiver
    } catch (err) {
      console.error('Erro ao copiar para clipboard:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header com progresso - Stellar Design */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl font-bold text-stellar-black-900">¡Beca Creada con Éxito!</h2>
              <p className="text-sm text-stellar-black-600">Paso 5 de 5: Confirmación</p>
            </div>
          </div>
        </div>

        {/* Progress bar reutilizável - Todos os passos completos */}
        <ProgressBar currentStep={5} />
      </div>

      {/* Tela de Sucesso - Stellar Design System */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-stellar-black-100 text-center">
        {/* Ícone de sucesso */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        {/* Título e mensagem principal */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stellar-black-900 mb-4">
            ¡Beca Creada con Éxito!
          </h2>
          <p className="text-lg text-stellar-black-700 mb-2">
            Su beca fue publicada exitosamente en la blockchain Stellar
          </p>
          <p className="text-sm text-stellar-black-600">
            El contrato inteligente fue implementado y está listo para recibir las transacciones de los hitos.
          </p>
        </div>

        {/* Informações da transação */}
        <div className="bg-stellar-black-25 rounded-xl p-6 mb-8 text-left">
          <h3 className="text-lg font-semibold text-stellar-black-900 mb-4 text-center">
            Detalles de la Publicación
          </h3>
          
          <div className="space-y-4">
            {/* Hash da Transação */}
            <div>
              <label className="block text-sm font-medium text-stellar-black-700 mb-2">
                Hash de la Transacción
              </label>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-stellar-black-200">
                <code className="flex-1 text-sm font-mono text-stellar-black-600 break-all">
                  {transactionData.hash}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transactionData.hash)}
                  className="p-2 hover:bg-stellar-black-50"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://stellar.expert/explorer/public/tx/${transactionData.hash}`, '_blank')}
                  className="p-2 hover:bg-stellar-black-50"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Endereço do Contrato */}
            <div>
              <label className="block text-sm font-medium text-stellar-black-700 mb-2">
                Dirección del Contrato
              </label>
              <div className="flex items-center space-x-2 bg-white rounded-lg p-3 border border-stellar-black-200">
                <code className="flex-1 text-sm font-mono text-stellar-black-600 break-all">
                  {transactionData.contractAddress}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(transactionData.contractAddress)}
                  className="p-2 hover:bg-stellar-black-50"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://stellar.expert/explorer/public/account/${transactionData.contractAddress}`, '_blank')}
                  className="p-2 hover:bg-stellar-black-50"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Botão para voltar à home */}
        <div className="flex justify-center">
          <Button 
            onClick={onBackToList}
            className="bg-black hover:bg-gray-900 text-white font-medium py-3 rounded-full shadow-lg transition-all duration-200 whitespace-nowrap flex items-center"
          >
            <span className="flex-1">Volver a Lista de Becas</span>
            <div className="bg-yellow-400 rounded-full p-1.5 ml-4">
              <Home className="h-4 w-4 text-black" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SucessoStep;