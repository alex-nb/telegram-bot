import * as actionTypes from './actionTypes'
import uuid from 'uuid'

// ADD_CHATBOT
export const addChatBot = (
    {
        apiKey = '',
        name = '',
        listOfTests = [],
        type = ''
    } = {}
) => ({
    type: actionTypes.ADD_CHATBOT,
    payload: {
        id: uuid.v4(),
        apiKey,
        name,
        listOfTests,
        type
    }
})

// EDIT_CHATBOT
export const editChatBot = (updatedChatBot) => ({
    type: actionTypes.EDIT_CHATBOT,
    payload: { updatedChatBot }
})

// DELETE_CHATBOT
export const deleteChatBot = ({id}={}) => {

    return {
        type: actionTypes.DELETE_CHATBOT,
        payload: { id }
    }
}






