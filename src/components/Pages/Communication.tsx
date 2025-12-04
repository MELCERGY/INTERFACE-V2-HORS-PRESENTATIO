import React from 'react';
import { User, Wrench, MessageSquare, Mail, Phone, Receipt, Calculator, AlertTriangle, Radio, Shield, Filter, ChevronDown, Check, FileText, ArrowDownCircle, ArrowUpCircle, Voicemail } from 'lucide-react';

const Communication: React.FC = () => {
  const [selectedActors, setSelectedActors] = React.useState<string[]>(['tous']);
  const [selectedChannels, setSelectedChannels] = React.useState<string[]>(['tous']);
  const [selectedDirections, setSelectedDirections] = React.useState<string[]>(['tous']);
  const [isActorDropdownOpen, setIsActorDropdownOpen] = React.useState(false);
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = React.useState(false);
  const [isDirectionDropdownOpen, setIsDirectionDropdownOpen] = React.useState(false);

  const actors = [
    { value: 'tous', label: 'Tous les acteurs' },
    { value: 'assure', label: 'Assuré' },
    { value: 'reparateur', label: 'Réparateur' },
    { value: 'assureur', label: 'Assureur' },
    { value: 'ecr', label: 'ECR' },
    { value: 'epaviste', label: 'Épaviste' }
  ];

  const channels = [
    { value: 'tous', label: 'Tous les canaux', icon: null },
    { value: 'mail', label: 'E-mail', icon: Mail },
    { value: 'phone', label: 'Téléphone', icon: Phone },
    { value: 'sms', label: 'SMS', icon: MessageSquare },
    { value: 'courrier', label: 'Courrier', icon: FileText },
    { value: 'telematique', label: 'Télématique', icon: Radio },
    { value: 'bca-message', label: 'BCA Message', icon: MessageSquare }
  ];

  const directions = [
    { value: 'tous', label: 'Tous types d\'actions', icon: null },
    { value: 'in', label: 'Entrants', icon: ArrowDownCircle },
    { value: 'out', label: 'Sortants', icon: ArrowUpCircle },
    { value: 'voicemail', label: 'Répondeur', icon: Voicemail }
  ];

  const handleActorChange = (actorValue: string) => {
    if (actorValue === 'tous') {
      setSelectedActors(['tous']);
    } else {
      const newSelected = selectedActors.includes('tous') 
        ? [actorValue]
        : selectedActors.includes(actorValue)
          ? selectedActors.filter(a => a !== actorValue)
          : [...selectedActors, actorValue];
      
      setSelectedActors(newSelected.length === 0 ? ['tous'] : newSelected);
    }
  };

  const handleChannelChange = (channelValue: string) => {
    if (channelValue === 'tous') {
      setSelectedChannels(['tous']);
    } else {
      const newSelected = selectedChannels.includes('tous')
        ? [channelValue]
        : selectedChannels.includes(channelValue)
          ? selectedChannels.filter(c => c !== channelValue)
          : [...selectedChannels, channelValue];

      setSelectedChannels(newSelected.length === 0 ? ['tous'] : newSelected);
    }
  };

  const handleDirectionChange = (directionValue: string) => {
    if (directionValue === 'tous') {
      setSelectedDirections(['tous']);
    } else {
      const newSelected = selectedDirections.includes('tous')
        ? [directionValue]
        : selectedDirections.includes(directionValue)
          ? selectedDirections.filter(d => d !== directionValue)
          : [...selectedDirections, directionValue];

      setSelectedDirections(newSelected.length === 0 ? ['tous'] : newSelected);
    }
  };

  const timelineItems = [
    {
      id: 0,
      date: '03/04/2025',
      type: 'assure',
      moyen: 'phone',
      title: 'Demande facture d\'achat',
      description: 'Message laissé par l\'assuré sur le répondeur',
      icon: Phone,
      color: 'blue',
      direction: 'voicemail',
      read: false,
      action: 'Répondeur'
    },
    {
      id: 2,
      date: '01/04/2025',
      type: 'reparateur',
      moyen: 'phone',
      title: 'Demande de facture des réparations',
      description: 'Appel téléphonique au réparateur pour la facture finale des travaux',
      icon: Phone,
      color: 'orange',
      direction: 'out',
      read: false
    },
    {
      id: 3,
      date: '02/04/2025',
      type: 'assureur',
      moyen: 'telematique',
      title: 'Demande du constat amiable',
      description: 'Demande télématique du constat amiable d\'accident',
      icon: Radio,
      color: 'green',
      direction: 'in',
      read: true
    },
    {
      id: 4,
      date: '30/03/2025',
      type: 'assureur',
      moyen: 'courrier',
      title: 'Rapport d\'expertise',
      description: 'Envoi du rapport d\'expertise par courrier',
      icon: FileText,
      color: 'blue',
      direction: 'out',
      read: true
    },
    {
      id: 5,
      date: '30/03/2025',
      type: 'assureur',
      moyen: 'telematique',
      title: 'SD29 : Information sur les dommages',
      description: 'Transmission télématique des informations de dommages',
      icon: Radio,
      color: 'green',
      direction: 'out',
      read: true
    },
    {
      id: 6,
      date: '28/03/2025',
      type: 'reparateur',
      moyen: 'phone',
      title: 'Demande de date RDV des travaux',
      description: 'Demande de planification des travaux de réparation',
      icon: Phone,
      color: 'orange',
      direction: 'out',
      read: true
    },
    {
      id: 7,
      date: '28/03/2025',
      type: 'assureur',
      moyen: 'telematique',
      title: 'SD25 : Retard prévisible',
      description: 'Notification de retard prévisible dans le traitement',
      icon: Radio,
      color: 'green',
      direction: 'out',
      read: true
    },
    {
      id: 8,
      date: '25/03/2025',
      type: 'assure',
      moyen: 'mail',
      title: 'Demande de factures d\'entretien',
      description: 'Demande des factures d\'entretien du véhicule',
      icon: Mail,
      color: 'blue',
      direction: 'out',
      read: true
    },
    {
      id: 9,
      date: '25/03/2025',
      type: 'reparateur',
      moyen: 'mail',
      title: 'Demande de devis complémentaire',
      description: 'Email envoyé pour demander un devis complémentaire',
      icon: Mail,
      color: 'orange',
      direction: 'out',
      read: true
    },
    {
      id: 10,
      date: '25/03/2025',
      type: 'reparateur',
      moyen: 'mail',
      title: 'Demande de devis',
      description: 'Demande de devis envoyée au garage réparateur',
      icon: Mail,
      color: 'orange',
      direction: 'out',
      read: true
    },
    {
      id: 11,
      date: '22/03/2025',
      type: 'reparateur',
      moyen: 'mail',
      title: 'Demande de l\'EAD',
      description: 'Demande de l\'Évaluation des Dommages signée',
      icon: Mail,
      color: 'orange',
      direction: 'out',
      read: true
    },
    {
      id: 12,
      date: '20/03/2025',
      type: 'assure',
      moyen: 'phone',
      title: 'Demande de RDV',
      description: 'Prise de rendez-vous avec l\'assuré pour l\'expertise',
      icon: Phone,
      color: 'blue',
      direction: 'out',
      read: true
    },
    {
      id: 13,
      date: '16/03/2025',
      type: 'assure',
      moyen: 'mail',
      title: 'Demande de déclaration de sinistre',
      description: 'Demande de la déclaration officielle du sinistre',
      icon: Mail,
      color: 'blue',
      direction: 'out',
      read: false
    },
    {
      id: 14,
      date: '15/03/2025',
      type: 'assureur',
      moyen: 'telematique',
      title: 'SD15 : Retard prévisible',
      description: 'Notification de retard prévisible dans le traitement',
      icon: Radio,
      color: 'purple',
      direction: 'in',
      read: false
    }
  ];

  const filteredItems = timelineItems.filter(item => {
    const actorMatch = selectedActors.includes('tous') || selectedActors.includes(item.type);
    const channelMatch = selectedChannels.includes('tous') || selectedChannels.includes(item.moyen);
    const directionMatch = selectedDirections.includes('tous') || selectedDirections.includes(item.direction);
    return actorMatch && channelMatch && directionMatch;
  });

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'assure':
        return 'ASSURÉ';
      case 'reparateur':
        return 'RÉPARATEUR';
      case 'assureur':
        return 'ASSUREUR';
      case 'ecr':
        return 'ECR';
      case 'epaviste':
        return 'ÉPAVISTE';
      default:
        return type.toUpperCase();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Communication</h1>
        <p className="text-gray-500">Suivi des échanges - Dossier XXXXXXXXXX</p>
      </div>

      {/* Filtres */}
      <div className="mb-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filtres :</span>
          </div>
          
          {/* Filtre Acteur */}
          <div className="relative">
            <button
              onClick={() => setIsActorDropdownOpen(!isActorDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors min-w-[200px]"
            >
              <span>
                {selectedActors.includes('tous') 
                  ? 'Tous les acteurs' 
                  : selectedActors.length === 1 
                    ? actors.find(a => a.value === selectedActors[0])?.label
                    : `${selectedActors.length} acteurs sélectionnés`
                }
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {isActorDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2">
                {actors.map(actor => (
                  <label
                    key={actor.value}
                    className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={selectedActors.includes(actor.value)}
                        onChange={() => handleActorChange(actor.value)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                        selectedActors.includes(actor.value) 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-300'
                      }`}>
                        {selectedActors.includes(actor.value) && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700">{actor.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Filtre Canal */}
          <div className="relative">
            <button
              onClick={() => setIsChannelDropdownOpen(!isChannelDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors min-w-[200px]"
            >
              <span>
                {selectedChannels.includes('tous') 
                  ? 'Tous les canaux' 
                  : selectedChannels.length === 1 
                    ? channels.find(c => c.value === selectedChannels[0])?.label
                    : `${selectedChannels.length} canaux sélectionnés`
                }
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>
            
            {isChannelDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2">
                {channels.map(channel => {
                  const ChannelIcon = channel.icon;
                  return (
                    <label
                      key={channel.value}
                      className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedChannels.includes(channel.value)}
                          onChange={() => handleChannelChange(channel.value)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                          selectedChannels.includes(channel.value)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedChannels.includes(channel.value) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{channel.label}</span>
                      {ChannelIcon && <ChannelIcon size={16} className="text-gray-600 ml-auto" />}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Filtre Direction */}
          <div className="relative">
            <button
              onClick={() => setIsDirectionDropdownOpen(!isDirectionDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-sm hover:bg-gray-100 transition-colors min-w-[200px]"
            >
              <span>
                {selectedDirections.includes('tous')
                  ? 'Tous types d\'actions'
                  : selectedDirections.length === 1
                    ? directions.find(d => d.value === selectedDirections[0])?.label
                    : `${selectedDirections.length} actions sélectionnées`
                }
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </button>

            {isDirectionDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg z-10 p-2">
                {directions.map(direction => {
                  const DirectionIcon = direction.icon;
                  return (
                    <label
                      key={direction.value}
                      className="flex items-center gap-2 px-2 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={selectedDirections.includes(direction.value)}
                          onChange={() => handleDirectionChange(direction.value)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${
                          selectedDirections.includes(direction.value)
                            ? 'bg-blue-500 border-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedDirections.includes(direction.value) && (
                            <Check size={12} className="text-white" />
                          )}
                        </div>
                      </div>
                      <span className="text-gray-700">{direction.label}</span>
                      {DirectionIcon && <DirectionIcon size={16} className="text-gray-600 ml-auto" />}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Compteur de résultats */}
          <div className="text-sm text-gray-500">
            {filteredItems.length} communication{filteredItems.length > 1 ? 's' : ''} trouvée{filteredItems.length > 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Ligne verticale */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        <div className="space-y-6">
          {filteredItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div key={item.id} className="relative flex items-start">
                {/* Point sur la timeline */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center z-10 ${
                  ''
                }`}>
                  <IconComponent size={20} className="text-[#0053A0]" strokeWidth={1.5} />
                </div>

                {/* Contenu */}
                <div className={`ml-6 flex-1 rounded-lg p-4 border-l-4 bg-white shadow-sm relative ${
                  item.color === 'blue' ? 'border-l-blue-500' :
                  item.color === 'orange' ? 'border-l-orange-500' :
                  item.color === 'green' ? 'border-l-green-500' :
                  item.color === 'purple' ? 'border-l-purple-500' :
                  'border-l-gray-300'
                } ${!item.read ? 'ring-2 ring-[#0053A0]' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-xs font-bold text-gray-700 mr-3">
                        {getTypeLabel(item.type)}
                      </span>
                      <span className="text-sm font-bold text-gray-800">{item.date}</span>
                    </div>
                    {item.direction === 'voicemail' ? (
                      <div className="border-2 border-[#0053A0] rounded-full p-1">
                        <Voicemail size={20} className="text-[#0053A0]" />
                      </div>
                    ) : item.direction === 'in' && item.title ? (
                      <ArrowDownCircle size={24} className="text-green-600" />
                    ) : item.direction === 'out' && item.title ? (
                      <ArrowUpCircle size={24} className="text-blue-600" />
                    ) : null}
                  </div>
                  <div className="ml-11">
                    {item.title && <h3 className="text-gray-800 mb-1">{item.title}</h3>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Communication;