import React from 'react';
import { Document } from '../Common/DocumentCard';
import { Download, Eye, FileText, ChevronDown } from 'lucide-react';

interface DocumentListProps {
  documents: Document[];
}

const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  const [visibleCount, setVisibleCount] = React.useState(10);
  const [isLoading, setIsLoading] = React.useState(false);

  const visibleDocuments = documents.slice(0, visibleCount);
  const hasMore = visibleCount < documents.length;

  const loadMore = () => {
    setIsLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 10, documents.length));
      setIsLoading(false);
    }, 500);
  };

  const handleDocumentClick = (document: Document) => {
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

    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${document.title}</title>
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
    <div className="space-y-4">
      <div className="divide-y divide-gray-100">
        {visibleDocuments.map((document) => (
          <div 
            key={document.id} 
            className="py-2 flex items-center hover:bg-gray-50 hover:scale-[2] transition-all duration-700 px-2 -mx-2 rounded-md cursor-pointer hover:shadow-2xl hover:z-50 relative overflow-visible"
            onClick={() => handleDocumentClick(document)}
          >
            <div className="mr-3">
              <FileText size={20} className="text-[#0053A0] transform transition-transform duration-700 hover:scale-[3]" />
              <div className="text-xs text-center mt-0.5 text-gray-500 font-medium">
                {document.fileType.toUpperCase()}
              </div>
            </div>
            <div className="flex-1 min-w-0 mr-3">
              <h3 className="font-medium text-gray-800 truncate text-sm transition-colors duration-700 hover:text-[#0053A0]" title={document.title}>
                {document.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-0.5">
                <span className="flex items-center">
                  {document.date} • {document.fileSize}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            onClick={loadMore}
            disabled={isLoading}
            className="flex items-center px-6 py-3 bg-[#0053A0] text-white rounded-lg hover:bg-[#0076C8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Chargement...
              </>
            ) : (
              <>
                <ChevronDown size={20} className="mr-2" />
                Voir plus ({documents.length - visibleCount} restants)
              </>
            )}
          </button>
        </div>
      )}
      
      {!hasMore && documents.length > 10 && (
        <div className="text-center text-gray-500 text-sm pt-4">
          Tous les documents sont affichés ({documents.length} au total)
        </div>
      )}
    </div>
  );
};

export default DocumentList;