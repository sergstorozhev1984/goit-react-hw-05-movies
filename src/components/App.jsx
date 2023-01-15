import { Home } from "../pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Movies } from "pages/Movies/Movies";
import { Layout } from "./Layout/Layout";
import { MovieDetails } from "pages/MovieDetails/MovieDetails";

export const App = () => {
  return (
    <Layout>
    <Routes >
      <Route path="/" element={<Home/>} />
      <Route path="/movies" element={<Movies/>} />
      <Route path="/movies/:movieId" element={<MovieDetails/>} />
    </Routes>
    <ToastContainer autoClose={3000} />
    </Layout>
  );
};





