'use client';

import React from 'react';
import { Twitter} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-stellar-black-900 text-stellar-white-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-black text-stellar-white-600">
              Stellarbeca
            </span>
          </div>
          
          {/* Social Links */}
          <div className="flex space-x-4">
            <a 
              href="#" 
              className="w-10 h-10 bg-stellar-black-800 rounded-lg flex items-center justify-center text-stellar-black-400 hover:bg-stellar-gold-500 hover:text-stellar-black-900 transition-all duration-300"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-stellar-black-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-stellar-black-400 text-sm">
              © 2025 Stellarbeca. Todos los derechos reservados.
            </div>
            
            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-stellar-black-400">
              <a href="#" className="hover:text-stellar-gold-400 transition-colors">Política de privacidad</a>
              <a href="#" className="hover:text-stellar-gold-400 transition-colors">Términos de servicio</a>
              <a href="#" className="hover:text-stellar-gold-400 transition-colors">Política de cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;