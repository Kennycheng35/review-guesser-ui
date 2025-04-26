import GuessGraph from "./GuessGraph"
import { useGameStats } from "../hooks/useGameStats";

const Stats = () => {
    const { stats, updateStats } = useGameStats();
    console.log('stats', stats);
    
    return (
        <div>
          <h2 className='text-black auto-mx flex items-center justify-center text-3xl'>Stats</h2>
          <div className='flex text-black pt-5'>
            <div className='flex-1'>
              <p className='text-center'>Played</p>
              <p className='text-center text-2xl font-medium'>{stats.gamesPlayed}</p>
            </div>
            <div className='flex-1'>
              <p className='text-center'>Win %</p>
              <p className='text-center text-2xl font-medium'>{stats.winPercent}</p>
            </div>
            <div className='flex-1'>
              <p className='text-center'>Current Streak</p>
              <p className='text-center text-2xl font-medium'>{stats.currentStreak}</p>
            </div>
            <div className='flex-1'>
              <p className='text-center'>Max Streak</p>
              <p className='text-center text-2xl font-medium'>{stats.maxStreak}</p>
            </div>
          </div>
          <div className='pt-4'>
            <GuessGraph data={stats.distribution} />
          </div>
        </div>
    )
}

export default Stats;