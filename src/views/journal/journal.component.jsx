import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllByCreatedAtBetweenFromDivision, getAllByCreatedAtBetweenToDivision, testRequest } from '../../store/features/statistics/statistics.actions';

const Journal = () => {
    // const {} = useSelector()
    const dispatch = useDispatch()

    const getAllByCreatedAtBetweenHandler = () => {
        dispatch(getAllByCreatedAtBetweenToDivision())
    }


    return (
        <div>
            <button onClick={()=>getAllByCreatedAtBetweenHandler()}>getData</button>
        </div>
    );
};

export default Journal;