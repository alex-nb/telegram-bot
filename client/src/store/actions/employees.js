import * as actionTypes from './actionTypes'
import uuid from 'uuid'


// GET EMPLOYEES
// export const getEmployees = () => async dispatch => {
//     try {
//       const res = await chatBotTestingApi.get('/employees.json');

//       dispatch({
//         type: actionTypes.GET_EMPLOYEES,
//         payload: res.data
//       });
//     } catch (err) {
//       console.error(err)
//     }
//   };



// ADD EMPLOYEE

export const addEmployee = (payload) => ({
  type: actionTypes.ADD_EMPLOYEE,
  payload: {id: uuid.v4(), ...payload}
})

// export const addEmployee = formData => async dispatch => {
//     try {
//       const res = await chatBotTestingApi.post('/employees.json', formData);
//       dispatch({
//         type: actionTypes.ADD_EMPLOYEE,
//         payload: res.data
//       });
//     } catch (err) {
//       console.error(err)
//     }
// }



// DELETE EMPLOYEE
export const deleteEmployee = (id) => ({
    type: actionTypes.DELETE_EMPLOYEE,
    payload: id
})

// export const deleteEmployee = id => async dispatch => {
//   try {
//     await chatBotTestingApi.delete(`/employees.json/${id}`)
//   } catch (err) {

//   }
// }



// EDIT EMPLOYEE
export const editEmployee = (id, updates) => ({
    type: actionTypes.EDIT_EMPLOYEE,
    payload: {
        id,
        updates
    }
})
