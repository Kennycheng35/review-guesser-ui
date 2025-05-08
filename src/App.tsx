import { useEffect, useState } from 'react'

import './App.css'
import { useMovie, useMovieSuggestions } from './hooks/useMovie'
import HeaderBar from './layout/Header'
import ReviewCarousel from './components/ReviewCarousel'
import Modal from "./components/Modal"
import { resetLocalStorage } from './util/resetLocalStorage'
import Stats from './components/Stats'
import HowToPlay from './components/HowToPlay'
import { DateTime } from 'luxon';
import { Loader } from 'lucide-react';

type Review = {
  id: number;
  review: string;
  difficulty: number;
  innerhtml: string;
  liked: boolean;
  rating: string;
}

function App() {
  const { data: movie, isLoading: isMovieLoading } = useMovie(DateTime.now().toISODate());
  const { query, setQuery, suggestions, isLoading: isMovieSuggestionLoading } = useMovieSuggestions();
  // console.log('this is movie', movie);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<string | null>(null);
  console.log(movie);
  useEffect(() => {
    resetLocalStorage(['currentIndex','result','visibleButtons', 'winScore']);
  },[]);

  const handleModalOpen = (content: string | null) =>{
    setModalContent(content);
    setModalOpen(true);
  }

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <HeaderBar handleModalOpen={handleModalOpen}/>
        {(isMovieLoading || !movie) ? 
        <div className='animate-pulse mx-auto py-40 animate-spin'>
          <Loader size={64}/>
        </div>
        : <ReviewCarousel 
          // slides={(movie?.reviews ?? []).sort((a: Review, b: Review) => a.id < b.id)} 
          slides={movie?.reviews ?? []} 
          value={query} 
          onChange={setQuery}
          suggestions={suggestions}
          isMovieSuggestionLoading={isMovieSuggestionLoading}
          movie={movie?.link}
          title={movie?.title}
          poster={movie?.poster}
          handleModalOpen={handleModalOpen}
          />}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        {modalContent === 'stats' ?<Stats /> : <HowToPlay />}
      </Modal>
    </>
  )
}

export default App
