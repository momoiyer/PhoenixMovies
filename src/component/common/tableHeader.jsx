import React from 'react';

function TableHeader(props) {
    
    const { columns, sortColumn, onSort } = props;

    const raiseSort = path => {
        const sortedColumn = { ...sortColumn };
        if (sortedColumn.path === path)
            sortedColumn.order = (sortedColumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortedColumn.path = path;
            sortedColumn.order = 'asc';
        }
        onSort(sortedColumn);
    };

    const renderSortIcon = column => {
        if (column.path !== sortColumn.path) return null;

        if (sortColumn.order === 'asc') return <i className='fa fa-sort-asc'> </i>

        return <i className="fa fa-sort-desc"></i>
    };

    return (
        <thead>
            <tr>
                {columns.map(column => (
                    <th className='clickable'
                        key={column.path || column.key}
                        onClick={() => raiseSort(column.path)}>
                        {column.label} {renderSortIcon(column)}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

export default TableHeader;