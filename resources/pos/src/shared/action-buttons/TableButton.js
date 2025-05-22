import React from 'react';
import {Button} from 'react-bootstrap-v5';

const TableButton = ({ButtonValue, to}) => {
    return(
        <div className='text-end order-2 my-2 me-1'>
            <Button type='button' variant='primary' href={to}>{ButtonValue}</Button>
        </div>
    )
}

export default TableButton;
