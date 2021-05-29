import React, {useEffect} from 'react';
import { Route, useRouteMatch } from "react-router-dom";
import {useDispatch} from 'react-redux';

import NewFeedback from './NewFeedback';
import FeedbacksView from './FeedbacksView';

import {fetchFeedbacks} from '../../store/modules/feedbacks';

const FeedbackContainer = () => {
    const { url } = useRouteMatch();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFeedbacks())
    }, []);

    return (
        <div>
            <Route exact path={`${url}`} component={FeedbacksView}/>
            <Route exact path={`${url}/new`} component={NewFeedback}/>
        </div>
    )
};

export default FeedbackContainer;