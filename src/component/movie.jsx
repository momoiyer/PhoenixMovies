import React, { useState, useEffect } from 'react';
import Like from './common/like.jsx';
import Pagination from './common/pagination.jsx';
import ListGroup from './common/listGroup.jsx';
import MoviesTable from './moviesTable.jsx';
import { getMovies } from '../services/fakeMovieService.js';
import { getGenres } from '../services/fakeGenreService.js';
import { paginate } from '../utils/paginate.js';
import _ from 'lodash';

    
function Movie(props) {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [count, setCount] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedMoive, setSelectedMovie] = useState([]);
    const [sortColumn, setSortColumn] = useState({path: 'title', order: 'asc'});

    useEffect(() => {
        setPageSize(4);
        updateMovieInfo(getMovies());
        setGenres([{ _id: "", name: 'All Genres' }, ...getGenres()]);
        updateGenreSelection(movies,null);
    },[count===-1]);

    const updateMovieInfo = (movies) => {
        setMovies(movies);
        setCount(movies.length);        
        setSelectedMovie(movies);
    }    

    const updateGenreSelection = (movies,genre) => {
        setSelectedMovie(movies);
        setSelectedGenre(genre);
    }

    const handleDelete = (movie) => {
        const newMovies = movies.filter(m => m._id !== movie._id);
        updateMovieInfo(newMovies);
    }

    const handleLike = (movie) => {
        const allMovies = [...movies];    
        const index = allMovies.indexOf(movie);
        allMovies[index].liked = !allMovies[index].liked;
        setMovies(allMovies);
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const paginateMovies = () => {
        return paginate(sortedMovie, currentPage, pageSize);
    }

    const handleGenreSelect = (genre) => {
        setCurrentPage(1);
        if (!genre._id) return updateGenreSelection(movies, genre);
        if (selectedGenre !== genre) return updateGenreSelection(movies.filter(m => m.genre._id === genre._id), genre);
    }

    const handleSort = sortedColumn => {        
        setSortColumn(sortedColumn);
    }

    const sortedMovie = _.orderBy(selectedMoive, [sortColumn.path], [sortColumn.order]);

    return (
        <div>
            {count <= 0 && <p>There are no movies in the database</p>}
            {count > 0 &&
                <div className='row'>
                    <div className='col-2'>
                        <ListGroup
                            items={genres}
                            selectedGenre={selectedGenre}
                            onItemSelect={handleGenreSelect}
                        />
                    </div>
                    <div className='col'>
                        <p>Showing {selectedMoive.length} movies in the database </p>
                        <MoviesTable
                            movies={paginateMovies()}
                            sortColumn={sortColumn}
                            onLike={handleLike}
                            onDelete={handleDelete}
                            onSort={handleSort}
                        />
                        <Pagination
                            itemsCount={selectedMoive.length}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange} 
                    />                 
                </div>
            </div>  
            }
        </div>
    );
}

export default Movie;