import DOMPurify  from 'dompurify'
import { Trophy, Ban } from 'lucide-react';
// import parse from 'html-react-parser'
import { useRef, useState, useLayoutEffect } from 'react';

enum Status {
    Win = "WIN",
    Loss = "LOSS",
    InProgress = "INPROGRESS"
}

type ReviewProps = {
    id: number;
    review: string;
    difficulty: number;
    innerhtml: string;
    liked: boolean;
    rating: string; 
    title: string;
    poster: string;
    result: Status;
    movie: string;
    handleModalOpen: (content: string) => void;
};

const Review = ({innerhtml, liked, rating, title, poster, result, movie, handleModalOpen}: ReviewProps) => {
    const doc = new DOMParser().parseFromString(innerhtml, 'text/html');
    const targetElement = doc.querySelector('.js-review-body');
    const reviewer = doc.querySelector('.name');
    const likes = doc.querySelector('.cannot-like');
    const scrollContainerRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null); 

    const [applyCentering, setApplyCentering] = useState(false); 
 
    const cleanHtml = DOMPurify.sanitize(targetElement?.innerHTML || '');

    useLayoutEffect(() => {
        let shouldCenter = false;
        if (scrollContainerRef.current && contentRef.current) {
          const containerHeight = scrollContainerRef.current.clientHeight;
          const contentHeight = contentRef.current.scrollHeight;     
    
          if (contentHeight <= containerHeight) {
            shouldCenter = true;
          }
        }
        setApplyCentering(shouldCenter);
    
        if (!shouldCenter && scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = 0;
        }
    
    }, [cleanHtml]);

    const renderRevealCard = () => (
        <div className='mx-auto w-full flex flex-col lg:flex-row items-center lg:items-stretch max-w-screen-lg gap-4 lg:gap-6 lg:w-5/8'>                <div className='flex justify-center items-center transition-all duration-500 ease-in-out transform hover:scale-[1.02]'>
                    <img className="h-82 w-auto rounded-lg object-contain" src={poster} alt={title || "Movie Poster"} />
                </div>
                <div className="mx-auto w-full lg:flex-1 flex flex-2 flex-col items-center justify-center rounded-2xl p-8 shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.02]" style={{ backgroundColor: '#14181C', color: '#99AABB' }}>
                    <div className={`text-6xl mb-4 ${result === Status.Win ? 'animate-bounce' : 'animate-pulse'}`}>
                        {result === Status.Win ? <Trophy size={64}/> : <Ban size={64}/>}
                    </div>
                    <h2 className="text-3xl font-extrabold font-serif pb-4 text-center">{title}</h2>
                    <h3 className="text-xl pb-6">
                        {result === Status.Win ? "Congrats! You got it!" : "Not this time, I'm afraid."}
                    </h3>
                    <div className="flex gap-4">
                        <button
                            onClick={() => window.open(`https://letterboxd.com${movie}`, '_blank')}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                        >
                            View on Letterboxd
                        </button>
                        <button
                            className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                                handleModalOpen('stats');
                            }}
                        >
                            See Stats
                        </button>
                    </div>
                </div>
            </div>
    );
    return (
        <>
            {!title ?
                <div className="mx-auto p-4 w-full lg:max-w-2xl rounded-2xl shadow-md m-2 transition-all duration-500 ease-in-out transform hover:scale-[1.02]" style={{'backgroundColor': '#14181C', 'color':'#99AABB'}}>
                    <div className='mx-auto w-9/10 flex'>
                        <div className='pr-3 text-green-500'>{rating}</div>
                        <div className='pr-3 text-orange-400' >{liked ? '♥' : ''}</div>
                        <div className='w-full'>Watched by {reviewer?.innerHTML}</div>
                    </div>
                    <div 
                        ref={scrollContainerRef} 
                        className={`
                            mx-auto w-9/10 flex-1 min-h-60 max-h-60 overflow-y-auto overflow-x-hidden
                            ${applyCentering ? 'flex items-center' : ''}
                          `}
                        >
                        <div ref={contentRef} dangerouslySetInnerHTML={{__html: cleanHtml}} />   
                    </div>
                    <div className='mx-auto w-9/10 flex'>
                        <div>
                            <div>♥ {likes?.innerHTML}</div>
                        </div>
                    </div>
                </div> : 
                <>
                   {renderRevealCard()}
                </>
            }
        </>
    );
};
  
export default Review;