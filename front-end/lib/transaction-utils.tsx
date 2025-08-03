import React from 'react';
import {
  GraduationCap,
  Coins,
  Target,
  Gift,
  TrendingUp,
  ArrowDownLeft,
  Shield,
  Trophy,
  Hash,
  CheckCircle,
  Clock,
  XCircle,
  Users,
  AlertCircle
} from 'lucide-react';
import { TransactionType, TransactionStatus } from '@/types/transactions';

export const getTypeIcon = (type: TransactionType) => {
  switch (type) {
    case 'create_scholarship':
      return <GraduationCap className="w-4 h-4 text-stellar-gold-600" />;
    case 'fund_scholarship':
      return <Coins className="w-4 h-4 text-green-600" />;
    case 'define_milestone':
      return <Target className="w-4 h-4 text-blue-600" />;
    case 'milestone_claim':
      return <Gift className="w-4 h-4 text-purple-600" />;
    case 'yield_deposit':
      return <TrendingUp className="w-4 h-4 text-stellar-teal-600" />;
    case 'yield_withdraw':
      return <ArrowDownLeft className="w-4 h-4 text-stellar-teal-500" />;
    case 'multisig_approve':
      return <Shield className="w-4 h-4 text-stellar-navy-600" />;
    case 'scholarship_complete':
      return <Trophy className="w-4 h-4 text-stellar-gold-500" />;
    default:
      return <Hash className="w-4 h-4 text-gray-600" />;
  }
};

export const getStatusIcon = (status: TransactionStatus) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    case 'failed':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'awaiting_signatures':
      return <Users className="w-4 h-4 text-stellar-navy-500" />;
    default:
      return <AlertCircle className="w-4 h-4 text-gray-500" />;
  }
};

export const getStatusColor = (status: TransactionStatus) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'failed':
      return 'bg-red-100 text-red-700 border-red-200';
    case 'awaiting_signatures':
      return 'bg-stellar-navy-100 text-stellar-navy-700 border-stellar-navy-200';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export const getTypeLabel = (type: TransactionType) => {
  switch (type) {
    case 'create_scholarship':
      return 'Crear Beca';
    case 'fund_scholarship':
      return 'Financiar Beca';
    case 'define_milestone':
      return 'Definir Hito';
    case 'milestone_claim':
      return 'Reclamar Hito';
    case 'yield_deposit':
      return 'Depósito de Rendimiento';
    case 'yield_withdraw':
      return 'Retiro de Rendimiento';
    case 'multisig_approve':
      return 'Aprobación Multi-firma';
    case 'scholarship_complete':
      return 'Beca Completada';
    default:
      return type;
  }
};

export const getStatusLabel = (status: TransactionStatus) => {
  switch (status) {
    case 'confirmed':
      return 'Confirmado';
    case 'pending':
      return 'Pendiente';
    case 'failed':
      return 'Falló';
    case 'awaiting_signatures':
      return 'Esperando Firmas';
    default:
      return status;
  }
};