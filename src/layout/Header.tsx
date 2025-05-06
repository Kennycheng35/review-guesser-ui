import logo from '../assets/reviewbombd.svg';
import { BadgeInfo, ChartNoAxesCombined } from 'lucide-react';
import React from 'react';

type HeaderBarProps = {
  handleModalOpen: (content: string | null) => void;
};

const HeaderBar: React.FC<HeaderBarProps> = ({ handleModalOpen }) => {
  return (
    <header className="w-full bg-white shadow-md px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
      {/* Left section: Logo and Title */}
      <div className="flex items-center">
        <div className="text-2xl sm:text-3xl font-bold text-black pr-1 sm:pr-2">
          ReviewBomb'd
        </div>
        <img
          className='relative bottom-[2px] sm:bottom-[3px] w-[24px] sm:w-[30px] h-auto'
          src={logo}
          alt="ReviewBomb'd Logo"
        />
      </div>

      {/* Right section: Navigation Icons */}
      {/* Applying space-x directly between button children */}
      <nav className="flex items-center">
        {/* Button for Stats - now a direct child */}
        <button
          onClick={() => {
            handleModalOpen('stats');
          }}
          // Added focus-visible for better keyboard nav focus, keeping p-1
          className="p-0"
          aria-label="View Stats"
        >
          <ChartNoAxesCombined size={22} color='black' />
        </button>

        {/* Button for How-to/Info - now a direct child */}
        <button
          onClick={() => {
            handleModalOpen('how-to');
          }}
          // Added focus-visible for better keyboard nav focus, keeping p-1
          className="p-0"
          aria-label="Show Information"
        >
          <BadgeInfo size={22} color='black' />
        </button>
      </nav>
    </header>
  );
};

export default HeaderBar;