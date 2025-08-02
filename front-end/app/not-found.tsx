"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Custom404() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-stellar-white-600 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-stellar-gold-400 to-stellar-gold-500 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-stellar-gold-300 to-stellar-gold-400 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-r from-stellar-gold-500 to-stellar-gold-600 rounded-full opacity-10 blur-xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-xl mx-auto px-4 py-16 text-center flex flex-col items-center justify-center">
        <div className="sm:w-10/12 md:w-8/12 text-center">
          <div
            className="bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] h-[220px] sm:h-[300px] md:h-[340px] bg-center bg-no-repeat bg-contain flex items-end justify-center"
            aria-hidden="true"
          >
            <h1 className="text-center text-stellar-black-900 text-7xl sm:text-8xl md:text-9xl font-black drop-shadow-lg pt-6 sm:pt-8">
              404
            </h1>
          </div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-stellar-black-900 mb-4">
          La página que buscas se perdió o está en desarrollo.
        </h2>
        <p className="mb-8 text-lg text-stellar-black-600 max-w-md mx-auto">
          Puedes regresar a la página principal y continuar explorando la plataforma.
        </p>
        <Button
          size="lg"
          onClick={() => router.push("/")}
          className="bg-stellar-gold-500 hover:bg-stellar-gold-600 text-stellar-black-900 px-8 py-3 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          Ir al Inicio
        </Button>
      </div>
    </section>
  );
} 