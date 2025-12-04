import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProgressTracker from '../Common/ProgressTracker';
import PdfPreview from '../Common/PdfPreview';
import PdfIcon from '../Common/PdfIcon';
import { ChevronDown, ChevronUp, ArrowLeft, FileText, Car, Calendar, MapPin, AlertTriangle, Banknote, Shield, PenTool as Tool, Eye, CheckCircle2, Clock, XCircle, User, Mail, Phone, Receipt, Calculator, Wrench, MessageSquare } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [sections, setSections] = useState({
    constatations: true,
    mission: true,
    rapport: true,
    suivi: true,
    suiviReparation: true
  });
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const progressSteps = [
    { id: 1, label: 'Mission', completed: true, sectionId: 'mission' },
    { id: 2, label: 'RDV', completed: true },
    { id: 3, label: 'Constatation', completed: true },
    { id: 4, label: 'Rapport', completed: true, sectionId: 'rapport' },
    { id: 5, label: 'Suivi', completed: false, current: true, sectionId: 'suivi-reparation-section' },
  ];

  // Issue du dossier : Perte totale
  const issueType = "Perte totale";

  const constatationsInfo = {
    chiffrage: "XX XXX,XX € HT",
    dateConclusion: "31/03/2025",
    sinistreConstante: "CTR / CTP",
    montantExpertise: "XX XXX,XX € HT",
    chargeAssuree: "XXX€",
    chargeAssureur: "X XXX,XX€ HT",
    vetustee: "Non renseigné",
    accordReglementDirect: "accordé",
    montantFranchise: "XXX € TTC",
    dommagesImputables: [
      "Pare-chocs avant",
      "Capot",
      "Aile avant gauche"
    ],
    dommagesNonImputables: [
      "Rayures portière arrière droite",
      "Impact pare-brise"
    ]
  };

  const InfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div>
      <div className="flex items-center mb-1">
        {icon}
        <span className="text-sm text-gray-500 ml-2">{label}</span>
      </div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );

  const missionInfo = {
    dateCreation: "15/03/2025",
    societe: "Pacifica",
    sinistre: {
      nature: "Accident",
      circonstances: "en stationnement",
      degats: "Dommages avant",
      garanties: [
        {
          type: "Tous risques",
          franchise: "500 € TTC"
        }
      ],
      priseEnCharge: "OUI"
    },
    vehicule: {
      type: "Véhicule particulier",
      marque: "Marque",
      modele: "3008",
      immatriculation: "XX-XXX-XX"
    },
    examen: {
      date: "22/03/2025",
      type: "Expertise terrain"
    },
    lieu: {
      nom: "Nom du Garage",
      adresse: "Adresse du garage",
      codePostal: "XXXXX",
      ville: "Ville"
    }
  };

  const scrollToSection = (sectionId: string) => {
    // Ouvrir la section si elle est fermée
    if (sectionId === 'mission' && !sections.mission) {
      setSections(prev => ({ ...prev, mission: true }));
    } else if (sectionId === 'rapport' && !sections.rapport) {
      setSections(prev => ({ ...prev, rapport: true }));
    } else if (sectionId === 'suivi-reparation-section' && !sections.suiviReparation) {
      setSections(prev => ({ ...prev, suiviReparation: true }));
    }

    // Attendre que la section soit ouverte avant de scroller
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const suiviReparationInfo = {
    issue: {
      type: "Perte totale",
      statut: "VE",
      dateDeclaration: "10/09/2025"
    },
    historique: [
      {
        id: 1,
        date: "10/09/2025",
        evenement: "VE déclaré - Envoi des documents de cession à l'assuré et envoi d'un bon d'enlèvement"
      },
      {
        id: 2,
        date: "28/09/2025",
        evenement: "Enlèvement réalisé - Frais de gardiennage : 250 € HT"
      },
      {
        id: 3,
        date: "02/10/2025",
        evenement: "Réception des documents de cession"
      }
    ]
  };

  const suiviInfo = {
    statut: "En attente de complément d'informations",
    motifAttente: "Devis complémentaire requis",
    themes: [
      {
        id: 'courrier',
        titre: 'Courriers',
        statut: 'en_attente',
        description: 'Courrier de demande de devis complémentaire envoyé le 28/03/2025',
        dateAction: '28/03/2025',
        icon: 'Mail'
      },
      {
        id: 'appels',
        titre: 'Appels téléphoniques',
        statut: 'termine',
        description: 'Contact établi avec le réparateur - RDV confirmé',
        dateAction: '30/03/2025',
        icon: 'Phone'
      },
      {
        id: 'facturation',
        titre: 'Facturation',
        statut: 'en_attente',
        description: 'En attente de la facture définitive du réparateur',
        dateAction: 'Prévu le 05/04/2025',
        icon: 'Receipt'
      },
      {
        id: 'devis',
        titre: 'Devis complémentaires',
        statut: 'en_cours',
        description: 'Devis pour pièces spécifiques en cours d\'établissement',
        dateAction: '31/03/2025',
        icon: 'Calculator'
      },
      {
        id: 'travaux',
        titre: 'Complément de travaux',
        statut: 'en_attente',
        description: 'Validation des travaux supplémentaires nécessaires',
        dateAction: 'En attente',
        icon: 'Wrench'
      },
      {
        id: 'reclamation',
        titre: 'Réclamations',
        statut: 'aucune',
        description: 'Aucune réclamation en cours',
        dateAction: '-',
        icon: 'AlertCircle'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3 md:p-6">
        <div className="mb-4 md:mb-6">
          <Link 
            to="/dossiers"
            className="inline-flex items-center text-[#0053A0] hover:text-[#0076C8] mb-4 group"
          >
            <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Retour aux dossiers
          </Link>
        </div>
        <div className="space-y-3 md:space-y-4">

          {/* Avancement du dossier - Au centre */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-[#0053A0] to-[#0076C8] p-3">
              <button
                onClick={() => toggleSection('suivi')}
                className="w-full flex items-center justify-between hover:opacity-90 transition-opacity"
              >
                <div className="flex-1"></div>
                <h2 className="text-base md:text-lg font-semibold text-white tracking-normal">AVANCEMENT DU DOSSIER</h2>
                <div className="flex-1 flex justify-end">
                  {sections.suivi ? <ChevronUp size={20} className="text-white" /> : <ChevronDown size={20} className="text-white" />}
                </div>
              </button>
            </div>
            
            {sections.suivi && (
              <div className="p-6 space-y-6">
                {/* Timeline horizontale */}
                <div className="relative bg-white p-6 rounded-lg shadow-sm">
                  {/* Ligne de connexion horizontale */}
                  <div className="absolute top-12 left-12 right-12 h-1 bg-gray-300 rounded-full"></div>
                  
                  {/* Ligne de progression verte pour les étapes terminées */}
                  <div className="absolute top-12 left-12 h-1 bg-green-500 rounded-full" style={{ width: '80%' }}></div>
                  
                  <div className="flex justify-between items-start relative z-10 px-6">
                    {/* Étape 1: Ordre de mission - Terminée */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <button
                        onClick={() => scrollToSection('mission')}
                        className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-3 hover:border-[#0053A0] transition-colors cursor-pointer"
                      >
                        <CheckCircle2 size={16} className="text-green-500" />
                      </button>
                      <div className="text-center">
                        <button
                          onClick={() => scrollToSection('mission')}
                          className="hover:underline cursor-pointer"
                        >
                          <h4 className="font-semibold text-gray-900 text-sm">Ordre de mission</h4>
                        </button>
                        <p className="text-xs text-gray-500 mt-1">+ PEC</p>
                      </div>
                    </div>

                    {/* Étape 2: Expertise terrain - Terminée */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-3">
                        <CheckCircle2 size={16} className="text-green-500" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 text-sm">EAD</h4>
                      </div>
                    </div>

                    {/* Étape 3: Examen - Terminée */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-3">
                        <CheckCircle2 size={16} className="text-green-500" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 text-sm">Examen</h4>
                      </div>
                    </div>

                    {/* Étape 4: Issue - Terminée */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-3">
                        <CheckCircle2 size={16} className="text-green-500" />
                      </div>
                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 text-sm">Issue</h4>
                      </div>
                    </div>

                    {/* Étape 5: Suivi - Terminée */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <button
                        onClick={() => scrollToSection('suivi-reparation-section')}
                        className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-3 hover:border-[#0053A0] transition-colors cursor-pointer"
                      >
                        <CheckCircle2 size={16} className="text-green-500" />
                      </button>
                      <div className="text-center">
                        <button
                          onClick={() => scrollToSection('suivi-reparation-section')}
                          className="hover:underline cursor-pointer"
                        >
                          <h4 className="font-semibold text-gray-900 text-sm">Suivi</h4>
                        </button>
                      </div>
                    </div>

                    {/* Étape 6: Rapport d'expertise - À venir */}
                    <div className="flex flex-col items-center max-w-[120px]">
                      <button
                        onClick={() => scrollToSection('rapport')}
                        className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center mb-3 hover:border-[#0053A0] transition-colors cursor-pointer"
                      >
                        <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                      </button>
                      <div className="text-center">
                        <button
                          onClick={() => scrollToSection('rapport')}
                          className="hover:underline cursor-pointer"
                        >
                          <h4 className="font-semibold text-gray-900 text-sm">Rapport d'expertise</h4>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suivi */}
          <div id="suivi-reparation-section" className="bg-white rounded-lg overflow-hidden border-2 border-[#087F23]">
            <button
              onClick={() => toggleSection('suiviReparation')}
              className="w-full p-4 md:p-5 flex items-center justify-center relative hover:bg-gray-50 transition-colors bg-gradient-to-r from-gray-50 to-gray-100"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#0053A0] tracking-wide">SUIVI</h2>
              <span className="absolute right-3 md:right-4">
                {sections.suiviReparation ? <ChevronUp size={22} className="text-[#0053A0]" /> : <ChevronDown size={22} className="text-[#0053A0]" />}
              </span>
            </button>

            {sections.suiviReparation && (
              <div className="p-4 md:p-6 pt-2 space-y-3">
                {[...suiviReparationInfo.historique].reverse().map((item) => (
                  <div key={item.id} className="border-l-4 border-[#0053A0] bg-gray-50 rounded-r-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center text-[#0053A0] mt-0.5">
                        <Calendar size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-semibold text-[#0053A0]">Le {item.date}</span>
                        </div>
                        <p className={`text-sm ${item.evenement.includes('Frais de gardiennage') ? 'text-green-600 font-medium' : 'text-gray-700'}`}>{item.evenement}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Rapport */}
          <div id="rapport" className="bg-white rounded-lg overflow-hidden border-2 border-[#087F23]">
            <button
              onClick={() => toggleSection('rapport')}
              className="w-full p-4 md:p-5 flex items-center justify-center relative hover:bg-gray-50 transition-colors bg-gradient-to-r from-gray-50 to-gray-100"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#0053A0] tracking-wide">RAPPORT</h2>
              <span className="absolute right-3 md:right-4">
                {sections.rapport ? <ChevronUp size={22} className="text-[#0053A0]" /> : <ChevronDown size={22} className="text-[#0053A0]" />}
              </span>
            </button>
            
            {sections.rapport && (
              <div className="p-4 md:p-6 pt-2 space-y-6">
                {/* En-tête avec documents PJ à droite */}
                <div className="border-b border-gray-100 pb-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium text-gray-800">Rapport d'expertise</h3>
                        </div>
                        <div className="ml-6">
                          <div>
                            <div className="flex items-center mb-1">
                              <Banknote className="text-[#0053A0]" size={18} />
                              <span className="text-sm text-gray-500 ml-2">Montant d'expertise</span>
                            </div>
                            <div className="text-sm font-medium">XX XXX,XX € HT</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          Rapport d'expertise
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium text-gray-800">Rapport Annule et Remplace</h3>
                        </div>
                        <div className="ml-6">
                          <div>
                            <div className="flex items-center mb-1">
                              <Banknote className="text-[#0053A0]" size={18} />
                              <span className="text-sm text-gray-500 ml-2">Montant d'expertise</span>
                            </div>
                            <div className="text-sm font-medium">XX XXX,XX € HT</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          Rapport Annule et Remplace
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium text-gray-800">NH</h3>
                        </div>
                        <div className="ml-6">
                          <div>
                            <div className="flex items-center mb-1">
                              <Banknote className="text-[#0053A0]" size={18} />
                              <span className="text-sm text-gray-500 ml-2">Montant de la note d'honoraire</span>
                            </div>
                            <div className="text-sm font-medium">XXX,XX€ HT</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          Note d'honoraire
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Constatations */}
          <div className="bg-white rounded-lg overflow-hidden border-2 border-[#087F23]">
            <button
              onClick={() => toggleSection('constatations')}
              className="w-full p-4 md:p-5 flex items-center justify-center relative hover:bg-gray-50 transition-colors bg-gradient-to-r from-gray-50 to-gray-100"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#0053A0] tracking-wide">CONSTATATIONS</h2>
              <span className="absolute right-3 md:right-4">
                {sections.constatations ? <ChevronUp size={22} className="text-[#0053A0]" /> : <ChevronDown size={22} className="text-[#0053A0]" />}
              </span>
            </button>
            
            {sections.constatations && (
              <div className="p-4 md:p-6 pt-2 space-y-4 md:space-y-6">
                {/* En-tête avec documents PJ à droite */}
                <div className="border-b border-gray-100 pb-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Calendar className="text-[#0053A0]" size={18} />
                          <span className="text-sm text-gray-500 ml-2">31/03/2025 Conclusions de l'expert</span>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          Conclusions techniques
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <Calendar className="text-[#0053A0]" size={18} />
                          <span className="text-sm text-gray-500 ml-2">20/03/2025 Évaluation des dommages</span>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          EDA signé
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center mb-1">
                          <AlertTriangle className="text-[#0053A0]" size={18} />
                          <span className="text-sm text-gray-500 ml-2">Sinistre constaté</span>
                        </div>
                        <div className="text-sm font-medium">En stationnement</div>
                      </div>
                      <div>
                        <div className="flex items-center mb-1">
                          <MapPin className="text-[#0053A0]" size={18} />
                          <span className="text-sm text-gray-500 ml-2">Lieu d'expertise</span>
                        </div>
                        <div className="text-sm font-medium">
                          <p>Nom du Garage</p>
                          <p>Adresse du garage</p>
                          <p>XXXXX Ville</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <InfoItem 
                    icon={<Banknote className="text-[#0053A0]" size={18} />}
                    label="Montant de l'expertise"
                    value={constatationsInfo.montantExpertise}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <User className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">À charge assuré</span>
                      </div>
                      <div className="text-sm font-medium">XXX€ TTC</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <Shield className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">À charge assureur</span>
                      </div>
                      <div className="text-sm font-medium">{constatationsInfo.chargeAssureur}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <Clock className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Vétusté</span>
                      </div>
                      <div className="text-sm font-medium">{constatationsInfo.vetustee}</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <CheckCircle2 className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Accord règlement direct</span>
                      </div>
                      <div className="text-sm font-medium">{constatationsInfo.accordReglementDirect}</div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <Banknote className="text-[#0053A0]" size={18} />
                      <span className="text-sm text-gray-500 ml-2">Montant franchise</span>
                    </div>
                    <div className="text-sm font-medium">{constatationsInfo.montantFranchise}</div>
                  </div>
                </div>
                  {/* Points de chocs */}
                  <div className="border-t border-gray-100 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center mb-3">
                          <CheckCircle2 size={18} className="text-green-600 mr-2" />
                          <h3 className="font-medium text-sm md:text-base">Points de chocs imputables</h3>
                        </div>
                        <div className="pl-6 space-y-1">
                          {constatationsInfo.dommagesImputables.map((dommage, index) => (
                            <p key={index} className="text-sm text-gray-700">• {dommage}</p>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center mb-3">
                          <AlertTriangle size={18} className="text-red-600 mr-2" />
                          <h3 className="font-medium text-sm md:text-base">Points de chocs non imputables</h3>
                        </div>
                        <div className="pl-6 space-y-1">
                          {constatationsInfo.dommagesNonImputables.map((dommage, index) => (
                            <p key={index} className="text-sm text-gray-700">• {dommage}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            )}
          </div>

          {/* Mission */}
          <div id="mission" className="bg-white rounded-lg overflow-hidden border-2 border-[#087F23]">
            <button
              onClick={() => toggleSection('mission')}
              className="w-full p-4 md:p-5 flex items-center justify-center relative hover:bg-gray-50 transition-colors bg-gradient-to-r from-gray-50 to-gray-100"
            >
              <h2 className="text-lg md:text-xl font-bold text-[#0053A0] tracking-wide">MISSION</h2>
              <span className="absolute right-3 md:right-4">
                {sections.mission ? <ChevronUp size={22} className="text-[#0053A0]" /> : <ChevronDown size={22} className="text-[#0053A0]" />}
              </span>
            </button>
            
            {sections.mission && (
              <div className="p-4 md:p-6 pt-2 space-y-4 md:space-y-6">
                {/* En-tête Mission */}
                <div className="border-b border-gray-100 pb-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="flex items-center mb-1">
                              <Calendar className="text-[#0053A0]" size={18} />
                              <span className="text-sm text-gray-500 ml-2">Date de création</span>
                            </div>
                            <div className="text-sm font-medium">{missionInfo.dateCreation}</div>
                          </div>
                          <div>
                            <div className="flex items-center mb-1">
                              <Shield className="text-[#0053A0]" size={18} />
                              <span className="text-sm text-gray-500 ml-2">Société</span>
                            </div>
                            <div className="text-sm font-medium">{missionInfo.societe}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          Ordre de mission
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end items-center">
                      <div className="flex items-center ml-4">
                        <div className="mr-2">
                          <PdfIcon size={16} />
                        </div>
                        <button className="text-[#0053A0] hover:text-[#0076C8] text-sm font-medium underline">
                          Règlement direct
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sinistre */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-[#0053A0] text-sm md:text-base">Sinistre</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <AlertTriangle className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Nature</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.sinistre.nature}</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <MapPin className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Circonstances</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.sinistre.circonstances}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <Tool className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Dégâts</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.sinistre.degats}</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <CheckCircle2 className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Prise en charge</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.sinistre.priseEnCharge}</div>
                    </div>
                  </div>
                  
                  {/* Garanties */}
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm mb-2">Garanties</h4>
                    {missionInfo.sinistre.garanties.map((garantie, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <span className="text-sm text-gray-600">Type: <span className="font-medium text-gray-900">{garantie.type}</span></span>
                          <span className="text-sm text-gray-600">Franchise: <span className="font-medium text-gray-900">{garantie.franchise}</span></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Véhicule */}
                <div className="border-t border-gray-100 pt-4 space-y-4">
                  <h3 className="font-semibold text-[#0053A0] text-sm md:text-base">Véhicule</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <Car className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Type</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.vehicule.type}</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <Car className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Marque</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.vehicule.marque}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <Car className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Modèle</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.vehicule.modele}</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <Receipt className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Immatriculation</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.vehicule.immatriculation}</div>
                    </div>
                  </div>
                </div>

                {/* Examen */}
                <div className="border-t border-gray-100 pt-4 space-y-4">
                  <h3 className="font-semibold text-[#0053A0] text-sm md:text-base">Examen</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center mb-1">
                        <Calendar className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Date</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.examen.date}</div>
                    </div>
                    <div>
                      <div className="flex items-center mb-1">
                        <Eye className="text-[#0053A0]" size={18} />
                        <span className="text-sm text-gray-500 ml-2">Type</span>
                      </div>
                      <div className="text-sm font-medium">{missionInfo.examen.type}</div>
                    </div>
                  </div>
                </div>

                {/* Lieu */}
                <div className="border-t border-gray-100 pt-4">
                  <h3 className="font-semibold text-[#0053A0] text-sm md:text-base mb-3">Lieu d'expertise</h3>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-900">{missionInfo.lieu.nom}</p>
                      <p className="text-sm text-gray-700">{missionInfo.lieu.adresse}</p>
                      <p className="text-sm text-gray-700">{missionInfo.lieu.codePostal} {missionInfo.lieu.ville}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;