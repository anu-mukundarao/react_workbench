const masterReducer = (state, action) =>{
    switch(action.type) {
        case 'SET_BU_NAME':
            return {
                ...state,
                bu_name: action.payload
            };

            default:
                return state;
    }
}