import GuessGraph from "./GuessGraph"
import { useGameStats } from "../hooks/useGameStats";


const Stats = () => {
    const { stats, } = useGameStats();

    if (!stats) {
        return null; 
    }

    return (
        <div className="max-h-[90vh] w-full h-full flex flex-col overflow-y-auto p-4"> 
          <h2 className='text-black flex items-center justify-center text-3xl mb-4'>Stats</h2> 

          <div className='flex text-black'>
            <div className='flex-1 min-w-0 px-2'> 
              <p className='text-center text-sm sm:text-base'>Played</p> 
              <p className='text-center text-xl sm:text-2xl font-medium'>{stats.gamesPlayed}</p>
            </div>
            <div className='flex-1 min-w-0 px-2'>
              <p className='text-center text-sm sm:text-base'>Win %</p>
              <p className='text-center text-xl sm:text-2xl font-medium'>{stats.winPercent}</p>
            </div>
            <div className='flex-2 min-w-0 px-2'>
              <p className='text-center text-sm sm:text-base'>Current Streak</p>
              <p className='text-center text-xl sm:text-2xl font-medium'>{stats.currentStreak}</p>
            </div>
            <div className='flex-2 min-w-0 px-2'>
              <p className='text-center text-sm sm:text-base'>Max Streak</p>
              <p className='text-center text-xl sm:text-2xl font-medium'>{stats.maxStreak}</p>
            </div>
          </div>

        
          <div className='mt-4 flex-grow w-full relative'> {/* Added flex-grow, w-full, relative */}
            <p className='text-center text-black text-lg mb-2'>Guess Distribution</p> 
            <GuessGraph data={stats.distribution} />
          </div>
        </div>
    );
}

export default Stats; 