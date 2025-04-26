import logo from '../assets/reviewbombd.svg';
import { BadgeInfo, ChartNoAxesCombined } from 'lucide-react';

type HeaderBarProps = {
  handleModalOpen: (content: string | null) => void;
};

const HeaderBar: React.FC<HeaderBarProps> = ({handleModalOpen}) => {
  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="text-3xl font-bold text-black x-2 pr-1">
          ReviewBomb'd
        </div>
        <img className='relative bottom-[3px]' src={logo} alt="Logo" style={{width:'30px'}}/>
      </div>
      <nav className="space-x-4">
        {/* <a href="/" className="text-gray-600 hover:text-blue-600">Home</a>
        <a href="/about" className="text-gray-600 hover:text-blue-600">About</a>
        <a href="/contact" className="text-gray-600 hover:text-blue-600">Contact</a> */}
        <div className='flex'>
          <div className=''>
            <button
              onClick={() => {
                handleModalOpen('stats');
              }}
            >
              <ChartNoAxesCombined size={32} color='black'/>
            </button>
          </div>
          <div>
            <button
              onClick={() => {
               handleModalOpen('how-to');
              }}
            >
              <BadgeInfo size={32} color='black'/>
            </button>
          </div>
        </div>
        
      </nav>
    </header>
  );
};

export default HeaderBar;
