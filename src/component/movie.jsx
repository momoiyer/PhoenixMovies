import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Pagination from './common/pagination.jsx';
import ListGroup from './common/listGroup.jsx';
import MoviesTable from './moviesTable.jsx';
import { getMovies } from '../services/fakeMovieService.js';
import { getGenres } from '../services/fakeGenreService.js';
import { paginate } from '../utils/paginate.js';
import Input from './common/input.jsx';

    
function Movie(props) {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [count, setCount] = useState(-1);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedMoive, setSelectedMovie] = useState([]);
    const [sortColumn, setSortColumn] = useState({ path: 'title', order: 'asc' });
    const [searchQuery, setSearchQuery] =  useState('');

    useEffect(() => {
        setPageSize(4);
        updateMovieInfo(getMovies());
        setGenres([{ _id: "", name: 'All Genres' }, ...getGenres()]);
        updateGenreSelection(movies, null);
    },[count===-1]);

    const updateMovieInfo = (movies) => {
        setMovies(movies);
        setCount(movies.length);        
        setSelectedMovie(movies);
    }    

    const updateGenreSelection = (movies, genre) => {
        setSelectedMovie(movies);
        setSelectedGenre(genre);
        setCurrentPage(1);
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
        setSearchQuery('');
        if (!genre._id) return updateGenreSelection(movies, genre);
        if (selectedGenre !== genre) return updateGenreSelection(movies.filter(m => m.genre._id === genre._id), genre);
    }

    const handleSort = sortedColumn => {        
        setSortColumn(sortedColumn);
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        
        updateGenreSelection(movies, null);
        
        if (query) {
            const searchedMovies = movies.filter(m => {
                if (m.title.toLowerCase().includes(query.toLowerCase())) return m;
            });
            setSelectedMovie(searchedMovies);
        }        
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
                        <Link
                            className='btn btn-primary'
                            to="movie/new"
                            style={{marginBottom: 20}}>
                            New Movie
                        </Link>
                        <p>Showing {selectedMoive.length} movies in the database </p>
                        
                        <Input
                            value={searchQuery}
                            placeholder="Search..."
                            onChange={e=> handleSearch(e.currentTarget.value)}
                        />
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