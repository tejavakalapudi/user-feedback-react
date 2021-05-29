import asyncLocalStorage from '../../utils/asyncLocalStorage';

export const CREATE_FEEDBACK = "CREATE_FEEDBACK";
export const SET_FEEDBACKS = "SET_FEEDBACKS";
export const DELETE_FEEDBACK = "DELETE_FEEDBACK";

const initialState = {
    feedbacks: []
};

export const fetchFeedbacks = () => async (dispatch) => {
  // Here we'd typically make an API call to get all feedbacks
  const prevFeedbacks = await asyncLocalStorage.getItem("feedbacks") || [];

  return dispatch({
    type : SET_FEEDBACKS,
    payload: JSON.parse(prevFeedbacks)
  });
};

export const addNewFeedback = (payload) => async (dispatch, getState) => {

  const {feedbacks} = getState().feedbackStore;

  // Saving item into database via API
  await asyncLocalStorage.setItem("feedbacks", JSON.stringify([...feedbacks, payload]))

  return dispatch({
    type : CREATE_FEEDBACK,
    payload
  });
};

export const deleteFeedback = ( id ) => ({
    type : DELETE_FEEDBACK,
    id    
});

export default (state = initialState, action) => {
    switch (action.type) {
      case CREATE_FEEDBACK:
        return {
          ...state,
          feedbacks: [...state.feedbacks, action.payload]
        }
  
      case DELETE_FEEDBACK:
        return {
          ...state,
          feedbacks: state.feedbacks.filter(x => x.id !== action.id)
        }
    
      case SET_FEEDBACKS:
        return {
          ...state,
          feedbacks: action.payload
        }
      default:
        return state
    }
}


