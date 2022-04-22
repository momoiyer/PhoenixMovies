import React, {useState,useEffect} from 'react';

function Like(props) {
    const { movie, onLike } = props;
    return (
        <div>
            <i className={movie.liked ? "fa fa-heart" :  "fa fa-heart-o" }
                onClick={() => onLike(movie)}/> 
        </div>
    );
}

export default Like;