'use client';

import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Twitter } from 'lucide-react';

const FAQ = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "¿Qué es Stellabeca?",
      answer:
        "Stellabeca es una plataforma descentralizada para crear y gestionar becas científicas on-chain. Permite liberar fondos por hitos validados entre el estudiante, tutor y coordinador, usando el poder de la blockchain de Stellar y el rendimiento de Hoops Finance.",
    },
    {
      id: 2,
      question: "¿Cómo funcionan las becas en Stellabeca?",
      answer:
        "Cada beca se divide en hitos (milestones). Los fondos solo se liberan cuando los tres participantes (estudiante, tutor y coordinador) firman que el hito fue cumplido. Mientras tanto, los fondos bloqueados generan rendimiento a través de yield farming.",
    },
    {
      id: 3,
      question: "¿Qué significa liberar fondos por hitos?",
      answer:
        "Significa que el dinero de la beca no se entrega todo de una vez. Se libera en partes, a medida que el estudiante completa metas específicas del proyecto. Eso garantiza transparencia y responsabilidad.",
    },
    {
      id: 4,
      question: "¿Necesito saber sobre blockchain para usar Stellabeca?",
      answer:
        "No. Stellabeca fue diseñada para investigadores, estudiantes y universidades. Solo necesitas una wallet compatible con Stellar. Todo lo demás —firmas, seguridad y rendimiento— ocurre detrás de escena.",
    },
    {
      id: 5,
      question: "¿Cómo se relaciona Stellabeca con Stellar y Hoops Finance?",
      answer:
        "Stellabeca está construida sobre Stellar, una blockchain rápida y eficiente para transferencias financieras. Además, integra Hoops Finance para que los fondos bloqueados puedan generar rendimiento mientras esperan ser liberados.",
    },
    {
      id: 6,
      question: "¿Qué beneficios ofrece Stellabeca?",
      answer:
        "Ofrece transparencia total en el uso de fondos, reducción de desvíos, generación de rendimiento automático y confianza entre todas las partes del proceso científico. Todo está documentado on-chain.",
    },
    {
      id: 7,
      question: "¿Tengo que pagar para usar Stellabeca?",
      answer:
        "No. Crear y gestionar una beca es gratuito. Hay pequeñas comisiones automatizadas tomadas del rendimiento generado, pero el acceso a la plataforma es libre para instituciones y estudiantes.",
    },
    {
      id: 8,
      question: "¿Puedo acceder a Stellabeca desde el móvil?",
      answer:
        "Sí. Stellabeca es completamente compatible con navegadores móviles y wallets como Lobstr, Freighter o cualquier wallet de Stellar que soporte firmas múltiples.",
    },
    {
      id: 9,
      question: "¿Qué instituciones pueden participar?",
      answer:
        "Universidades, centros de investigación, ONGs, y hasta DAOs científicas pueden crear becas en Stellabeca. También aceptamos propuestas individuales validadas por revisores.",
    },
    {
      id: 10,
      question: "¿Dónde puedo obtener ayuda o más información?",
      answer:
        "Contamos con un centro de soporte, tutoriales paso a paso y atención directa vía Discord y Telegram. También puedes encontrar toda la documentación en nuestro portal oficial.",
    },
  ];  

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section className="relative py-24 bg-stellar-white-600 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-stellar-gold-50 border border-stellar-gold-200 rounded-full mb-8">
            <HelpCircle className="w-4 h-4 mr-2 text-stellar-gold-600" />
            <span className="text-stellar-gold-600 text-sm font-semibold">AYUDA</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-stellar-black-900 leading-tight mb-6">
            Preguntas <span className="relative">
              <span className="relative z-10">Frecuentes</span>
              {/* Stellar Brushstroke Highlight Effect */}
              <div className="absolute inset-0 transform -rotate-1 scale-105">
                {/* Base brushstroke with irregular shape */}
                <div className="absolute inset-0 bg-stellar-gold-500 rounded-[20px] transform rotate-1 scale-105" 
                     style={{
                       clipPath: 'polygon(0% 20%, 5% 10%, 15% 5%, 25% 8%, 35% 3%, 45% 7%, 55% 2%, 65% 6%, 75% 1%, 85% 5%, 95% 0%, 100% 4%, 98% 25%, 95% 45%, 90% 65%, 85% 75%, 80% 85%, 75% 90%, 70% 95%, 65% 98%, 60% 100%, 55% 98%, 50% 95%, 45% 90%, 40% 85%, 35% 80%, 30% 75%, 25% 70%, 20% 65%, 15% 60%, 10% 55%, 5% 50%, 0% 45%)'
                     }}></div>
                {/* Overlay brushstroke for texture */}
                <div className="absolute inset-0 bg-stellar-gold-400 rounded-[20px] transform rotate-2 scale-105 opacity-70" 
                     style={{
                       clipPath: 'polygon(2% 15%, 8% 8%, 18% 3%, 28% 6%, 38% 1%, 48% 5%, 58% 0%, 68% 4%, 78% 0%, 88% 3%, 98% 0%, 100% 2%, 99% 20%, 96% 40%, 92% 60%, 88% 75%, 84% 85%, 80% 92%, 76% 97%, 72% 100%, 68% 98%, 64% 95%, 60% 90%, 56% 85%, 52% 80%, 48% 75%, 44% 70%, 40% 65%, 36% 60%, 32% 55%, 28% 50%, 24% 45%, 20% 40%, 16% 35%, 12% 30%, 8% 25%, 4% 20%, 0% 15%)'
                     }}></div>
                {/* Highlight brushstroke for shine */}
                <div className="absolute inset-0 bg-stellar-gold-300 rounded-[20px] transform rotate-0 scale-105 opacity-50" 
                     style={{
                       clipPath: 'polygon(5% 10%, 12% 5%, 22% 2%, 32% 4%, 42% 0%, 52% 3%, 62% 0%, 72% 2%, 82% 0%, 92% 1%, 100% 0%, 98% 15%, 94% 30%, 90% 45%, 86% 60%, 82% 70%, 78% 80%, 74% 87%, 70% 93%, 66% 97%, 62% 100%, 58% 97%, 54% 93%, 50% 87%, 46% 80%, 42% 70%, 38% 60%, 34% 50%, 30% 40%, 26% 30%, 22% 20%, 18% 15%, 14% 10%, 10% 8%, 6% 5%, 2% 3%)'
                     }}></div>
              </div>
            </span>
          </h2>
          <p className="text-xl text-stellar-black-600 max-w-3xl mx-auto">
            Todo lo que necesitas saber sobre Stellabeca y cómo estamos revolucionando 
            la financiación científica a través de la tecnología blockchain.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-stellar-white-600 rounded-2xl border border-stellar-black-100 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full text-left p-6 rounded-2xl flex justify-between items-center transition-colors group"
              >
                <h3 className="text-lg font-bold text-stellar-black-900 pr-4 group-hover:text-stellar-gold-600 transition-colors">
                  {item.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 bg-stellar-gold-500 rounded-lg flex items-center justify-center transition-transform duration-300 ${
                  openItem === item.id ? 'rotate-45' : ''
                }`}>
                  {openItem === item.id ? (
                    <Minus className="w-4 h-4 text-stellar-black-900" />
                  ) : (
                    <Plus className="w-4 h-4 text-stellar-black-900" />
                  )}
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openItem === item.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6">
                  <div className="w-full h-px bg-stellar-black-200 mb-4"></div>
                  <p className="text-stellar-black-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-stellar-gold-50 rounded-3xl p-8 border border-stellar-gold-100">
            <h3 className="text-2xl font-black text-stellar-black-900 mb-4">
              Aún tienes preguntas?
            </h3>
            <p className="text-stellar-black-600 mb-6">
              Nuestro equipo está aquí para ayudarte a empezar con Stellabeca
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-stellar-gold-500 text-stellar-black-900 rounded-2xl font-bold hover:bg-stellar-gold-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Contactar soporte
              </button>
              <button className="px-8 py-3 border-2 border-stellar-black-300 text-stellar-black-700 rounded-2xl font-bold hover:bg-stellar-white-50 hover:border-stellar-black-400 transition-all duration-300">
                Ver documentación
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;