import React from 'react';

function ListGroup(props) {
    const { items, textProperty, valueProperty, selectedGenre, onItemSelect } = props;
    return (
        <div>
            <ul className="list-group">
                    {items.map(item => 
                        <li
                            key={item[valueProperty]}
                            className={selectedGenre === item ? 'list-group-item active' : 'list-group-item'}
                            onClick={() => onItemSelect(item)}
                        >{item[textProperty]}</li>)}
                </ul>            
        </div>
    );
};

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;