import * as actionTypes from './actionTypes'
import axios from 'axios'

// export const addTest = (formData) => ({
//     type: actionTypes.ADD_TEST,
//     payload: {
//         id: uuid.v4(),
//         ...formData
//     }
// })


export const addTest = test => async dispatch => {
    try {
        const res = await axios.post('http://pptp.pinkomp.ru:8080/server/api/posts', test);
        console.log('send request to pptp');
        dispatch({
            type: actionTypes.ADD_TEST,
            payload: test
        });
    } catch (err) {
        console.error(err)
        dispatch({
            type: actionTypes.ADD_TEST,
            payload: test
        });
    }
}