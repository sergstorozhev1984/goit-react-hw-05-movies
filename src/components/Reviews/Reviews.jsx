import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovieReviews } from "services/Api";

export const Reviews = () => {
    const [reviews, setReviews] = useState(null);
    const movieId = useParams();

    useEffect(() => {
      const fetchMovieReviews = async movieId => {
        try {
            const movieReviews = await getMovieReviews(movieId);
            setReviews(movieReviews);
        } catch (error) {
            toast.error(`Oops! Something went wrong! ${error}`);
        }
      }
    
      fetchMovieReviews(movieId);
    }, [movieId])
    
    if (!reviews) {
        return;
      }

    return (
        <>
            <h2>Author: {}</h2>
            <p></p>
        </>
    )
}