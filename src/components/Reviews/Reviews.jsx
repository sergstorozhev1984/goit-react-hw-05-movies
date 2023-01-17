import { NoReviews } from "errors/NoReviews/NoReviews";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getMovieReviews } from "services/Api";
import css from './Reviews.module.css'

export const Reviews = () => {
    const [reviews, setReviews] = useState(null);
    const {movieId} = useParams();

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
    }, [movieId]);

    if (!reviews) return;

    return ( 
        <ul>
            {reviews.length === 0 && <NoReviews />}
            {reviews.map(({id, author, content}) => (
                <li key={id} className={css.item}>
                    <p className={css.author}>Author: {author}</p>
                    <p className={css.content}>{content}</p>
              </li>
            ))}
        </ul>
    )
}