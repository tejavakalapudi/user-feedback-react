import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import feedbackStore from './feedbacks';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  feedbackStore
})
export default createRootReducer;