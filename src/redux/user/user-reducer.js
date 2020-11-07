const INITIAL_STATE = {
    user : null
}

const userReducer = (state= INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                user : action.payload
            }
        default:
            break;
    }
}

export default userReducer