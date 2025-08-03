import React, { useEffect, useState } from 'react';
import { 
  ExternalLink,
  Copy,
  Filter,
  Search,
  Eye,
  Hash,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Transaction, TransactionType } from '@/types/transactions';
import { mockTransactions } from '../../data/mock_transactions';
import {
  getTypeIcon,
  getStatusIcon,
  getStatusColor,
  getTypeLabel,
  getStatusLabel
} from '@/lib/transaction-utils';

const TransactionsSection: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTxs, setFilteredTxs] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setTransactions(mockTransactions);
      setFilteredTxs(mockTransactions);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter transactions
  useEffect(() => {
    let filtered = transactions;

    if (filter !== 'all') {
      filtered = filtered.filter(tx => tx.type === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(tx => 
        tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.token.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredTxs(filtered);
  }, [filter, searchTerm, transactions]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(text);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  const formatHash = (hash: string) => {
    return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
  };

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `hace ${diffMins}min`;
    } else if (diffHours < 24) {
      return `hace ${diffHours}h`;
    } else {
      return `hace ${diffDays}d`;
    }
  };

  const formatValue = (value: string, token: string) => {
    const num = parseFloat(value);
    if (num === 0) return 'Sin valor';
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(2)}M ${token}`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(2)}K ${token}`;
    } else {
      return `${num.toFixed(2)} ${token}`;
    }
  };

  const openInExplorer = (hash: string) => {
    window.open(`https://stellar.expert/explorer/public/tx/${hash}`, '_blank');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-stellar-black-900">Transacciones</h2>
          <p className="text-sm text-stellar-black-600">Historial completo de transacciones en la blockchain Stellar</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-stellar-black-100">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stellar-black-400" />
            <input
              type="text"
              placeholder="Buscar por hash, tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-stellar-black-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-stellar-gold-300"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-48">
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4" />
                    <span>{filter === 'all' ? 'Todos los Tipos' : getTypeLabel(filter as TransactionType)}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los Tipos</SelectItem>
                <SelectItem value="create_scholarship">Crear Beca</SelectItem>
                <SelectItem value="fund_scholarship">Financiar Beca</SelectItem>
                <SelectItem value="define_milestone">Definir Hito</SelectItem>
                <SelectItem value="milestone_claim">Reclamar Hito</SelectItem>
                <SelectItem value="yield_deposit">Depósito de Rendimiento</SelectItem>
                <SelectItem value="yield_withdraw">Retiro de Rendimiento</SelectItem>
                <SelectItem value="multisig_approve">Aprobación Multi-firma</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-lg border border-stellar-black-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-stellar-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-stellar-black-600">Cargando transacciones...</p>
          </div>
        ) : filteredTxs.length === 0 ? (
          <div className="p-8 text-center">
            <Hash className="w-12 h-12 text-stellar-black-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-stellar-black-900 mb-2">No se encontraron transacciones</h3>
            <p className="text-stellar-black-600">Intenta ajustar tus criterios de búsqueda o filtro.</p>
          </div>
        ) : (
          <div className="divide-y divide-stellar-black-100">
            {filteredTxs.map((tx) => (
              <div key={tx.hash} className="p-6 hover:bg-stellar-white-50 transition-colors">
                {/* Header Row - Icon, Type, Status, Value, Block */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-stellar-gold-50 rounded-xl flex items-center justify-center border border-stellar-gold-200">
                      {getTypeIcon(tx.type)}
                    </div>
                    <div>
                      <div className="font-bold text-stellar-black-900">{getTypeLabel(tx.type)}</div>
                      <div className="text-sm text-stellar-black-600">{formatTimestamp(tx.timestamp)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(tx.status)}`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(tx.status)}
                        <span>{getStatusLabel(tx.status)}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold text-stellar-black-900">
                        {formatValue(tx.value, tx.token)}
                      </div>
                      <div className="text-sm text-stellar-black-600">
                        Bloque #{tx.blockNumber.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stellar-black-600">Desde:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-stellar-black-900">{formatHash(tx.from)}</span>
                        <button
                          onClick={() => copyToClipboard(tx.from)}
                          className="text-stellar-black-400 hover:text-stellar-black-600"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stellar-black-600">Hacia:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-stellar-black-900">{formatHash(tx.to)}</span>
                        <button
                          onClick={() => copyToClipboard(tx.to)}
                          className="text-stellar-black-400 hover:text-stellar-black-600"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-stellar-black-600">Gas Usado:</span>
                      <span className="font-mono text-stellar-black-900">{parseInt(tx.gasUsed).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-stellar-black-600">Precio Gas:</span>
                      <span className="font-mono text-stellar-black-900">{tx.gasPrice} Gwei</span>
                    </div>
                  </div>
                </div>

                {/* Hash and Actions Row */}
                <div className="flex items-center justify-between pt-4 border-t border-stellar-black-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-stellar-black-600">Hash:</span>
                    <span className="font-mono text-sm text-stellar-black-900">{formatHash(tx.hash)}</span>
                    <button
                      onClick={() => copyToClipboard(tx.hash)}
                      className="text-stellar-black-400 hover:text-stellar-black-600"
                    >
                      {copiedHash === tx.hash ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openInExplorer(tx.hash)}
                    className="text-stellar-gold-600 border-stellar-gold-200 hover:bg-stellar-gold-50"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Ver en Explorer
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsSection;