// TODO: make reducer as a dictionary, but not switch-case statement

const initialState = {
    prerequisites: null,
    isRealtyListUpdated: true,
    realtyList: [],
    detalization: null,
};

const handler = (updatedState) => {
    sessionStorage.setItem('amc', JSON.stringify(updatedState));
    return updatedState
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case 'INIT':
            const updatedState0 = {
                ...action.data
            };
            return handler(updatedState0);

        // PREREQUISITES

        case 'UPDATE_PREREQUISITES':
            const updatedState1 = {
                ...state,
                prerequisites: action.prerequisites
            };
            return handler(updatedState1);

        // REALTIES

        case 'ADD_REALTY':
            const updatedState2 = {
                ...state,
                realtyList: [
                    ...state.realtyList,
                    action.newRealty
                ]
            };
            return handler(updatedState2);
        case 'UPDATE_REALTY':
            const indexToUpdate = state.realtyList.findIndex(x => x.id === action.updatedRealty.id);
            const updatedState3 = {
                ...state,
                realtyList: [
                    ...state.realtyList.slice(0, indexToUpdate),
                    action.updatedRealty,
                    ...state.realtyList.slice(indexToUpdate + 1)
                ]
            };
            return handler(updatedState3);
        case 'UPDATE_ALL_REALTIES':
            const updatedState4 = {
                ...state,
                realtyList: action.updatedRealties,
                isRealtyListUpdated: true
            };
            return handler(updatedState4);
        case 'UPDATE_ALL_REALTIES_FAIL':
            const updatedState5 = {
                ...state,
                isRealtyListUpdated: false
            };
            return handler(updatedState5);
        case 'DELETE_REALTY':
            const indexToDelete = state.realtyList.findIndex(x => x.id === action.id);
            const updatedState6 = {
                ...state,
                realtyList: [
                    ...state.realtyList.slice(0, indexToDelete),
                    ...state.realtyList.slice(indexToDelete + 1)
                ]
            };
            return handler(updatedState6);
        case 'DELETE_ALL_REALTIES':
            const updatedState7 = {
                ...state,
                realtyList: []
            };
            return handler(updatedState7);

        // DETALIZATION
        
        case 'SET_DETALIZATION':
            const updatedState8 = {
                ...state,
                detalization: action.data
            };
            return handler(updatedState8);

        case 'DELETE_DETALIZATION':
            const updatedState9 = {
                ...state,
                detalization: null
            };
            return handler(updatedState9);
        
        // DEFAULT

        default:
            break;
            // console.log('Unknown action at /amc-spa/src/store/reducer.js', action.type);
    }
    
    return state;
};

export default reducer;