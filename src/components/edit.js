
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

// useNavigate is a hook provided by React Router.
// it returns a function that enables navigation
// to different routes.
// One user submits the updated movie data,
// the update is saved and useNavigate is called
// to redirect to the Read page.
import { useNavigate } from "react-router-dom";

export default function Edit() {
  let { id } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");
  const navigate = useNavigate();

// useEffect() is a lifecycle hook that allows us to
// synchronise with an external system.
// Allows us to access the params of the current route.
// With it, we can get the movie id.
// We can retrieve data from the DB.
// Easy to load and edit for a single movie.
useEffect(() => {
    axios.get('http://localhost:4000/api/movie/' + id)
        .then((response) => {
            setTitle(response.data.title);
            setYear(response.data.year);
            setPoster(response.data.poster);
        })
        .catch((error) => {
            console.log(error);
        });
}, [id]);

// post put new movie with user details to DB.
// Then, log response from server,
// and navigate back to Read page
const handleSubmit = (event) => {
    event.preventDefault();
    const newMovie = { id, title, year, poster };
    axios.put('http://localhost:4000/api/movie/' + id, newMovie)
        .then((res) => {
            console.log(res.data);
            navigate('/read');
        });
}

return (
    <div>
        {/* For new movie details input */}
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Movie Title: </label>
                <input type="text" 
                className="form-control" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Release Year: </label>
                <input type="text" 
                className="form-control" 
                value={year} 
                onChange={(e) => setYear(e.target.value)} />
            </div>
            <div className="form-group">
                <label>Poster URL: </label>
                <input type="text" 
                className="form-control" 
                value={poster} 
                onChange={(e) => setPoster(e.target.value)} />
            </div>
            <div className="form-group">
                <input type="submit" value="Edit Movie" className="btn btn-primary" />
            </div>
        </form>
    </div>
);
}
