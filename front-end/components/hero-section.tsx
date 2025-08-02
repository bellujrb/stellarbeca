'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Play, TrendingUp, Users, Zap, Globe, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-stellar-white-600 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stellar-white-50 via-stellar-white-600 to-stellar-white-50"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-stellar-gold-500/10 to-stellar-gold-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tr from-stellar-gold-400/8 to-stellar-gold-500/4 rounded-full blur-3xl"></div>
        
        {/* Subtle Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23fddb24' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">
          {/* Left Content */}
          <div className="space-y-8">

            {/* Main Heading with Stellar Highlights */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-stellar-black-900">
                <div className="mb-2">El futuro de los fondos científicos</div>
                <div className="relative mb-2">
                  <span className="relative z-10">impulsado por Stellar y Hoops</span>
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
                </div>
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-stellar-black-600 leading-relaxed max-w-xl">
            Stellabeca brings transparency to research funding with Stellar and Hoops Finance
            — powering on-chain scientific grants based on milestones and trustless governance.

            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/admin">
                <Button
                  size="lg"
                  className="group bg-stellar-gold-500 hover:bg-stellar-gold-600 text-stellar-black-900 px-8 py-4 text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Lanzar App
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="group border-2 border-stellar-black-300 text-stellar-black-700 hover:bg-stellar-white-50 px-8 py-4 text-lg font-bold rounded-2xl transition-all duration-300"
              >
                Documentación
              </Button>
            </div>

          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative w-full h-[600px] lg:h-[700px]">
              {/* Main Image */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="relative">
                  <Image
                    src="/girl.png"
                    alt="Female Athlete"
                    width={500}
                    height={650}
                    className="mx-auto max-h-[70vh] max-w-[90%] object-contain object-top"
                    priority
                  />
                  
                  {/* Subtle Glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stellar-gold-500/5 via-transparent to-transparent rounded-full blur-3xl -z-10 scale-125"></div>
                </div>
              </div>

            
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}