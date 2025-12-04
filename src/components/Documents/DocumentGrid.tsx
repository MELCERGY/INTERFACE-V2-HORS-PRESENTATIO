import React from 'react';
import { ChevronDown } from 'lucide-react';
import DocumentCard, { Document } from '../Common/DocumentCard';

interface DocumentGridProps {
  documents: Document[];
}

const DocumentGrid: React.FC<DocumentGridProps> = ({ documents }) => {
  const [visibleCount, setVisibleCount] = React.useState(8);
  const [isLoading, setIsLoading] = React.useState(false);

  const visibleDocuments = documents.slice(0, visibleCount);
  const hasMore = visibleCount < documents.length;

  const loadMore = () => {
    setIsLoading(true);
    // Simuler un délai de chargement
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + 8, documents.length));
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 overflow-visible">
        {visibleDocuments.map((document) => (
          <DocumentCard key={document.id} document={document} />
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
      
      {!hasMore && documents.length > 8 && (
        <div className="text-center text-gray-500 text-sm pt-4">
          Tous les documents sont affichés ({documents.length} au total)
        </div>
      )}
    </div>
  );
};

export default DocumentGrid;