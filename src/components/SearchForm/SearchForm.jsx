import { useState } from "react";
import css from './SearchForm.module.css';

export const SearchForm = ({onSubmit}) => {
    const [query, setQuery] = useState('');
    
    const handleChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(query);
    }
  return (
    <form className={css.searchForm} onSubmit={handleSubmit}>
      <input className={css.searchFormInput} type="text" onChange={handleChange} value={query}/>
      <button className={css.searchFormButton} type="submit">Search</button>
    </form>
  );
};
