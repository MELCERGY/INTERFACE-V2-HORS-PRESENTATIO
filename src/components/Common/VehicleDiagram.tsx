import React from 'react';

interface DamageArea {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  severity: 'minor' | 'major' | 'severe';
}

const VehicleDiagram: React.FC = () => {
  const damageAreas: DamageArea[] = [
    {
      id: 'front-bumper',
      name: 'Pare-chocs avant',
      x: 8,
      y: 42,
      width: 4,
      height: 16,
      severity: 'major'
    },
    {
      id: 'hood',
      name: 'Capot',
      x: 12,
      y: 38,
      width: 18,
      height: 24,
      severity: 'major'
    },
    {
      id: 'left-fender',
      name: 'Aile avant gauche',
      x: 15,
      y: 20,
      width: 15,
      height: 18,
      severity: 'severe'
    },
    {
      id: 'right-door',
      name: 'Portière arrière droite',
      x: 50,
      y: 62,
      width: 25,
      height: 18,
      severity: 'minor'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'minor':
        return '#FFB800'; // Yellow
      case 'major':
        return '#FF5A00'; // Orange
      case 'severe':
        return '#C41E3A'; // Red
      default:
        return '#0053A0';
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-3 border border-gray-200">
      <h4 className="text-gray-800 text-xs font-semibold mb-3">Localisation des dégâts</h4>
      
      {/* Vehicle SVG */}
      <div className="relative">
        <svg
          viewBox="0 0 120 100"
          className="w-full h-24 bg-white rounded border border-gray-300"
        >
          {/* Main vehicle body */}
          <rect
            x="10"
            y="35"
            width="100"
            height="30"
            rx="8"
            ry="8"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1.5"
            opacity="0.8"
          />
          
          {/* Front bumper */}
          <rect
            x="6"
            y="38"
            width="6"
            height="24"
            rx="3"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1"
            opacity="0.7"
          />
          
          {/* Rear bumper */}
          <rect
            x="108"
            y="38"
            width="6"
            height="24"
            rx="3"
            fill="none"
            stroke="#4B5563"
            strokeWidth="1"
            opacity="0.7"
          />
          
          {/* Windshield */}
          <rect
            x="15"
            y="38"
            width="12"
            height="24"
            rx="2"
            fill="#E5E7EB"
            stroke="#6B7280"
            strokeWidth="0.5"
            opacity="0.6"
          />
          
          {/* Rear window */}
          <rect
            x="93"
            y="38"
            width="12"
            height="24"
            rx="2"
            fill="#E5E7EB"
            stroke="#6B7280"
            strokeWidth="0.5"
            opacity="0.6"
          />
          
          {/* Side windows */}
          <rect
            x="35"
            y="38"
            width="20"
            height="24"
            rx="1"
            fill="#E5E7EB"
            stroke="#6B7280"
            strokeWidth="0.5"
            opacity="0.4"
          />
          
          <rect
            x="65"
            y="38"
            width="20"
            height="24"
            rx="1"
            fill="#E5E7EB"
            stroke="#6B7280"
            strokeWidth="0.5"
            opacity="0.4"
          />
          
          {/* Side mirrors */}
          <ellipse cx="25" cy="32" rx="2" ry="3" fill="#6B7280" opacity="0.6" />
          <ellipse cx="25" cy="68" rx="2" ry="3" fill="#6B7280" opacity="0.6" />
          
          {/* Door lines */}
          <line x1="30" y1="35" x2="90" y2="35" stroke="#9CA3AF" strokeWidth="0.5" opacity="0.5" />
          <line x1="30" y1="65" x2="90" y2="65" stroke="#9CA3AF" strokeWidth="0.5" opacity="0.5" />
          <line x1="60" y1="35" x2="60" y2="65" stroke="#9CA3AF" strokeWidth="0.5" opacity="0.5" />
          
          {/* Wheels */}
          <ellipse cx="25" cy="25" rx="6" ry="4" fill="#374151" opacity="0.8" />
          <ellipse cx="25" cy="75" rx="6" ry="4" fill="#374151" opacity="0.8" />
          <ellipse cx="95" cy="25" rx="6" ry="4" fill="#374151" opacity="0.8" />
          <ellipse cx="95" cy="75" rx="6" ry="4" fill="#374151" opacity="0.8" />
          
          {/* Wheel centers */}
          <ellipse cx="25" cy="25" rx="3" ry="2" fill="#6B7280" opacity="0.6" />
          <ellipse cx="25" cy="75" rx="3" ry="2" fill="#6B7280" opacity="0.6" />
          <ellipse cx="95" cy="25" rx="3" ry="2" fill="#6B7280" opacity="0.6" />
          <ellipse cx="95" cy="75" rx="3" ry="2" fill="#6B7280" opacity="0.6" />
          
          {/* Headlights */}
          <ellipse cx="12" cy="42" rx="2" ry="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.5" opacity="0.7" />
          <ellipse cx="12" cy="58" rx="2" ry="3" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="0.5" opacity="0.7" />
          
          {/* Taillights */}
          <ellipse cx="108" cy="42" rx="1.5" ry="2" fill="#FEE2E2" stroke="#DC2626" strokeWidth="0.5" opacity="0.7" />
          <ellipse cx="108" cy="58" rx="1.5" ry="2" fill="#FEE2E2" stroke="#DC2626" strokeWidth="0.5" opacity="0.7" />
          
          {/* Damage areas */}
          {damageAreas.map((damage) => (
            <g key={damage.id}>
              <rect
                x={damage.x}
                y={damage.y}
                width={damage.width}
                height={damage.height}
                fill={getSeverityColor(damage.severity)}
                opacity="0.8"
                rx="1"
              />
              <rect
                x={damage.x}
                y={damage.y}
                width={damage.width}
                height={damage.height}
                fill="none"
                stroke={getSeverityColor(damage.severity)}
                strokeWidth="0.5"
                rx="1"
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default VehicleDiagram;