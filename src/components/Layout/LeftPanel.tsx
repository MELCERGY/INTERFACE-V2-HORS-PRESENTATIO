import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HelpCircle, ChevronDown, ChevronUp, FolderOpen, Search } from 'lucide-react';
import VehicleDiagram from '../Common/VehicleDiagram';

interface LeftPanelProps {
  collapsed: boolean;
}

const LeftPanel: React.FC<LeftPanelProps> = ({ collapsed }) => {
  const [sections, setSections] = useState({
    reference: true,
    sinistre: true,
    important: true,
    diagram: true,
    faq: false
  });
  const [faqSearchTerm, setFaqSearchTerm] = useState('');

  const toggleSection = (section: keyof typeof sections) => {
    setSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const faqItems = [
    {
      question: "Temps de traitement",
      answer: "Délai calculé depuis l'enregistrement de l'Ordre de Mission (OM) jusqu'au dépôt du rapport d'expertise."
    },
    {
      question: "Éléments en attente",
      answer: "Informations ou documents nécessaires pour poursuivre le traitement du dossier. Ces éléments bloquent actuellement la progression de votre dossier."
    },
    {
      question: "Montant d'expertise",
      answer: "Estimation du coût de remise en état du véhicule suite au sinistre, déterminée par l'expert."
    },
    {
      question: "VRADE",
      answer: "Valeur de Remplacement À Dire d'Expert - Estimation de la valeur du véhicule établie par l'expert pour déterminer le montant de remplacement."
    },
    {
      question: "VE",
      answer: "Véhicule Endommagé - Statut indiquant que le véhicule n'est pas autorisé à circuler tant que les réparations n'ont pas été effectuées et validées par un expert conformément aux règles de l'art de l'expertise automobile."
    },
    {
      question: "Croquis",
      answer: "Représentation visuelle des points d'impact identifiés lors de l'expertise. L'intensité des dommages est indiquée par un code couleur : jaune (impact faible), orange (impact moyen), rouge (impact fort)."
    },
    {
      question: "Avancement du dossier",
      answer: "Visualisation de l'état d'avancement de votre dossier à travers les différentes étapes : Ordre de Mission (intégration du flux chez BCA), Moyen d'expertise (affichage du mode d'expertise prévu et date planifiée), Examen du véhicule (date à venir ou validée si rendez-vous honoré), Issue (déterminée ou en cours), Suivi (détails disponibles dans la section dédiée), Rapport d'expertise (mission terminée).",
      link: "/",
      linkText: "Tableau de bord"
    },
    {
      question: "OM (Ordre de Mission)",
      answer: "Les informations relatives à l'Ordre de Mission sont mises à jour en temps réel selon les données enregistrées dans notre système informatique."
    },
    {
      question: "Constatations",
      answer: "Détails techniques des observations effectuées par l'expert lors de l'examen du véhicule."
    },
    {
      question: "Rapport",
      answer: "Section regroupant les informations relatives au dépôt du rapport d'expertise, à la note d'honoraire, ainsi qu'aux éventuels rapports annulés et remplacés."
    },
    {
      question: "Suivi",
      answer: "Informations détaillées communiquées dès lors que l'issue du dossier est déterminée. Le contenu varie selon la nature de l'issue (réparation, perte totale, etc.)."
    },
    {
      question: "Tableau de bord",
      answer: "Page principale d'un dossier, affichée par défaut lors de l'accès à l'interface. Elle présente une vue d'ensemble des informations essentielles.",
      link: "/",
      linkText: "Tableau de bord"
    },
    {
      question: "Communication",
      answer: "Historique complet des échanges entre BCA Expertise et les acteurs externes du dossier (courriers entrants, sortants, etc.).",
      link: "/communication",
      linkText: "Communication"
    },
    {
      question: "BCA Messages",
      answer: "Messagerie dédiée aux échanges directs entre BCA Expertise et l'utilisateur connecté sur l'interface.",
      link: "/messages",
      linkText: "Messages"
    },
    {
      question: "Bibliothèque",
      answer: "Espace de consultation des documents organisés en trois catégories : documents générés par BCA Expertise, documents transmis par les utilisateurs externes, et photographies du dossier.",
      link: "/documents",
      linkText: "Documents"
    },
    {
      question: "Contacts",
      answer: "Répertoire des coordonnées de l'ensemble des intervenants et acteurs impliqués dans le traitement du dossier."
    }
  ];

  const filteredFaqItems = faqItems.filter(item => {
    const searchLower = faqSearchTerm.toLowerCase();
    return (
      item.question.toLowerCase().includes(searchLower) ||
      item.answer.toLowerCase().includes(searchLower)
    );
  });

  if (collapsed) {
    return (
      <div className="h-full flex flex-col bg-white">
        {/* Spacer */}
        <div className="flex-1" />

        {/* Help */}
        <div className="flex-none px-2 py-4 space-y-1">
          <NavLink
            to="/help"
            className={({ isActive }) => `
              flex items-center px-2 py-2 rounded-md transition-all duration-200
              ${isActive ? 'bg-[#FFB800] text-[#0053A0]' : 'text-gray-600 hover:bg-gray-100'}
              justify-center
            `}
          >
            <HelpCircle size={20} />
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      {/* Référence BCA et Statuts */}
      <div className="flex-none border-b border-gray-200 py-6">
        <div className="p-3">
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs">Référence BCA :</span>
              <span className="text-sm font-bold text-[#0053A0]">XXXXXXXX</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">Issue du dossier :</span>
                <span className="font-medium text-gray-900 text-xs">Perte totale + VE</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">État :</span>
                <span className="font-medium text-green-600 text-xs">Ouvert</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-xs">Temps de traitement :</span>
                <span className="font-medium text-gray-700 text-xs">13 jours</span>
              </div>
            </div>
          </div>
          
          {/* Bloc En attente de */}
          <div className="bg-yellow-50 border-2 border-red-500 rounded-lg p-3 mt-3">
            <div className="text-center">
              <span className="text-yellow-700 text-xs font-medium">Élément(s) en attente :</span>
              <div className="font-bold text-yellow-800 text-sm mt-1">
                Facture de gardiennage
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Dossier */}
      <div className="flex-none border-b border-gray-200 py-3">
        <div className="px-3">
          <button 
            onClick={() => toggleSection('sinistre')}
            className="w-full py-2 px-3 flex items-center justify-between bg-[#FFB800] hover:bg-[#FFD700] transition-colors rounded-lg"
          >
            <div className="flex items-center">
              <FolderOpen size={16} className="text-[#0053A0] mr-2" />
              <h3 className="text-[#0053A0] text-sm">Dossier</h3>
            </div>
            {sections.sinistre ? <ChevronUp size={16} className="text-[#0053A0]" /> : <ChevronDown size={16} className="text-[#0053A0]" />}
          </button>
        </div>
        {sections.sinistre && (
          <div className="px-3 pt-3 space-y-2 bg-gray-50 mt-2 mx-3 rounded-lg">
            <InfoRow label="Numéro de sinistre :" value="XXXXXXXXXXXX" />
            <InfoRow label="Date de sinistre :" value="15/03/2025" />
            <InfoRow label="Immatriculation :" value="XX-XXX-XX" />
            <InfoRow label="Nature du sinistre :" value="Incendie" />
          </div>
        )}
      </div>

      {/* Expertise */}
      <div className="flex-none border-b border-gray-200 py-3">
        <div className="px-3">
          <button 
            onClick={() => toggleSection('important')}
            className="w-full py-2 px-3 flex items-center justify-between bg-[#FFB800] hover:bg-[#FFD700] transition-colors rounded-lg"
          >
            <div className="flex items-center">
              <Search size={16} className="text-[#0053A0] mr-2" />
              <h3 className="text-[#0053A0] text-sm">Expertise</h3>
            </div>
            {sections.important ? <ChevronUp size={16} className="text-[#0053A0]" /> : <ChevronDown size={16} className="text-[#0053A0]" />}
          </button>
        </div>
        {sections.important && (
          <div className="px-3 pt-3 space-y-2 bg-gray-50 mt-2 mx-3 rounded-lg">
            <InfoRow label="Montant d'expertise :" value="XX XXX,XX € HT" />
            <InfoRow label="VRADE :" value="X XXX € HT" />
            <InfoRow label="VE :" value="LEVE" isSuccess />
          </div>
        )}
      </div>

      {/* Vehicle Damage Diagram */}
      <div className="flex-none border-b border-gray-200">
        <button 
          onClick={() => toggleSection('diagram')}
          className="w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-semibold text-[#0053A0] text-sm">Croquis du véhicule</h3>
          {sections.diagram ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </button>
        {sections.diagram && (
          <div className="px-3 pb-3 bg-gray-50">
            <VehicleDiagram />
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* FAQ */}
      <div className="flex-none border-t border-gray-200 py-3">
        <div className="px-3">
          <button
            onClick={() => toggleSection('faq')}
            className="w-full py-2 px-3 flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg"
          >
            <div className="flex items-center">
              <HelpCircle size={16} className="text-[#0053A0] mr-2" />
              <h3 className="text-[#0053A0] text-sm font-semibold">FAQ</h3>
            </div>
            {sections.faq ? <ChevronUp size={16} className="text-[#0053A0]" /> : <ChevronDown size={16} className="text-[#0053A0]" />}
          </button>
        </div>
        {sections.faq && (
          <div className="px-3 pt-3 space-y-3 bg-gray-50 mt-2 mx-3 rounded-lg pb-3">
            <div className="relative mb-3">
              <Search size={14} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={faqSearchTerm}
                onChange={(e) => setFaqSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0053A0] focus:border-transparent"
              />
            </div>
            {filteredFaqItems.length > 0 ? (
              filteredFaqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                  link={item.link}
                  linkText={item.linkText}
                  searchTerm={faqSearchTerm}
                />
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center py-2">Aucun résultat trouvé</p>
            )}
          </div>
        )}
      </div>

      {/* Help */}
      <div className="flex-none px-2 py-4 space-y-1 border-t border-gray-200">
        <NavLink
          to="/help"
          className={({ isActive }) => `
            flex items-center px-2 py-2 rounded-md transition-all duration-200
            ${isActive ? 'bg-[#FFB800] text-[#0053A0]' : 'text-gray-600 hover:bg-gray-100'}
            justify-start
          `}
        >
          <HelpCircle size={20} />
          <span className="ml-3">Aide</span>
        </NavLink>
      </div>
    </div>
  );
};

const InfoRow: React.FC<{ label: string; value: string; isAlert?: boolean; isSuccess?: boolean }> = ({ label, value, isAlert, isSuccess }) => (
  <div className="grid grid-cols-[1fr,auto] gap-2 items-baseline">
    <span className="text-xs text-gray-600">{label}</span>
    {isSuccess ? (
      <span className="text-xs font-medium text-right text-white bg-[#009E73] rounded px-2 py-0.5">{value}</span>
    ) : (
      <span className={`text-xs font-medium text-right ${isAlert ? 'text-red-600' : 'text-gray-900'}`}>{value}</span>
    )}
  </div>
);

const FAQItem: React.FC<{
  question: string;
  answer: string;
  link?: string;
  linkText?: string;
  searchTerm?: string
}> = ({ question, answer, link, linkText, searchTerm }) => {
  const highlightText = (text: string, term: string) => {
    if (!term) return text;

    const regex = new RegExp(`(${term})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
      <div className="py-1">
        <span className="text-xs font-semibold text-[#0053A0] block mb-1">
          {searchTerm ? highlightText(question, searchTerm) : question}
        </span>
        <p className="text-xs text-gray-600 leading-relaxed">
          {searchTerm ? highlightText(answer, searchTerm) : answer}
        </p>
        {link && linkText && (
          <Link
            to={link}
            className="inline-flex items-center text-xs font-medium text-[#0053A0] hover:text-[#003d75] mt-2 hover:underline"
          >
            → Accéder à {linkText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default LeftPanel;