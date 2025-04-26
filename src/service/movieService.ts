import apiClient from "./apiClient";

export const getMovie = async (date:string) => {
    const movie = await apiClient.get(`/movie?date=${date}`);
    return movie.data;
}

export const getMovieSuggestions = async () => {
    const movieSuggestions = await apiClient.get('/movieSuggestions');
    return movieSuggestions.data;
}