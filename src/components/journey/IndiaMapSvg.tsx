import React from 'react';
import { REGIONS } from '../../data/regions';
import type { RegionalZone } from '../../types';

interface IndiaMapSvgProps {
  selectedZone: RegionalZone;
  onSelectZone: (zone: RegionalZone) => void;
}

export const IndiaMapSvg: React.FC<IndiaMapSvgProps> = ({
  selectedZone,
  onSelectZone,
}) => {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-[4/5] flex items-center justify-center p-4">
      <svg
        viewBox="0 0 400 500"
        className="w-full h-full drop-shadow-xl select-none"
        aria-label="Stylized interactive culinary map of India"
        role="region"
      >
        <defs>
          <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Stylized Silhouette of India (Hand-crafted path) */}
        <g className="transition-all duration-500">
          {/* North Zone Polygon */}
          <path
            d="M 170 30 L 220 50 L 250 85 L 230 140 L 160 140 L 120 100 Z"
            className={`transition-colors duration-300 cursor-pointer ${
              selectedZone === 'North'
                ? 'fill-saffron stroke-gold stroke-[3]'
                : 'fill-[#EFE6D8] hover:fill-[#E5D7C2] stroke-linen stroke-[1.5]'
            }`}
            onClick={() => onSelectZone('North')}
            tabIndex={0}
            role="button"
            aria-label="North India Region"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectZone('North');
            }}
          />

          {/* West Zone Polygon */}
          <path
            d="M 120 140 L 190 140 L 180 260 L 100 240 L 80 180 Z"
            className={`transition-colors duration-300 cursor-pointer ${
              selectedZone === 'West'
                ? 'fill-saffron stroke-gold stroke-[3]'
                : 'fill-[#EFE6D8] hover:fill-[#E5D7C2] stroke-linen stroke-[1.5]'
            }`}
            onClick={() => onSelectZone('West')}
            tabIndex={0}
            role="button"
            aria-label="West India Region"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectZone('West');
            }}
          />

          {/* South Zone Polygon */}
          <path
            d="M 140 260 L 220 260 L 200 390 L 180 460 L 160 390 Z"
            className={`transition-colors duration-300 cursor-pointer ${
              selectedZone === 'South'
                ? 'fill-olive stroke-gold stroke-[3]'
                : 'fill-[#EFE6D8] hover:fill-[#E5D7C2] stroke-linen stroke-[1.5]'
            }`}
            onClick={() => onSelectZone('South')}
            tabIndex={0}
            role="button"
            aria-label="South India Region"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectZone('South');
            }}
          />

          {/* East Zone Polygon */}
          <path
            d="M 230 140 L 290 160 L 290 260 L 210 260 L 190 140 Z"
            className={`transition-colors duration-300 cursor-pointer ${
              selectedZone === 'East'
                ? 'fill-gold stroke-saffron stroke-[3]'
                : 'fill-[#EFE6D8] hover:fill-[#E5D7C2] stroke-linen stroke-[1.5]'
            }`}
            onClick={() => onSelectZone('East')}
            tabIndex={0}
            role="button"
            aria-label="East India Region"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectZone('East');
            }}
          />

          {/* Northeast Zone Polygon */}
          <path
            d="M 295 150 L 370 120 L 380 180 L 320 220 L 295 180 Z"
            className={`transition-colors duration-300 cursor-pointer ${
              selectedZone === 'Northeast'
                ? 'fill-olive stroke-gold stroke-[3]'
                : 'fill-[#EFE6D8] hover:fill-[#E5D7C2] stroke-linen stroke-[1.5]'
            }`}
            onClick={() => onSelectZone('Northeast')}
            tabIndex={0}
            role="button"
            aria-label="Northeast India Region"
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') onSelectZone('Northeast');
            }}
          />
        </g>

        {/* Interactive Region Pins & Labels */}
        {REGIONS.map(region => {
          const isSelected = region.zone === selectedZone;
          const cx = (region.mapCoordinates.x * 400) / 100;
          const cy = (region.mapCoordinates.y * 500) / 100;

          return (
            <g
              key={region.id}
              className="cursor-pointer group"
              onClick={() => onSelectZone(region.zone)}
              tabIndex={0}
              role="button"
              aria-label={`Select ${region.name}`}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') onSelectZone(region.zone);
              }}
            >
              {/* Pulsing ring on selected */}
              {isSelected && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="18"
                  fill="none"
                  stroke="#D8A24A"
                  strokeWidth="2"
                  className="animate-ping origin-center"
                  style={{ transformOrigin: `${cx}px ${cy}px` }}
                />
              )}

              {/* Pin Body */}
              <circle
                cx={cx}
                cy={cy}
                r={isSelected ? "11" : "7"}
                fill={isSelected ? "#FFFDF9" : "#C56A2D"}
                stroke={isSelected ? "#C56A2D" : "#FFFDF9"}
                strokeWidth="3"
                className="transition-all duration-300 group-hover:scale-125"
              />

              {/* Center Dot */}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill={isSelected ? "#C56A2D" : "#FFFDF9"}
              />

              {/* Region Tag Name */}
              <text
                x={cx}
                y={cy + (region.zone === 'South' ? -18 : 22)}
                textAnchor="middle"
                className={`text-[12px] font-sans font-bold tracking-wider uppercase transition-colors pointer-events-none select-none ${
                  isSelected ? 'fill-charcoal' : 'fill-charcoal/70 group-hover:fill-saffron'
                }`}
              >
                {region.zone}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
