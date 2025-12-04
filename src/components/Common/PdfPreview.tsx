import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import BcaLogo from './BcaLogo';

interface PdfPreviewProps {
  onClose: () => void;
  title: string;
}

const PdfPreview: React.FC<PdfPreviewProps> = ({ onClose, title }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-4">
            <BcaLogo />
            <div className="h-6 w-px bg-gray-200" />
            <h3 className="font-medium text-lg">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => window.open('/mission-order.pdf', '_blank')}
              className="p-2 hover:bg-gray-100 rounded-full text-[#0053A0] hover:text-[#0076C8]"
              title="Ouvrir dans un nouvel onglet"
            >
              <ExternalLink size={20} />
            </button>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* PDF Preview */}
        <div className="h-[70vh] bg-gray-900 p-4">
          <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-8">
              {/* PDF Header */}
              <div className="flex justify-between items-start mb-8">
                <BcaLogo />
                <div className="text-right">
                  <h2 className="text-xl font-bold text-[#0053A0] mb-1">Ordre de mission</h2>
                  <p className="text-gray-600">Réf: 85357118</p>
                </div>
              </div>

              {/* PDF Content Preview */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="font-semibold text-[#0053A0] mb-2">Informations générales</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Date de réception :</p>
                      <p className="font-medium">10/04/2025</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Société d'assurances :</p>
                      <p className="font-medium">Pacifica</p>
                    </div>
                  </div>
                </div>

                {/* Additional sections would be visible in the actual PDF */}
                <div className="text-center text-gray-400 italic">
                  Aperçu du document - Cliquez sur "Ouvrir" ou "Télécharger" pour voir le document complet
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.open('/mission-order.pdf', '_blank')}
              className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium flex items-center"
            >
              <ExternalLink size={16} className="mr-1" />
              Ouvrir dans un nouvel onglet
            </button>
            <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium flex items-center">
              <Download size={16} className="mr-1" />
              Télécharger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;