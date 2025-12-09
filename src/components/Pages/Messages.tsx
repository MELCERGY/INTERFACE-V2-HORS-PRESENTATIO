import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, Paperclip, Upload, ChevronDown, Check, ArrowLeft } from 'lucide-react';

interface MessageThread {
  id: string;
  objet: string;
  demandeur: string;
  creation: string;
  dernierMessage: string;
  nombreMessages: number;
  messages?: MessageDetail[];
}

interface MessageDetail {
  id: string;
  date: string;
  contenu: string;
  pieceJointe?: string;
  isFromUser?: boolean;
  read?: boolean;
}

interface MessageObject {
  id: string;
  label: string;
  requiresAttachment?: boolean;
  sousObjets?: Array<{ id: string; label: string }>;
}

const Messages: React.FC = () => {
  const [showNewMessageModal, setShowNewMessageModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState<MessageThread | null>(null);
  const [selectedObjet, setSelectedObjet] = useState<string>('');
  const [selectedSousObjet, setSelectedSousObjet] = useState<string>('');
  const [messageContent, setMessageContent] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const messageObjects: MessageObject[] = [
    { id: '', label: '--', requiresAttachment: false },
    { id: 'envoi-documents', label: 'Envoi de documents', requiresAttachment: true },
    { id: 'demande-info', label: 'Demande d\'informations', requiresAttachment: false },
    { id: 'reclamation', label: 'Réclamation', requiresAttachment: false },
    { id: 'autre', label: 'Autre', requiresAttachment: false }
  ];

  const messageThreads: MessageThread[] = [
    {
      id: '1',
      objet: 'Envoi de documents',
      demandeur: 'Réparateur',
      creation: 'Aujourd\'hui à 14:35',
      dernierMessage: 'Aujourd\'hui à 14:35',
      nombreMessages: 1,
      messages: [
        {
          id: '1-1',
          date: '03/10/2025',
          contenu: 'f',
          pieceJointe: 'Déclaration assuré (AR2_GTM_1504D1_RE_20231004 (14).pdf)',
          isFromUser: true,
          read: true
        }
      ]
    }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setAttachedFiles([...attachedFiles, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(attachedFiles.filter((_, i) => i !== index));
  };

  const handleSendMessage = () => {
    console.log('Envoi message:', { selectedObjet, messageContent, attachedFiles });
    setShowNewMessageModal(false);
    setSelectedObjet('');
    setSelectedSousObjet('');
    setMessageContent('');
    setAttachedFiles([]);
  };

  const selectedObjectData = messageObjects.find(obj => obj.id === selectedObjet);
  const requiresAttachment = selectedObjectData?.requiresAttachment || false;
  const canSend = messageContent.trim().length > 0 && selectedObjet !== '' &&
                  (!requiresAttachment || attachedFiles.length > 0);

  return (
    <div className="p-6">
      {/* Retour aux dossiers */}
      <div className="mb-4">
        <Link
          to="/dossiers"
          className="inline-flex items-center text-[#0053A0] hover:text-[#0076C8] group"
        >
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Retour aux dossiers
        </Link>
      </div>

      {/* Header */}
      <div className="mb-6 bg-white rounded-lg overflow-hidden shadow-sm">
        <div className="bg-gradient-to-r from-[#0053A0] to-[#0076C8] p-3">
          <div className="w-full flex items-center justify-center">
            <h1 className="text-base md:text-lg font-semibold text-white tracking-normal">BCA MESSAGES</h1>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 -mx-6 -mb-6 px-6 pb-6">
        {/* Nouveau Message Button */}
        <button
          onClick={() => setShowNewMessageModal(true)}
          className="bg-[#FFB800] hover:bg-[#FFD700] text-[#00257A] px-4 py-2 rounded-md font-medium flex items-center mb-6 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          NOUVEAU MESSAGE
        </button>

        {/* Messages List */}
        {!selectedThread ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto] gap-4 p-3 bg-gray-50 border-b border-gray-200 font-medium text-sm text-gray-700">
              <div>Objet du message</div>
              <div>Demandeur</div>
              <div>Création</div>
              <div>Dernier message</div>
              <div></div>
            </div>

            {messageThreads.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                Aucun message
              </div>
            ) : (
              messageThreads.map(thread => (
                <div
                  key={thread.id}
                  className="grid grid-cols-[2fr,1.5fr,1fr,1fr,auto] gap-4 p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer items-center"
                  onClick={() => setSelectedThread(thread)}
                >
                  <div className="text-sm font-medium text-gray-900">{thread.objet}</div>
                  <div className="text-sm text-gray-600">{thread.demandeur}</div>
                  <div className="text-sm text-gray-600">{thread.creation}</div>
                  <div className="text-sm text-gray-600">{thread.dernierMessage}</div>
                  <div className="flex items-center justify-center">
                    <span className="bg-[#FFB800] text-[#00257A] text-xs font-semibold px-2 py-1 rounded">
                      {thread.nombreMessages}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Thread Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h3 className="font-semibold text-gray-900">{selectedThread.objet}</h3>
                <p className="text-sm text-gray-600">{selectedThread.demandeur}</p>
              </div>
              <button
                onClick={() => setSelectedThread(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Thread Messages */}
            <div className="p-6 space-y-4">
              {selectedThread.messages?.map(message => (
                <div key={message.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center mb-2">
                    <div className="bg-[#FFB800] text-[#00257A] rounded-full w-10 h-10 flex items-center justify-center font-semibold mr-3">
                      U
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{selectedThread.objet}</div>
                      <div className="text-sm text-gray-500">{message.date}</div>
                    </div>
                    <div className="ml-auto text-sm text-gray-600">{selectedThread.demandeur}</div>
                  </div>
                  <div className="ml-13">
                    <p className="text-sm text-gray-700 mb-2">{message.contenu}</p>
                    {message.pieceJointe && (
                      <div className="flex items-center text-sm mb-2">
                        <span className="font-medium mr-2">Pièces jointes :</span>
                        <Paperclip size={14} className="mr-1" />
                        <a href="#" className="text-[#0053A0] hover:underline">
                          {message.pieceJointe}
                        </a>
                      </div>
                    )}
                    {message.isFromUser && (
                      <div className="flex items-center justify-end mt-1">
                        <Check size={14} className={message.read ? 'text-[#0053A0]' : 'text-gray-400'} />
                        <Check size={14} className={`${message.read ? 'text-[#0053A0]' : 'text-gray-400'} -ml-1.5`} />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex justify-center">
                <button className="bg-[#0053A0] hover:bg-[#0076C8] text-white px-6 py-2 rounded-md font-medium transition-colors">
                  Répondre
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Message</h2>
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              {/* Warning */}
              <div className="bg-orange-100 border border-orange-300 rounded-md p-3 flex items-start">
                <span className="text-orange-800 text-sm">
                  ⚠ Nom, prénom, email, objet et message ne doivent pas dépasser 250 caractères
                </span>
              </div>

              {/* Recipient Info */}
              <div className="flex items-start bg-gray-50 rounded-md p-4">
                <div className="bg-[#FFB800] text-[#00257A] rounded-full w-12 h-12 flex items-center justify-center font-semibold mr-4">
                  U
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <label className="text-sm font-medium text-gray-700 w-24">Nom Prénom</label>
                    <input
                      type="text"
                      value="MPR"
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm"
                    />
                  </div>
                  <div className="flex items-center">
                    <label className="text-sm text-gray-600 w-24">Recevoir une</label>
                    <label className="flex items-center text-sm text-gray-600">
                      <input type="checkbox" className="mr-2" />
                      confirmation par mail
                    </label>
                  </div>
                </div>
              </div>

              {/* Objet */}
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 w-24">Objet</label>
                <div className="flex-1 relative">
                  <select
                    value={selectedObjet}
                    onChange={(e) => setSelectedObjet(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm appearance-none pr-8"
                  >
                    {messageObjects.map(obj => (
                      <option key={obj.id} value={obj.id}>{obj.label}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Sous-objet (if applicable) */}
              {selectedObjectData?.sousObjets && (
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 w-24">Sous-objet</label>
                  <div className="flex-1 relative">
                    <select
                      value={selectedSousObjet}
                      onChange={(e) => setSelectedSousObjet(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm appearance-none pr-8"
                    >
                      <option value="">--</option>
                      {selectedObjectData.sousObjets.map(sousObj => (
                        <option key={sousObj.id} value={sousObj.id}>{sousObj.label}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Message */}
              <div className="flex items-start">
                <label className="text-sm font-medium text-gray-700 w-24 mt-2">Message</label>
                <div className="flex-1">
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none text-sm"
                    rows={4}
                    maxLength={250}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {messageContent.length} / 250
                  </div>
                </div>
              </div>

              {/* Pièces jointes */}
              <div className="flex items-start">
                <label className="text-sm font-medium text-gray-700 w-24 mt-2">Pièces jointes</label>
                <div className="flex-1">
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                    <p className="text-sm text-gray-600 mb-1">Vous pouvez nous transmettre 10</p>
                    <p className="text-sm text-gray-600 mb-3">documents au maximum.</p>
                    <div className="space-y-2">
                      <button className="text-[#0053A0] hover:underline text-sm">
                        Glisser-déposer vos documents ici
                      </button>
                      <p className="text-sm text-gray-500">ou</p>
                      <label className="text-[#0053A0] hover:underline text-sm cursor-pointer">
                        Cliquer ici pour parcourir votre ordinateur
                        <input
                          type="file"
                          multiple
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                  {attachedFiles.length > 0 && (
                    <div className="mt-2 space-y-1">
                      {attachedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                          <span className="text-sm text-gray-700">{file.name}</span>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  {requiresAttachment && attachedFiles.length === 0 && (
                    <p className="text-xs text-red-600 mt-1">* Pièce jointe obligatoire pour cet objet</p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowNewMessageModal(false)}
                className="px-4 py-2 text-[#0053A0] hover:bg-gray-100 rounded-md font-medium transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!canSend}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  canSend
                    ? 'bg-gray-600 hover:bg-gray-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
