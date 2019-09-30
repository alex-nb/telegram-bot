import * as actionTypes from '../actions/actionTypes'

const initialState = {
    employees: [],
    employee: null,
    loading: true,
    error: {}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionTypes.GET_EMPLOYEES:
            return {
                ...state,
                employees: payload,
                loading: false
            }
        case actionTypes.ADD_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees, payload],
                loading: false
            }
        case actionTypes.DELETE_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees].filter(id => id !== payload),
                loading: false
            }
        case actionTypes.EDIT_EMPLOYEE:
            return {
                ...state,
                employees: [...state.employees].map(employee => {
                    if(employee.id === payload.id) {
                        return {
                            ...employee,
                            ...payload.updates
                        }
                    }
                    return employee 
                }),
                loading: false
            }
          
        default:
            return state
    }
}
