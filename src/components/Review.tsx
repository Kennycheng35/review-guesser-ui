import DOMPurify  from 'dompurify'
import { Trophy, Ban } from 'lucide-react';
// import parse from 'html-react-parser'

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

    const renderRevealCard = () => (
        <div className='mx-auto w-5/8 flex gap-4'>
            <div className='flex justify-center items-center flex-1 transition-all duration-500 ease-in-out transform hover:scale-[1.02]'>
                <img  className="h-82 w-auto rounded-lg" src={poster}/>
            </div>
            <div className="flex flex-2 flex-col items-center justify-center rounded-2xl p-8 max-w-xl mx-auto shadow-xl transition-all duration-500 ease-in-out transform hover:scale-[1.02]" style={{ backgroundColor: '#14181C', color: '#99AABB' }}>
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
 
    const cleanHtml = DOMPurify.sanitize(targetElement?.innerHTML || '');

    return (
        <>
            {!title ?
                <div className=" mx-auto p-4 w-1/2 rounded-2xl shadow-md m-2 transition-all duration-500 ease-in-out transform hover:scale-[1.02]" style={{'backgroundColor': '#14181C', 'color':'#99AABB'}}>

                    <div className='mx-auto w-9/10 flex'>
                        <div className='pr-3 text-green-500'>{rating}</div>
                        <div className='pr-3 text-orange-400' >{liked ? '♥' : ''}</div>
                        <div className='w-full'>Watched by {reviewer?.innerHTML}</div>
                    </div>
                    <div className='mx-auto w-9/10 flex-1 min-h-60 max-h-60 flex items-center'>
                        <div dangerouslySetInnerHTML={{__html: cleanHtml}} />   
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