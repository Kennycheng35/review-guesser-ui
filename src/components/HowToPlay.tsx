
const HowToPlay = () => {
    
    return (
        <div className="max-h-[90vh] w-full h-full flex flex-col overflow-y-auto">
          <h2 className='text-black auto-mx flex items-center justify-center text-3xl pb-3'>How To Play</h2>
          <div className='text-black pt-5'>
            <p className="pb-3">Guess the movie from the Letterboxd Reviews!</p>
            <p className="pb-3">4 reviews are randomly selected for a movie.</p>
            <p className="pb-3">You are given 1 review and have to guess the movie based on that review.</p>
            <p className="pb-3">You have 4 reviews and 4 chances to guess the movie.</p>
            <p className="pb-3">Good luck!</p>

          </div>
        </div>
    )
}

export default HowToPlay;