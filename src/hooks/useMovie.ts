import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { getMovie, getMovieSuggestions } from '../service/movieService';
import { useDebounce } from './useDebounce';

export const useMovie = (date: string) => {
    return useQuery({
        queryKey:['movie', date], 
        queryFn:() => getMovie(date),
        enabled: !!date,
    });
}

export const useMovieSuggestions = () => {
    const { data: movies, isLoading } = useQuery({
        queryKey: ["movieSuggestions"],
        queryFn: getMovieSuggestions
    });

    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query, 500);

    const filteredMovies = useMemo(() => {
        if (!debouncedQuery) return [];
        return movies.filter((movie: any) => 
            movie.title.toLowerCase().includes(debouncedQuery.toLowerCase())
        );
    }, [debouncedQuery, movies]);

    return {
        query,
        setQuery,
        suggestions: filteredMovies,
        isLoading
    };
};
