import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, Image as ImageIcon, FileSpreadsheet, File } from 'lucide-react';
import PdfPreviewContent from './PdfPreviewContent';

export interface Document {
  id: string;
  title: string;
  category: string;
  date: string;
  fileType: string;
  fileSize: string;
  imageUrl?: string;
  previewUrl?: string;
  read?: boolean;
}

interface DocumentCardProps {
  document: Document;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document }) => {
  const isImage = document.category === 'Photos';

  const getFileIcon = () => {
    switch (document.fileType.toLowerCase()) {
      case 'pdf':
        return <FileText className="text-[#D64800] h-6 w-6" />;
      case 'xlsx':
        return <FileSpreadsheet className="text-[#087F23] h-6 w-6" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <ImageIcon className="text-[#0277BD] h-6 w-6" />;
      default:
        return <File className="text-[#0053A0] h-6 w-6" />;
    }
  };

  const handleDocumentClick = () => {
    // Déterminer le type de document
    let documentType: 'rapport' | 'facture' | 'devis' | 'certificat' | 'note-honoraire' | 'constat' = 'rapport';
    
    if (document.title.toLowerCase().includes('facture') || document.title.toLowerCase().includes('réparation')) {
      documentType = 'facture';
    } else if (document.title.toLowerCase().includes('devis')) {
      documentType = 'devis';
    } else if (document.title.toLowerCase().includes('note') && document.title.toLowerCase().includes('honoraire')) {
      documentType = 'note-honoraire';
    } else if (document.title.toLowerCase().includes('constat')) {
      documentType = 'constat';
    } else if (document.title.toLowerCase().includes('certificat') || document.title.toLowerCase().includes('attestation')) {
      documentType = 'certificat';
    }

    // Créer une nouvelle fenêtre avec le contenu PDF simulé
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      // Créer le contenu HTML avec React rendu côté client
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${document.title}</title>
            <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
            <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #f5f5f5; }
              .header { background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .content { background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .download-btn { background: #0053A0; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
              .download-btn:hover { background: #0076C8; }
              img { max-width: 100%; height: auto; display: block; }
              iframe { width: 100%; height: 80vh; border: none; }
              .pdf-content { background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>${document.title}</h1>
              <p>Type: ${document.fileType.toUpperCase()} • Taille: ${document.fileSize}</p>
              <button class="download-btn" onclick="window.print()">Télécharger / Imprimer</button>
            </div>
            <div class="content">
              <div id="pdf-preview" class="pdf-content"></div>
            </div>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-700 overflow-visible cursor-pointer transform hover:scale-[2.5] hover:z-50 relative ${document.read === false ? 'ring-2 ring-[#FFB800]' : ''}`} onClick={handleDocumentClick}>
      <div className="p-3">
        {isImage && document.imageUrl ? (
          <div className="mb-2 relative">
            <div className="aspect-video bg-gray-100 rounded-md overflow-hidden transform transition-transform duration-700 hover:scale-125">
              <img 
                src={document.imageUrl}
                alt={document.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white px-1.5 py-0.5 rounded text-xs font-medium">
              {document.fileType.toUpperCase()}
            </div>
          </div>
        ) : document.previewUrl ? (
          <div className="mb-2 relative">
            <div className="aspect-[3/4] bg-gray-100 rounded-md overflow-hidden transform transition-transform duration-700 hover:scale-125">
              <img 
                src={document.previewUrl}
                alt={document.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white px-1.5 py-0.5 rounded text-xs font-medium">
              {document.fileType.toUpperCase()}
            </div>
          </div>
        ) : (
          <div className="flex items-center mb-2 relative min-h-[60px] bg-gray-50 rounded-md p-3">
            <div className="mr-2 transform transition-transform duration-700 hover:scale-200">
              {getFileIcon()}
            </div>
            <div className="absolute bottom-1 right-1 bg-gray-700 text-white px-1.5 py-0.5 rounded text-xs font-medium">
              {document.fileType.toUpperCase()}
            </div>
          </div>
        )}

        <div className="flex-1">
          <h3 className="font-medium text-gray-800 truncate text-sm transition-colors duration-700 hover:text-[#0053A0]" title={document.title}>
            {document.title}
          </h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Calendar size={12} className="mr-1" /> 
            <span>{document.date}</span>
            <span className="mx-2">•</span>
            <span>{document.fileSize}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;