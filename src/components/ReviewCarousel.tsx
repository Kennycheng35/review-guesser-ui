import { useState, useRef, useEffect } from 'react';
import Review from './Review';
import { useStickyState } from '../hooks/useStickyState';
import logo from '../assets/reviewbombd.svg';
import { useGameStats } from '../hooks/useGameStats';
import { DateTime } from 'luxon';

enum Status {
    Win = "WIN",
    Loss = "LOSS",
    InProgress = "INPROGRESS"
}

type ReviewCarouselProps = {
    slides:any,
    value: any,
    onChange: any,
    suggestions: any,
    isMovieSuggestionLoading: any,
    movie: any, 
    title: any, 
    poster: any, 
    handleModalOpen: any
}

const ReviewCarousel:React.FC<ReviewCarouselProps>  = ( {slides, value, onChange, suggestions, movie, title, poster, handleModalOpen}) => {

    const buttonColors = [
        'bg-black',
        'bg-black',
        'bg-black',
        'bg-black',
        'bg-blue-300'
    ]
    
    const gameSlate = [...slides, {title, poster}];
    // console.log(gameSlate);
    const [_, setGuess] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInitialMountForResultEffect = useRef(true);

    const [currentIndex, setCurrentIndex] = useStickyState(-1, 'currentIndex');
    const [visibleButtons, setVisibleButtons] = useStickyState(1, 'visibleButtons');
    const [result, setResult] = useStickyState(Status.InProgress, 'result');
    const [winScore, setWinScore] = useStickyState(0, 'winScore');
    const [lastCompleted, setLastCompleted] = useStickyState(null, 'lastCompleted');

    const { stats, updateStats } = useGameStats();

    const specialColor = result === Status.Win ? 'bg-blue-300' : 'bg-red-400';

    const dynamicButtonColors = buttonColors.map((color, i) =>
        i === buttonColors.length - 1  || i === winScore - 1? specialColor : color
    );

    useEffect(() => {
        function handleClickOutside(event:any) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                onChange(""); // Clear input (or hide dropdown)
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onChange]);

    // useEffect(() => {
    //     if (result === Status.Win){
    //         setWinScore();
    //     }
    // }, [result]);

    const totalSlides = gameSlate.length;
    // console.log(totalSlides);

    useEffect(() => {
        if (visibleButtons >= totalSlides && result !== Status.Win) {
            setResult(Status.Loss);
        }
        // if (visibleButtons === 5){
        //     console.log('movie result',result);
        // }
    },[currentIndex])

    useEffect(() => {
        if (isInitialMountForResultEffect.current) {
            isInitialMountForResultEffect.current = false;
            return;
        }

       if (visibleButtons === 5){
            // console.log('lc',lastCompleted, DateTime.now().toISODate());
            if (lastCompleted && lastCompleted !== DateTime.now().toISODate() || lastCompleted === null) {
                setLastCompleted(DateTime.now().toISODate());
                // console.log('last completed', lastCompleted)
                updateStats('gamesPlayed', stats.gamesPlayed + 1);
                const numberOfTries = [...stats.distribution]
                if (winScore === 0)
                    numberOfTries[numberOfTries.length - 1]++;
                else 
                    numberOfTries[winScore - 1]++;
                // console.log('number of tries', numberOfTries);

                updateStats('distribution', numberOfTries)
                const sum = numberOfTries.reduce((acc, curr) => acc + curr, 0);
                const last = numberOfTries[numberOfTries.length - 1];
                updateStats('winPercent', Math.floor((1 - last/sum) * 100));

                if (result === Status.Loss) {
                    updateStats('currentStreak', 0);
                }
                else {
                    updateStats('currentStreak', stats.currentStreak + 1);
                }
            }
            
        }
    }, [result])

    useEffect(() => {
        updateStats('maxStreak', Math.max(stats.currentStreak, stats.maxStreak));
    },[stats.currentStreak])


    const showMoreButtons = () => {
        // console.log('total slides', visibleButtons, totalSlides);
        if (visibleButtons < totalSlides){
            setVisibleButtons((prev: any) => Math.min(prev + 1, totalSlides));
            setCurrentIndex(visibleButtons);
        }

    }

    const showAllButtons = () => {
        setVisibleButtons(totalSlides);
        setCurrentIndex(totalSlides - 1);
    }

    const makeAGuess = (movieGuess: string) => {
        setGuess((prev) => prev + 1);

        if (movie !== movieGuess) {
            // if (currentIndex >= totalSlides) {
            //     setResult(Status.Loss);
            // }
            showMoreButtons();
        }
        else {
            showAllButtons();
            setWinScore(visibleButtons);
            setResult(Status.Win);
        }
    }

    const goToImage = (index: number) => {
        setCurrentIndex(index);
    }

    return (
        // <div classNameName=" mx-auto p-4 w-1/2 rounded-2xl shadow-md m-2" style={{'backgroundColor': '#14181C', 'color':'#99AABB'}}>
        //     <div classNameName='mx-auto w-9/10 p-4'>
        //         <div dangerouslySetInnerHTML={{__html: cleanHtml}} />   
        //     </div>
        // </div>
        <div className="relative w-full max-w-9/10 mx-auto mt-10">
            <div className="overflow-hidden rounded-lg">
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {gameSlate.slice(0, visibleButtons ).map((slide) => (
                <div key={slide.id} className="w-full flex-shrink-0 mx-auto items-center justify-center">
                    <Review {...slide} result={result} movie={movie} handleModalOpen={handleModalOpen}/>
                </div>
                ))}
            </div>
            </div>
    
            <div className="carousel-nav mx-auto items-center flex justify-center p-3">
                {gameSlate.slice(0, visibleButtons ).map((_, index) => (
                <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={
                        `carousel-nav-button 
                        ${currentIndex === index ? `${dynamicButtonColors[index]} text-white scale-125` : 'bg-white text-black'}
                        p-2 mx-2 cursor-pointer rounded-full transition duration-300 ease-in-out`}
                >
                    { index + 1 === 5 ? 
                        <img 
                        className='relative bottom-[3px] w-5 sm:w-5' 
                        src={logo} alt="Logo" 
                        />
                        : index + 1
                    }
                </button>
                ))}
            </div>
            <div className='items-center flex justify-center pt-3'>
                    <div className='relative w-full md:w-3/5 2xl:w-3/8 flex justify-center' ref={containerRef}>                    <input 
                        type='text'
                        placeholder='Enter a movie'
                        className='bg-white text-black w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        disabled={result === Status.Loss || result === Status.Win ? true : false}
                    />
                    {value && suggestions.length > 0 && (
                        <div>
                            <ul className='absolute top-full left-0 right-0 z-10 w-full justify-center bg-white border border-gray-300 mt-1 rounded max-h-40 overflow-y-auto shadow text-black'>
                                {suggestions.slice(0,10).map((movie:any) => (
                                    <li
                                        key={movie.id}
                                        className='p-2 hover:bg-gray-100 cursor-pointer'
                                        onClick={()=> {
                                            makeAGuess(movie.link);
                                            onChange('');
                                        }}
                                    >
                                        {movie.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReviewCarousel;