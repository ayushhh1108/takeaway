const initialState = {
    AccountData: {},
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case "POST_SIGNIN_API":
            return {
                ...state,
                AccountData: action.payload
            }
        default:
            return state
    }
}

export default Reducer;
