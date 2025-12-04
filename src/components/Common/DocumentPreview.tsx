import React from 'react';
import { X, Download, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

interface DocumentPreviewProps {
  document: {
    title: string;
    fileType: string;
    imageUrl?: string;
    previewUrl?: string;
  };
  onClose: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document, onClose }) => {
  const isImage = document.imageUrl && ['jpg', 'jpeg', 'png'].includes(document.fileType.toLowerCase());
  const previewUrl = document.imageUrl || document.previewUrl;

  const openInNewTab = () => {
    if (previewUrl) {
      window.open(previewUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium text-lg">{document.title}</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={openInNewTab}
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

        {/* Content */}
        <div className="relative">
          {previewUrl ? (
            <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
              <img 
                src={previewUrl} 
                alt={document.title}
                className="max-h-[70vh] object-contain"
              />
              
              {/* Navigation buttons for images */}
              <button className="absolute left-4 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white">
                <ChevronLeft size={24} />
              </button>
              <button className="absolute right-4 p-2 bg-black bg-opacity-50 hover:bg-opacity-75 rounded-full text-white">
                <ChevronRight size={24} />
              </button>
            </div>
          ) : (
            <div className="h-[70vh] bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-4">Aperçu non disponible</p>
                <button className="bg-[#0053A0] text-white px-4 py-2 rounded-lg hover:bg-[#0076C8] flex items-center mx-auto">
                  <Download size={20} className="mr-2" />
                  Télécharger le fichier
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {document.fileType.toUpperCase()}
              </span>
              <button 
                onClick={openInNewTab}
                className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium flex items-center"
              >
                <ExternalLink size={16} className="mr-1" />
                Ouvrir dans un nouvel onglet
              </button>
            </div>
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

export default DocumentPreview;