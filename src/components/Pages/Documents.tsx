import React, { useState } from 'react';
import { Grid2x2 as Grid, List, ChevronRight, ChevronDown, Folder, FolderOpen, Filter, Check } from 'lucide-react';
import DocumentList from '../Documents/DocumentList';
import DocumentGrid from '../Documents/DocumentGrid';
import { Document } from '../Common/DocumentCard';

interface DocumentFolder {
  id: string;
  name: string;
  type: 'folder' | 'subfolder';
  parentId?: string;
  documents: Document[];
  subfolders?: DocumentFolder[];
}

interface DocumentCategory {
  id: string;
  name: string;
  subcategories: Array<{
    id: string;
    name: string;
  }>;
  folders: DocumentFolder[];
}

const Documents: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string>('documents-internes');
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(['tous']);
  const [isSubcategoryDropdownOpen, setIsSubcategoryDropdownOpen] = useState<boolean>(false);

  const documentCategories: DocumentCategory[] = [
    {
      id: 'documents-internes',
      name: 'Documents internes',
      subcategories: [
        { id: 'tous', name: 'Tous les documents' },
        { id: 'rapports', name: 'Rapport d\'expertise' },
        { id: 'honoraires', name: 'Note d\'honoraire' },
        { id: 'courriers', name: 'Courriers' }
      ],
      folders: [
        {
          id: 'rapport-expertise',
          name: 'Rapports d\'expertise',
          type: 'folder',
          documents: [
            {
              id: 'doc7',
              title: 'Rapport d\'expertise',
              category: 'Rapport',
              date: '31/03/2025',
              fileType: 'pdf',
              fileSize: '3.2 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg',
              read: true
            },
            {
              id: 'doc8',
              title: 'Annule et remplace rapport d\'expertise',
              category: 'Rapport',
              date: '02/04/2025',
              fileType: 'pdf',
              fileSize: '3.5 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg',
              read: false
            },
            {
              id: 'doc8b',
              title: 'Rapport complémentaire',
              category: 'Rapport',
              date: '03/04/2025',
              fileType: 'pdf',
              fileSize: '2.1 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'doc8c',
              title: 'Synthèse expertise',
              category: 'Rapport',
              date: '04/04/2025',
              fileType: 'pdf',
              fileSize: '1.8 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'doc8d',
              title: 'Rapport technique détaillé',
              category: 'Rapport',
              date: '05/04/2025',
              fileType: 'pdf',
              fileSize: '4.2 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'doc8e',
              title: 'Conclusions d\'expertise',
              category: 'Rapport',
              date: '06/04/2025',
              fileType: 'pdf',
              fileSize: '2.8 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            }
          ]
        },
        {
          id: 'notes-honoraires',
          name: 'Notes d\'honoraires',
          type: 'folder',
          documents: [
            {
              id: 'doc9',
              title: 'Note d\'honoraire',
              category: 'Honoraire',
              date: '31/03/2025',
              fileType: 'pdf',
              fileSize: '0.8 MB',
              previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
            },
            {
              id: 'doc9b',
              title: 'Facture complémentaire',
              category: 'Honoraire',
              date: '02/04/2025',
              fileType: 'pdf',
              fileSize: '0.9 MB',
              previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
            },
            {
              id: 'doc9c',
              title: 'Note de frais',
              category: 'Honoraire',
              date: '03/04/2025',
              fileType: 'pdf',
              fileSize: '0.7 MB',
              previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
            }
          ]
        },
        {
          id: 'constatations',
          name: 'Constatations',
          type: 'folder',
          documents: [
            {
              id: 'const1',
              title: 'Conclusions techniques',
              category: 'Constatations',
              date: '31/03/2025',
              fileType: 'pdf',
              fileSize: '1.2 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'const2',
              title: 'EDA signé',
              category: 'Constatations',
              date: '20/03/2025',
              fileType: 'pdf',
              fileSize: '1.4 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            }
          ]
        }
      ]
    },
    {
      id: 'documents-externes',
      name: 'Documents externes',
      subcategories: [
        { id: 'tous', name: 'Tous les documents' },
        { id: 'sinistre', name: 'Documents de sinistre' },
        { id: 'devis-factures', name: 'Devis et factures' },
        { id: 'garantie', name: 'Documents de garantie' }
      ],
      folders: [
        {
          id: 'sinistre-docs',
          name: 'Documents de sinistre',
          type: 'folder',
          documents: [
            {
              id: 'sin1',
              title: 'Déclaration de sinistre',
              category: 'Sinistre',
              date: '15/03/2025',
              fileType: 'pdf',
              fileSize: '1.2 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'sin2',
              title: 'Constat amiable',
              category: 'Sinistre',
              date: '15/03/2025',
              fileType: 'pdf',
              fileSize: '1.8 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'sin3',
              title: 'Procès-verbal',
              category: 'Sinistre',
              date: '16/03/2025',
              fileType: 'pdf',
              fileSize: '1.4 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            },
            {
              id: 'sin4',
              title: 'Témoignages',
              category: 'Sinistre',
              date: '17/03/2025',
              fileType: 'pdf',
              fileSize: '0.9 MB',
              previewUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'
            },
            {
              id: 'sin5',
              title: 'Photos du lieu',
              category: 'Sinistre',
              date: '15/03/2025',
              fileType: 'pdf',
              fileSize: '3.2 MB',
              previewUrl: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg'
            }
          ]
        },
        {
          id: 'estimates-invoices',
          name: 'Devis et factures',
          type: 'folder',
          subfolders: [
            {
              id: 'garage-estimates',
              name: 'Devis garage',
              type: 'subfolder',
              parentId: 'estimates-invoices',
              documents: [
                {
                  id: 'doc10',
                  title: 'Devis initial garage',
                  category: 'Devis',
                  date: '29/03/2025',
                  fileType: 'pdf',
                  fileSize: '1.2 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc11',
                  title: 'Devis complémentaire garage',
                  category: 'Devis',
                  date: '01/04/2025',
                  fileType: 'pdf',
                  fileSize: '1.4 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc11b',
                  title: 'Devis pièces détachées',
                  category: 'Devis',
                  date: '02/04/2025',
                  fileType: 'pdf',
                  fileSize: '1.1 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc11c',
                  title: 'Devis main d\'œuvre',
                  category: 'Devis',
                  date: '03/04/2025',
                  fileType: 'pdf',
                  fileSize: '0.9 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                }
              ]
            },
            {
              id: 'invoices',
              name: 'Factures',
              type: 'subfolder',
              parentId: 'estimates-invoices',
              documents: [
                {
                  id: 'doc12',
                  title: 'Facture réparation',
                  category: 'Facture',
                  date: '05/04/2025',
                  fileType: 'pdf',
                  fileSize: '1.1 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc12b',
                  title: 'Facture pièces',
                  category: 'Facture',
                  date: '06/04/2025',
                  fileType: 'pdf',
                  fileSize: '0.8 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc12c',
                  title: 'Facture expertise',
                  category: 'Facture',
                  date: '07/04/2025',
                  fileType: 'pdf',
                  fileSize: '1.3 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc12d',
                  title: 'Facture transport',
                  category: 'Facture',
                  date: '08/04/2025',
                  fileType: 'pdf',
                  fileSize: '0.7 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                },
                {
                  id: 'doc12e',
                  title: 'Facture stockage',
                  category: 'Facture',
                  date: '09/04/2025',
                  fileType: 'pdf',
                  fileSize: '0.5 MB',
                  previewUrl: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg'
                }
              ]
            }
          ],
          documents: []
        },
        {
          id: 'garantie-docs',
          name: 'Documents de garantie',
          type: 'folder',
          documents: [
            {
              id: 'doc2',
              title: 'Certificat de garantie',
              category: 'Garantie',
              date: '28/03/2025',
              fileType: 'pdf',
              fileSize: '1.5 MB',
              previewUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg'
            },
            {
              id: 'doc3',
              title: 'Conditions de garantie',
              category: 'Garantie',
              date: '28/03/2025',
              fileType: 'pdf',
              fileSize: '0.8 MB',
              previewUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg'
            },
            {
              id: 'doc3b',
              title: 'Extension de garantie',
              category: 'Garantie',
              date: '28/03/2025',
              fileType: 'pdf',
              fileSize: '0.5 MB',
              previewUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'
            },
            {
              id: 'doc3c',
              title: 'Attestation de garantie',
              category: 'Garantie',
              date: '29/03/2025',
              fileType: 'pdf',
              fileSize: '0.7 MB',
              previewUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg'
            },
            {
              id: 'doc3d',
              title: 'Avenant garantie',
              category: 'Garantie',
              date: '31/03/2025',
              fileType: 'pdf',
              fileSize: '1.3 MB',
              previewUrl: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg'
            },
            {
              id: 'doc3e',
              title: 'Exclusions de garantie',
              category: 'Garantie',
              date: '01/04/2025',
              fileType: 'pdf',
              fileSize: '0.9 MB',
              previewUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg'
            }
          ]
        }
      ]
    },
    {
      id: 'photos',
      name: 'Photos',
      subcategories: [
        { id: 'tous', name: 'Toutes les photos' },
        { id: 'vehicule', name: 'Photos du véhicule' },
        { id: 'exterieures', name: 'Vues extérieures' },
        { id: 'dommages', name: 'Détails des dommages' }
      ],
      folders: [
        {
          id: 'vehicle-photos',
          name: 'Photos du véhicule',
          type: 'folder',
          subfolders: [
            {
              id: 'exterior-photos',
              name: 'Vues extérieures',
              type: 'subfolder',
              parentId: 'vehicle-photos',
              documents: [
                {
                  id: 'photo1',
                  title: 'Vue d\'ensemble avant',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.5 MB',
                  imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg'
                },
                {
                  id: 'photo2',
                  title: 'Vue latérale gauche',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.8 MB',
                  imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'
                },
                {
                  id: 'photo2b',
                  title: 'Vue latérale droite',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.6 MB',
                  imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
                },
                {
                  id: 'photo2c',
                  title: 'Vue arrière',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.9 MB',
                  imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
                },
                {
                  id: 'photo2d',
                  title: 'Vue intérieur',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.3 MB',
                  imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'
                },
                {
                  id: 'photo2e',
                  title: 'Vue tableau de bord',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.1 MB',
                  imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg'
                },
                {
                  id: 'photo2f',
                  title: 'Vue moteur',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.4 MB',
                  imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
                },
                {
                  id: 'photo2g',
                  title: 'Vue coffre',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.2 MB',
                  imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'
                }
              ]
            },
            {
              id: 'damage-photos',
              name: 'Détails des dommages',
              type: 'subfolder',
              parentId: 'vehicle-photos',
              documents: [
                {
                  id: 'photo3',
                  title: 'Détail impact avant',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.1 MB',
                  imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
                },
                {
                  id: 'photo4',
                  title: 'Détail impact latéral',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '1.8 MB',
                  imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg'
                },
                {
                  id: 'photo4b',
                  title: 'Détail rayure portière',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.0 MB',
                  imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'
                },
                {
                  id: 'photo4c',
                  title: 'Détail pare-chocs',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '1.9 MB',
                  imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
                },
                {
                  id: 'photo4d',
                  title: 'Détail capot',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '2.2 MB',
                  imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg'
                },
                {
                  id: 'photo4e',
                  title: 'Détail phare avant',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '1.7 MB',
                  imageUrl: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg'
                },
                {
                  id: 'photo4f',
                  title: 'Détail rétroviseur',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '1.6 MB',
                  imageUrl: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg'
                },
                {
                  id: 'photo4g',
                  title: 'Détail aile avant',
                  category: 'Photos',
                  date: '31/03/2025',
                  fileType: 'jpg',
                  fileSize: '1.9 MB',
                  imageUrl: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg'
                }
              ]
            }
          ],
          documents: []
        }
      ]
    }
  ];

  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  const selectFolder = (folderId: string) => {
    setSelectedFolder(folderId);
  };

  const handleSubcategoryChange = (subcategoryId: string) => {
    if (subcategoryId === 'tous') {
      setSelectedSubcategories(['tous']);
    } else {
      const newSelected = selectedSubcategories.includes('tous')
        ? [subcategoryId]
        : selectedSubcategories.includes(subcategoryId)
          ? selectedSubcategories.filter(s => s !== subcategoryId)
          : [...selectedSubcategories, subcategoryId];

      setSelectedSubcategories(newSelected.length === 0 ? ['tous'] : newSelected);
    }
    setSelectedFolder(null);
  };

  const getCurrentDocuments = (): Document[] => {
    const currentCategory = documentCategories.find(cat => cat.id === activeCategory);
    if (!currentCategory) return [];

    let documentsToFilter: Document[] = [];

    if (selectedSubcategories.includes('tous')) {
      currentCategory.folders.forEach(folder => {
        documentsToFilter.push(...folder.documents);
        if (folder.subfolders) {
          folder.subfolders.forEach(subfolder => {
            documentsToFilter.push(...subfolder.documents);
          });
        }
      });
    } else {
      selectedSubcategories.forEach(selectedSubcategory => {
        switch (activeCategory) {
          case 'documents-internes':
            if (selectedSubcategory === 'rapports') {
              const rapportsFolder = currentCategory.folders.find(f => f.id === 'rapport-expertise');
              if (rapportsFolder) documentsToFilter.push(...rapportsFolder.documents);
            } else if (selectedSubcategory === 'honoraires') {
              const honorairesFolder = currentCategory.folders.find(f => f.id === 'notes-honoraires');
              if (honorairesFolder) documentsToFilter.push(...honorairesFolder.documents);
            } else if (selectedSubcategory === 'constatations') {
              const constatationsFolder = currentCategory.folders.find(f => f.id === 'constatations');
              if (constatationsFolder) documentsToFilter.push(...constatationsFolder.documents);
            }
            break;
          case 'documents-externes':
            if (selectedSubcategory === 'sinistre') {
              const sinistreFolder = currentCategory.folders.find(f => f.id === 'sinistre-docs');
              if (sinistreFolder) documentsToFilter.push(...sinistreFolder.documents);
            } else if (selectedSubcategory === 'devis-factures') {
              const devisFolder = currentCategory.folders.find(f => f.id === 'estimates-invoices');
              if (devisFolder && devisFolder.subfolders) {
                devisFolder.subfolders.forEach(sf => documentsToFilter.push(...sf.documents));
              }
            } else if (selectedSubcategory === 'garantie') {
              const garantieFolder = currentCategory.folders.find(f => f.id === 'garantie-docs');
              if (garantieFolder) documentsToFilter.push(...garantieFolder.documents);
            }
            break;
          case 'photos':
            if (selectedSubcategory === 'vehicule') {
              const vehiculeFolder = currentCategory.folders.find(f => f.id === 'vehicle-photos');
              if (vehiculeFolder) {
                documentsToFilter.push(...vehiculeFolder.documents);
                if (vehiculeFolder.subfolders) {
                  vehiculeFolder.subfolders.forEach(sf => documentsToFilter.push(...sf.documents));
                }
              }
            } else if (selectedSubcategory === 'exterieures') {
              const vehiculeFolder = currentCategory.folders.find(f => f.id === 'vehicle-photos');
              if (vehiculeFolder && vehiculeFolder.subfolders) {
                const extFolder = vehiculeFolder.subfolders.find(sf => sf.id === 'exterior-photos');
                if (extFolder) documentsToFilter.push(...extFolder.documents);
              }
            } else if (selectedSubcategory === 'dommages') {
              const vehiculeFolder = currentCategory.folders.find(f => f.id === 'vehicle-photos');
              if (vehiculeFolder && vehiculeFolder.subfolders) {
                const damageFolder = vehiculeFolder.subfolders.find(sf => sf.id === 'damage-photos');
                if (damageFolder) documentsToFilter.push(...damageFolder.documents);
              }
            }
            break;
        }
      });
    }

    if (!selectedFolder) {
      return documentsToFilter;
    }

    const filteredByFolder = documentsToFilter.filter(doc => {
      for (const folder of currentCategory.folders) {
        if (folder.id === selectedFolder && folder.documents.includes(doc)) {
          return true;
        }
        if (folder.subfolders) {
          for (const subfolder of folder.subfolders) {
            if (subfolder.id === selectedFolder && subfolder.documents.includes(doc)) {
              return true;
            }
          }
        }
      }
      return false;
    });

    return filteredByFolder;
  };

  const getSubcategoryDocumentCount = (subcategoryId: string): number => {
    const currentCategory = documentCategories.find(cat => cat.id === activeCategory);
    if (!currentCategory) return 0;

    if (subcategoryId === 'tous') {
      return getCategoryDocumentCount(activeCategory);
    }

    let count = 0;
    switch (activeCategory) {
      case 'documents-internes':
        if (subcategoryId === 'rapports') {
          const rapportsFolder = currentCategory.folders.find(f => f.id === 'rapport-expertise');
          if (rapportsFolder) count = rapportsFolder.documents.length;
        } else if (subcategoryId === 'honoraires') {
          const honorairesFolder = currentCategory.folders.find(f => f.id === 'notes-honoraires');
          if (honorairesFolder) count = honorairesFolder.documents.length;
        } else if (subcategoryId === 'constatations') {
          const constatationsFolder = currentCategory.folders.find(f => f.id === 'constatations');
          if (constatationsFolder) count = constatationsFolder.documents.length;
        }
        break;
      case 'documents-externes':
        if (subcategoryId === 'sinistre') {
          const sinistreFolder = currentCategory.folders.find(f => f.id === 'sinistre-docs');
          if (sinistreFolder) count = sinistreFolder.documents.length;
        } else if (subcategoryId === 'devis-factures') {
          const devisFolder = currentCategory.folders.find(f => f.id === 'estimates-invoices');
          if (devisFolder && devisFolder.subfolders) {
            count = devisFolder.subfolders.reduce((acc, sf) => acc + sf.documents.length, 0);
          }
        } else if (subcategoryId === 'garantie') {
          const garantieFolder = currentCategory.folders.find(f => f.id === 'garantie-docs');
          if (garantieFolder) count = garantieFolder.documents.length;
        }
        break;
      case 'photos':
        if (subcategoryId === 'vehicule') {
          const vehiculeFolder = currentCategory.folders.find(f => f.id === 'vehicle-photos');
          if (vehiculeFolder && vehiculeFolder.subfolders) {
            count = vehiculeFolder.subfolders.reduce((acc, sf) => acc + sf.documents.length, 0);
          }
        } else if (subcategoryId === 'exterieures') {
          const vehiculeFolder = currentCategory.folders.find(f => f.id === 'vehicle-photos');
          if (vehiculeFolder && vehiculeFolder.subfolders) {
            const extFolder = vehiculeFolder.subfolders.find(sf => sf.id === 'exterior-photos');
            if (extFolder) count = extFolder.documents.length;
          }
        } else if (subcategoryId === 'dommages') {
          const vehiculeFolder = currentCategory.folders.find(f => f.id === 'vehicle-photos');
          if (vehiculeFolder && vehiculeFolder.subfolders) {
            const damageFolder = vehiculeFolder.subfolders.find(sf => sf.id === 'damage-photos');
            if (damageFolder) count = damageFolder.documents.length;
          }
        }
        break;
    }
    return count;
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedFolder(null);
    setSelectedSubcategories(['tous']);
  };

  const getCurrentCategory = () => {
    return documentCategories.find(cat => cat.id === activeCategory);
  };

  const getCurrentDocuments_old = (): Document[] => {
    const currentCategory = documentCategories.find(cat => cat.id === activeCategory);
    if (!currentCategory) return [];

    if (!selectedFolder) {
      // Return all documents from all folders in the category
      const allDocs: Document[] = [];
      currentCategory.folders.forEach(folder => {
        allDocs.push(...folder.documents);
        if (folder.subfolders) {
          folder.subfolders.forEach(subfolder => {
            allDocs.push(...subfolder.documents);
          });
        }
      });
      return allDocs;
    }

    // Find the selected folder and return its documents
    for (const folder of currentCategory.folders) {
      if (folder.id === selectedFolder) {
        return folder.documents;
      }
      if (folder.subfolders) {
        const subfolder = folder.subfolders.find(sf => sf.id === selectedFolder);
        if (subfolder) {
          return subfolder.documents;
        }
      }
    }
    return [];
  };

  const getCategoryDocumentCount = (categoryId: string): number => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    if (!category) return 0;

    let count = 0;
    category.folders.forEach(folder => {
      count += folder.documents.length;
      if (folder.subfolders) {
        folder.subfolders.forEach(subfolder => {
          count += subfolder.documents.length;
        });
      }
    });
    return count;
  };
  const renderFolder = (folder: DocumentFolder, level: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = selectedFolder === folder.id;
    const hasSubfolders = folder.subfolders && folder.subfolders.length > 0;
    const totalDocs = folder.documents.length + (folder.subfolders?.reduce((acc, sf) => acc + sf.documents.length, 0) || 0);

    return (
      <div key={folder.id} className={`${level > 0 ? 'ml-4' : ''}`}>
        <div 
          className={`flex items-center py-2 px-3 rounded-md cursor-pointer hover:bg-gray-100 ${
            isSelected ? 'bg-[#FFB800] text-[#0053A0]' : ''
          }`}
          onClick={() => {
            if (hasSubfolders) {
              toggleFolder(folder.id);
            }
            selectFolder(folder.id);
          }}
        >
          {hasSubfolders && (
            <div className="mr-2">
              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
          )}
          <div className="mr-2">
            {isExpanded ? <FolderOpen size={16} /> : <Folder size={16} />}
          </div>
          <span className="flex-1 text-sm font-medium">{folder.name}</span>
          <span className="text-xs text-gray-500 ml-2">({totalDocs})</span>
        </div>
        
        {hasSubfolders && isExpanded && folder.subfolders && (
          <div className="ml-4">
            {folder.subfolders.map(subfolder => renderFolder(subfolder, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Bibliothèque</h1>
        <p className="text-gray-500">Dossier XXXXXXXXXX</p>
      </div>

      {/* Category Tabs - Horizontal */}
      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto">
          {documentCategories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
                ${activeCategory === category.id
                  ? 'bg-[#0053A0] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category.name} ({getCategoryDocumentCount(category.id)})
            </button>
          ))}
        </div>
      </div>

      {/* Filtres */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtres :</span>
          </div>

          {/* Filtre Sous-catégories */}
          <div className="relative">
            <button
              onClick={() => setIsSubcategoryDropdownOpen(!isSubcategoryDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors min-w-[200px]"
            >
              <span>
                {selectedSubcategories.includes('tous')
                  ? 'Tous les documents'
                  : selectedSubcategories.length === 1
                    ? getCurrentCategory()?.subcategories.find(s => s.id === selectedSubcategories[0])?.name
                    : `${selectedSubcategories.length} sous-catégories sélectionnées`
                }
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isSubcategoryDropdownOpen && getCurrentCategory() && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2">
                {getCurrentCategory()!.subcategories.map(subcategory => (
                  <label
                    key={subcategory.id}
                    className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedSubcategories.includes(subcategory.id)}
                        onChange={() => handleSubcategoryChange(subcategory.id)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        selectedSubcategories.includes(subcategory.id)
                          ? 'bg-blue-500 border-blue-500'
                          : 'border-gray-300'
                      }`}>
                        {selectedSubcategories.includes(subcategory.id) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700">{subcategory.name} ({getSubcategoryDocumentCount(subcategory.id)})</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Compteur de résultats */}
          <div className="text-sm text-gray-500">
            {getCurrentDocuments().length} document{getCurrentDocuments().length > 1 ? 's' : ''} trouvé{getCurrentDocuments().length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                {getCurrentDocuments().length} document(s)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                  title="Vue grille"
                >
                  <Grid size={16} className="text-gray-500" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}
                  title="Vue liste"
                >
                  <List size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div className="p-4">
          {getCurrentDocuments().length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun document trouvé dans cette section.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <DocumentGrid documents={getCurrentDocuments()} />
          ) : (
            <DocumentList documents={getCurrentDocuments()} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Documents;