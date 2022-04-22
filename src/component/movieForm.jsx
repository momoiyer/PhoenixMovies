import React from 'react';

function MovieForm(props) {
    const handleSave = () => {
        props.history.push("/movies");
    }
    return (
        <div>
            <h1>Movie Form {props.match.params.id}</h1>
            <button
                className="btn btn-primary"
                onClick={handleSave}
            >Save</button>
        </div>
    );
}

export default MovieForm;