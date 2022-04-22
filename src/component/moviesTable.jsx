import React from 'react';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';

function MoviesTable(props) {
    const { movies, onLike, onDelete, onSort, sortColumn } = props;

    const columns = [
        {   path: 'title', label: 'Title',
            content: movie => <Link to={`/movies/${movie._id}`}> {movie.title} </Link>
        },
        // {path: 'title', label: 'Title'},
        {path: 'genre.name', label: 'Genre'},
        {path: 'numberInStock', label: 'Stock'},
        {path: 'dailyRentalRate', label: 'Rate'},
        {
            key: 'like',
            content: movie => <Like onLike={onLike} movie={movie} />
        },
        {
            key: 'delete',
            content: movie => (
                <button
                    className='btn btn-danger'
                    onClick={() => onDelete(movie)
                    }> Delete </button>)
        }
    ];
    
    return (
        <Table
            data={movies}
            sortColumn={sortColumn}
            columns={columns}
            onSort={onSort}            
        />
    );
}

export default MoviesTable;