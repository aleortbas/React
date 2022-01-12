import * as ActionTypes from './ActionTypes';

export const Feedback = (state = {
    errMess: null,
    Feedback: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_FEEDBACK:
            return {...state, isLoading: false, errMess: null, feedback: action.payload};

            case ActionTypes.FEEDBACK_FAILED:
                return {...state, isLoading: false, errMess: action.payload, feedback: []};
              
            case ActionTypes.ADD_FEEDBACK:
                var feedback = action.payload;
                return {...state, feedback: state.feedback.concat(feedback)};
        
            default:
                  return state;     
    }        
}