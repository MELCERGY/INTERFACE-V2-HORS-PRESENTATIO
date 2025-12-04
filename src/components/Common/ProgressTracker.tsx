import React from 'react';
import { Check, X } from 'lucide-react';

interface Step {
  id: number;
  label: string;
  completed: boolean;
  current?: boolean;
  sectionId?: string;
}

interface ProgressTrackerProps {
  steps: Step[];
  onStepClick?: (sectionId: string) => void;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ steps, onStepClick }) => {
  return (
    <div className="w-full px-2 md:px-0">
      <div className="mb-3 md:mb-4 text-center">
        <h2 className="text-sm md:text-lg font-semibold text-[#0053A0]">Avancement du dossier</h2>
      </div>

      <div className="flex items-center justify-start md:justify-between relative overflow-x-auto pb-2">
        {/* Ligne de connexion - grise par défaut */}
        <div className="absolute left-0 right-0 h-[2px] bg-gray-300 top-[14px] md:top-4 -z-10"></div>
        
        {/* Lignes de progression vertes pour les étapes complétées */}
        {steps.map((step, index) => {
          if (step.completed && index < steps.length - 1 && index < 2) {
            return (
              <div
                key={`progress-${index}`}
                className="absolute bg-green-500 h-[2px] top-[14px] md:top-4 -z-5"
                style={{
                  left: `${(index / (steps.length - 1)) * 100}%`,
                  width: `${(1 / (steps.length - 1)) * 100}%`
                }}
              />
            );
          }
          return null;
        })}
        
        {steps.map((step, index) => {
          return (
            <div key={step.id} className="flex flex-col items-center min-w-[50px] md:min-w-0 mx-0.5 md:mx-0">
              <div
                className={`w-7 h-7 md:w-10 md:h-10 rounded-full flex items-center justify-center z-10 border-2 text-xs md:text-base ${
                  step.sectionId ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''
                } ${
                  step.completed ? 'bg-green-500 text-white border-green-500' :
                    step.current ? 'bg-[#FFB800] text-white border-[#FFB800]' :
                    'bg-gray-300 text-gray-600 border-gray-300'
                }`}
                onClick={() => step.sectionId && onStepClick?.(step.sectionId)}
              >
                {step.completed ? (
                  <Check size={14} className="md:w-4 md:h-4" />
                ) : step.id === 4 ? (
                  <X size={14} className="md:w-4 md:h-4" />
                ) : (
                  step.id
                )}
              </div>
              <span
                className={`text-[9px] md:text-xs mt-1.5 md:mt-2 text-center max-w-[50px] md:max-w-none leading-tight ${
                  step.sectionId ? 'cursor-pointer hover:underline' : ''
                } ${
                  step.current ? 'text-gray-800 font-medium' :
                  step.completed ? 'text-gray-800 font-medium' : 'text-gray-800'
                }`}
                onClick={() => step.sectionId && onStepClick?.(step.sectionId)}
              >
                {step.label}
              </span>
              
              {/* Ligne de progression verte pour les étapes complétées */}
              {step.completed && index < steps.length - 1 && (
                <div className="absolute bg-green-500 h-[2px] top-[14px] md:top-4 -z-5" style={{
                  left: `${(index / (steps.length - 1)) * 100}%`,
                  width: `${(1 / (steps.length - 1)) * 100}%`
                }}>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;