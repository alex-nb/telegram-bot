import * as actionTypes from '../actions/actionTypes'

const initialState = {
    tests: [],
    loading: true,
    error: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.ADD_TEST:
            return { 
                ...state, 
                tests: [...state.tests, payload],
                loading: false 
            }

        default:
            return state
    }
}
