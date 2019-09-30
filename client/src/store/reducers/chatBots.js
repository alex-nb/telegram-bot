import * as actionTypes from '../actions/actionTypes'

const initialState = {
    chatBots: [],
    chatBot: null,
    loading: true,
    error: {}
  };

export default (state = initialState, { type, payload }) => {


    switch (type) {
        case actionTypes.ADD_CHATBOT:
            return {
                ...state,
                chatBots: [...state.chatBots, payload],
                chatBot: payload, 
                loading: false
            } 
        case actionTypes.EDIT_CHATBOT:
            return {
                ...state,
                chatBots: state.chatBots.map((chatBot) => {
                    if(chatBot.id === payload.updatedChatBot.id) {
                        return {
                            ...chatBot,
                            ...payload.updatedChatBot
                        }
                    }
                    return chatBot
                })
            }
        case actionTypes.DELETE_CHATBOT:
            return {
                ...state,
                chatBots: state.chatBots.filter(({ id }) => id !== payload.id)
            }

        default:
            return state
    }
}
