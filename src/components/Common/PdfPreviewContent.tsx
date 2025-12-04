import React from 'react';
import BcaLogo from './BcaLogo';

interface PdfPreviewContentProps {
  documentType: 'rapport' | 'facture' | 'devis' | 'certificat' | 'note-honoraire' | 'constat';
  title: string;
}

const PdfPreviewContent: React.FC<PdfPreviewContentProps> = ({ documentType, title }) => {
  const renderRapportExpertise = () => (
    <div className="bg-white p-6 text-xs leading-relaxed">
      {/* En-tête BCA */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <BcaLogo />
          <div className="mt-2 text-xs">
            <p>BCA PT - USC PT</p>
            <p>TSA 91247</p>
            <p>Téléphone : 0442291917</p>
            <p>Email : usc.pt@bca.fr</p>
            <p>Votre conseiller client : VALERIE</p>
          </div>
        </div>
        <div className="text-right">
          <p>Le 07/05/2025</p>
          <p className="font-bold">P22</p>
        </div>
      </div>

      {/* Informations dossier */}
      <div className="grid grid-cols-2 gap-4 mb-6 text-xs">
        <div>
          <p><strong>Référence BCA :</strong> 98235834</p>
          <p><strong>Affaire :</strong> NICOLAS ROMAIN</p>
          <p><strong>Véhicule :</strong> PEUGEOT 3008</p>
          <p><strong>Date de sinistre :</strong> 15/03/2025</p>
          <p><strong>Société :</strong> GENERALI FRANCE ASSURANCES</p>
          <p><strong>N° de sinistre :</strong> 0885984365</p>
          <p><strong>Expertisé :</strong> DESCHAMPS CEDRIC</p>
          <p><strong>Réf. assureur :</strong> 00000000</p>
        </div>
        <div>
          <p><strong>Société CARDIF GVS</strong></p>
          <p>CS 13456</p>
          <p>SEAT LEON 2005</p>
          <p>CEDEX 2</p>
          <br />
          <p><strong>RÉPARATEUR :</strong></p>
          <p>Garage</p>
          <p>DEPANOTO</p>
          <p>175 Bd THIERS</p>
          <p>83130 LA GARDE</p>
        </div>
      </div>

      {/* Titre du rapport */}
      <div className="text-center border-2 border-black p-2 mb-4">
        <h2 className="font-bold text-sm">RAPPORT</h2>
        <h2 className="font-bold text-sm">D'EXPERTISE</h2>
        <p className="text-xs mt-2">Annule et Remplace le Rapport d'expertise du 14/02/2023</p>
        <p className="text-xs">Procédure VEI non modifiée</p>
      </div>

      {/* Corps du rapport */}
      <div className="space-y-4">
        <p><strong>Madame, Monsieur,</strong></p>
        
        <p>Nous vous adressons le rapport d'expertise que nous avons établi au titre du sinistre en référence.</p>
        <p>Restant à votre disposition, nous vous prions d'agréer, Madame, Monsieur, nos salutations distinguées.</p>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <p><strong>VÉHICULE :</strong> Voiture particulière</p>
            <p><strong>Immatriculation :</strong> AB-123-CD</p>
            <p><strong>Marque :</strong> PEUGEOT</p>
            <p><strong>Modèle :</strong> 3008</p>
            <p><strong>Finition :</strong> 2.0 HDI TDI - 140 Silience</p>
            <p><strong>Type :</strong> M6E5E4DKK222</p>
            <p><strong>N° de Série :</strong> VF3222FHZRG023562</p>
            <p><strong>Energie :</strong> DIESEL</p>
            <p><strong>Kilométrage :</strong> Km (relevé) / 290 000 Km (estimé)</p>
            <p><strong>PTAC :</strong> 1 915 T - PTAC : 1 885 T</p>
            <p><strong>Usure des pneus :</strong> AVG : 50%, AVD : 50%, ARG : 50%, ARD : 50%</p>
            <p><strong>Date de validité du contrôle technique :</strong> 07/12/2023</p>
          </div>
          <div>
            <p><strong>Genre :</strong> VP</p>
            <p><strong>Carrosserie :</strong> CI</p>
            <p><strong>Puiss. :</strong> 8 CV</p>
            <p><strong>Couleur :</strong> Bleu</p>
            <p><strong>1ère M.C. :</strong> 04/02/2022</p>
            <br />
            <p><strong>ASSURÉ :</strong></p>
            <p>Monsieur</p>
            <p>NICOLAS ROMAIN</p>
            <p>PEUGEOT 3008</p>
            <p>17170 LA RONDE</p>
            <p>Téléphone : 0678563500</p>
          </div>
        </div>

        <p className="mt-4">Véhicule vu avant travaux chez le réparateur le 30/01/2023. Est présent pour le BCA FAURE XAVIER.</p>

        <p><strong>PIÈCES COMMUNIQUÉES :</strong> Ordre de mission (original), Constat amiable (copie), Carte grise (copie).</p>

        <p><strong>SINISTRE :</strong> Choc avec un corps fixe</p>

        <div className="mt-4">
          <p><strong>DOMMAGE IMPUTABLE :</strong> choc avec un corps fixe Choc sur toute la carrosserie</p>
          <p>La réparation du véhicule n'est manifestement pas envisageable. La remise en état consisterait en une reconstruction complète, aucun élément significatif n'étant récupérable.</p>
        </div>

        <div className="mt-4">
          <p><strong>ÉVALUATION PAR DIFFÉRENCE DES VALEURS :</strong></p>
          <p><strong>Valeur avant sinistre à dire d'expert :</strong> 3 000,00 € TVAC</p>
          <p><strong>Valeur après sinistre :</strong> 0 €</p>
          <p><strong>Différence des valeurs :</strong> 3 000,00 € TTC</p>
        </div>

        <p className="mt-4">Le propriétaire a accepté de céder son véhicule à GENERALI FRANCE ASSURANCES</p>

        <div className="text-center mt-6 text-xs">
          <p>BCA EXPERTISE S.A.S. au capital de 24 518 700 francs - R.C.S. Nanterre 440 139 186</p>
          <p>Siège Social : 14, rue Saint-Dominique - CS 60002 - 92513 - Châtillon Cedex</p>
          <p>Page 1/3</p>
        </div>
      </div>
    </div>
  );

  const renderFactureGarage = () => (
    <div className="bg-white p-6 text-xs">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-blue-800">NOM DU GARAGE</h2>
          <p>Adresse du garage</p>
          <p>XXXXX VILLE</p>
          <p>Tél: XX XX XX XX XX</p>
          <p>SIRET: XXXXXXXXXXXXXX</p>
        </div>
        <div className="text-right">
          <p className="font-bold">FACTURE N° F2025-0234</p>
          <p>Date: 05/04/2025</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2">FACTURER À:</h3>
        <p>M. PRÉNOM NOM</p>
        <p>XXXXX VILLE</p>
        <p>Véhicule: MARQUE MODELE - XX-XXX-XX</p>
      </div>

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2 text-left">Désignation</th>
            <th className="border border-gray-300 p-2">Qté</th>
            <th className="border border-gray-300 p-2">Prix Unit. HT</th>
            <th className="border border-gray-300 p-2">Total HT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Pare-chocs avant - Réf: 9675847520</td>
            <td className="border border-gray-300 p-2 text-center">1</td>
            <td className="border border-gray-300 p-2 text-right">450,00 €</td>
            <td className="border border-gray-300 p-2 text-right">450,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Capot - Réf: 9675123456</td>
            <td className="border border-gray-300 p-2 text-center">1</td>
            <td className="border border-gray-300 p-2 text-right">680,00 €</td>
            <td className="border border-gray-300 p-2 text-right">680,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Aile avant gauche - Réf: 9675789123</td>
            <td className="border border-gray-300 p-2 text-center">1</td>
            <td className="border border-gray-300 p-2 text-right">320,00 €</td>
            <td className="border border-gray-300 p-2 text-right">320,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Main d'œuvre carrosserie</td>
            <td className="border border-gray-300 p-2 text-center">12h</td>
            <td className="border border-gray-300 p-2 text-right">65,00 €</td>
            <td className="border border-gray-300 p-2 text-right">780,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Peinture et finition</td>
            <td className="border border-gray-300 p-2 text-center">1</td>
            <td className="border border-gray-300 p-2 text-right">450,00 €</td>
            <td className="border border-gray-300 p-2 text-right">450,00 €</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between py-1">
            <span>Total HT:</span>
            <span>2 680,00 €</span>
          </div>
          <div className="flex justify-between py-1">
            <span>TVA 20%:</span>
            <span>536,00 €</span>
          </div>
          <div className="flex justify-between py-1 font-bold border-t border-gray-300">
            <span>Total TTC:</span>
            <span>3 216,00 €</span>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs">
        <p><strong>Conditions de paiement:</strong> 30 jours net</p>
        <p><strong>Garantie:</strong> Pièces et main d'œuvre 2 ans</p>
      </div>
    </div>
  );

  const renderDevis = () => (
    <div className="bg-white p-6 text-xs">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-bold text-blue-800">NOM DU GARAGE</h2>
          <p>Adresse du garage</p>
          <p>XXXXX VILLE</p>
          <p>Tél: XX XX XX XX XX</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-red-600">DEVIS N° D2025-0156</p>
          <p>Date: 29/03/2025</p>
          <p>Validité: 30 jours</p>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-2">CLIENT:</h3>
        <p>M. PRÉNOM NOM</p>
        <p>Véhicule: MARQUE MODELE - XX-XXX-XX</p>
        <p>Sinistre du: 15/03/2025</p>
      </div>

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 p-2 text-left">Réparations nécessaires</th>
            <th className="border border-gray-300 p-2">Temps</th>
            <th className="border border-gray-300 p-2">Prix HT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Dépose/repose pare-chocs avant</td>
            <td className="border border-gray-300 p-2 text-center">2h</td>
            <td className="border border-gray-300 p-2 text-right">130,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Remplacement capot</td>
            <td className="border border-gray-300 p-2 text-center">3h</td>
            <td className="border border-gray-300 p-2 text-right">195,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Redressage aile avant gauche</td>
            <td className="border border-gray-300 p-2 text-center">4h</td>
            <td className="border border-gray-300 p-2 text-right">260,00 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Préparation et peinture</td>
            <td className="border border-gray-300 p-2 text-center">6h</td>
            <td className="border border-gray-300 p-2 text-right">390,00 €</td>
          </tr>
        </tbody>
      </table>

      <div className="bg-yellow-50 p-4 mb-4 border border-yellow-200">
        <h4 className="font-bold text-red-600 mb-2">ESTIMATION TOTALE:</h4>
        <p>Main d'œuvre: 975,00 € HT</p>
        <p>Pièces détachées: 1 450,00 € HT</p>
        <p><strong>Total HT: 2 425,00 €</strong></p>
        <p><strong>Total TTC: 2 910,00 €</strong></p>
      </div>
    </div>
  );

  const renderNoteHonoraire = () => (
    <div className="bg-white p-6 text-xs">
      <div className="flex justify-between items-start mb-6">
        <BcaLogo />
        <div className="text-right">
          <p className="font-bold">NOTE D'HONORAIRE</p>
          <p>N° NH2025-0234</p>
          <p>Date: 31/03/2025</p>
        </div>
      </div>

      <div className="mb-6">
        <p><strong>À:</strong> GENERALI FRANCE ASSURANCES</p>
        <p>Dossier: 98235834</p>
        <p>Sinistre: 0885984365</p>
        <p>Expert: DESCHAMPS CEDRIC</p>
      </div>

      <table className="w-full border-collapse border border-gray-300 mb-6">
        <thead>
          <tr className="bg-blue-100">
            <th className="border border-gray-300 p-2 text-left">Prestation</th>
            <th className="border border-gray-300 p-2">Montant HT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 p-2">Expertise automobile - Dossier VEI</td>
            <td className="border border-gray-300 p-2 text-right">103,31 €</td>
          </tr>
          <tr>
            <td className="border border-gray-300 p-2">Frais de déplacement</td>
            <td className="border border-gray-300 p-2 text-right">20,66 €</td>
          </tr>
        </tbody>
      </table>

      <div className="flex justify-end">
        <div className="w-48">
          <div className="flex justify-between py-1">
            <span>Total HT:</span>
            <span>123,97 €</span>
          </div>
          <div className="flex justify-between py-1">
            <span>TVA 20%:</span>
            <span>24,79 €</span>
          </div>
          <div className="flex justify-between py-1 font-bold border-t">
            <span>Total TTC:</span>
            <span>148,76 €</span>
          </div>
        </div>
      </div>
    </div>
  );

  switch (documentType) {
    case 'rapport':
      return renderRapportExpertise();
    case 'facture':
      return renderFactureGarage();
    case 'devis':
      return renderDevis();
    case 'note-honoraire':
      return renderNoteHonoraire();
    default:
      return renderRapportExpertise();
  }
};

export default PdfPreviewContent;