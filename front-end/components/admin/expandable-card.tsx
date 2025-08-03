"use client";

import React from "react";
import {
  Clock,
  Building2,
  Wallet,
  Milestone,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BecaCardProps {
  nombre_beca: string;
  institucion: string;
  valor_total: string;
  cantidad_hito: number;
  total_hitos: number;
  status: number;
  fecha_actualizacion?: string;
  contract_address?: string;
  onViewDetails?: () => void;
}

export function BecaCard({
  nombre_beca,
  institucion,
  valor_total,
  cantidad_hito,
  total_hitos,
  status,
  fecha_actualizacion = "2 horas atrás",
  contract_address,
  onViewDetails,
}: BecaCardProps) {
  const handleContractClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (contract_address) {
      window.open(`https://stellar.expert/explorer/public/contract/${contract_address}`, '_blank');
    }
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails();
    }
  };

  return (
    <Card
      className="w-full cursor-pointer transition-all duration-300 hover:shadow-lg bg-white border border-stellar-black-100 rounded-2xl"
      onClick={handleCardClick}
    >
      <CardHeader className="space-y-3 pb-4">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className={
                status === 100
                  ? "bg-green-100 text-green-700 border-green-200"
                  : "bg-yellow-100 text-yellow-700 border-yellow-200"
              }
            >
              {status === 100 ? "Completado" : "En Progreso"}
            </Badge>
            <h3 className="text-lg font-bold text-stellar-black-900 leading-tight">{nombre_beca}</h3>
          </div>
          {contract_address && (
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0 rounded-lg border-stellar-black-200 bg-white hover:bg-stellar-black-50 text-stellar-black-600 hover:text-stellar-black-800 shadow-sm"
              onClick={handleContractClick}
              title="Ver Contrato Inteligente"
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-stellar-black-700">
              <Building2 className="h-4 w-4 mr-2 text-stellar-black-500" />
              <span className="text-sm">{institucion}</span>
            </div>
            <div className="flex items-center text-stellar-gold-600">
              <Wallet className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">{valor_total}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-stellar-black-700">
              <span>Progreso</span>
              <span className="font-medium">{status}%</span>
            </div>
            <div className="w-full bg-stellar-black-100 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ease-out ${
                  status === 100 ? 'bg-green-500' : 'bg-yellow-500'
                }`}
                style={{ width: `${status}%` }}
              />
            </div>
          </div>

          {/* Hitos sempre visíveis */}
          <div className="flex items-center justify-between text-sm text-stellar-black-700 bg-stellar-black-50 p-3 rounded-lg border border-stellar-black-100">
            <div className="flex items-center">
              <Milestone className="h-4 w-4 mr-2 text-stellar-black-500" />
              <span>Hitos completados</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-stellar-black-900">{cantidad_hito}</span>
              <span className="text-stellar-black-500">/ {total_hitos}</span>
            </div>
          </div>

        </div>
      </CardContent>

      <CardFooter className="border-t border-stellar-black-100 py-3">
        <div className="flex items-center justify-between w-full text-xs text-stellar-black-600">
          <span>Última actualización: {fecha_actualizacion}</span>
          <span className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Hitos: {cantidad_hito}/{total_hitos}</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}