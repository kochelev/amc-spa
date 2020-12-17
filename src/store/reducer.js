const initialState = {
    isDataChanging: false,
    data: {
        personalInfo: {
            currentSavings: 1400000,
            monthIncome: 170000,
            monthRent: 33000,
            startDealMonth: 1,
            finishDealMonth: 5
        },
        useCredit: true,
        creditScheme: {
            interestRate: 18,
            totalMonths: 24
        },
        mortgageSchemes: [
            {
                id: 1,
                title: 'Mortgage Scheme 1',
                initial_payment_percent: 15,
                initial_expencies: 60000,
                schedule: [
                    {
                        interest_rate: 6.1,
                        months: 240
                    }
                ]
            },
            {
                id: 2,
                title: "Mortgage Scheme 2",
                initial_payment_percent: 10,
                initial_expencies: 60000,
                schedule: [
                    {
                        interest_rate: 4.8,
                        months: 20
                    },
                    {
                        interest_rate: 12.0,
                        months: 280
                    }
                ]
            }
        ],
        realties: [
            {
                title: "Primary 1",
                area: 34.0,
                has_mall: true,
                subway_distance: 15,
                region: "London",
                cost: 6000000,
                is_primary: true,
                gotkeys_month: 7,
                repairing: {
                    cost: 300000,
                    months: 3
                },
                settling_expencies: 50000
            },
            {
                title: "Primary 2",
                area: 34.0,
                has_mall: true,
                subway_distance: 15,
                region: "Moscow",
                cost: 6000000,
                is_primary: true,
                gotkeys_month: 17,
                repairing: {
                    cost: 1200000,
                    months: 10
                },
                settling_expencies: 200000
            },
            {
                title: "Primary 3",
                area: 34.0,
                has_mall: true,
                subway_distance: 15,
                region: "Paris",
                cost: 6000000,
                is_primary: true,
                gotkeys_month: 29,
                repairing: {
                    cost: 1200000,
                    months: 3
                },
                settling_expencies: 200000
            },
            {
                title: "Secondary 1",
                area: 34.0,
                has_mall: true,
                subway_distance: 15,
                region: "Rome",
                cost: 6000000,
                is_primary: false,
                repairing: {
                    cost: 1200000,
                    months: 3
                },
                settling_expencies: 200000
            },
            {
                title: "Secondary 2",
                area: 34.0,
                has_mall: true,
                subway_distance: 15,
                region: "Rome",
                cost: 6000000,
                is_primary: false,
                repairing: {
                    cost: 1200000,
                    months: 3
                },
                settling_expencies: 200000
            }
        ]
    },

    isComparing: false,
    comparison: null,

    isDetalizing: false,
    
    
    prerequisites: null,
    realties: [],
    detalization: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {

        // PREREQUISITES

        case 'PREREQUISITES_UPDATE':
            return {
                ...state,
                prerequisites: action.data
            }

        // REALTIES

        case 'REALTY_ADD':
            let updatedRealties = state.realties;
            state.realties.push(action.data);
            return {
                ...state,
                realties: state.realties.push(action.data)
            }
        case 'REALTIES_UPDATE':
            updatedRealties = state.realties;
            console.log(updatedRealties, action.data);
            return {
                ...state,
                realties: null
            }

        // DATA

        case 'DATA_CLEAR':
            return {
                ...state,
                data: null
            }
        
        // COMPARISON

        case 'COMPARE_START':
            return {
                ...state,
                isComparing: true
            }
        case 'COMPARE_SUCCESS':
            return {
                ...state,
                isComparing: false,
                comparison: action.data
            }
        case 'COMPARE_FAIL':
            return {
                ...state,
                isComparing: false
            }
        case 'COMPARISON_CLEAR':
            return {
                ...state,
                comparison: null
            }
        
        // DETALIZATION
        
        case 'DETALIZE_START':
            return {
                ...state,
                isDetalizing: true
            }
        case 'DETALIZE_SUCCESS':
            return {
                ...state,
                isDetalizing: false,
                detalization: action.data
            }
        case 'DETALIZE_FAIL':
            return {
                ...state,
                isDetalizing: false
            }
        case 'DETALIZATION_CLEAR':
            return {
                ...state,
                detalization: null
            }
        
        // DEFAULT

        default:
            console.log('Unknown action at /amc-spa/src/store/reducer.js');
    }
    
    return state;
};

export default reducer;