const { COUNTRY_ACTION_TYPES } = require("../action_types/CountryActionTypes");

const initState = {
    countries:[],
    countries_params:{},
    currencies_params:{},
    current_countries_link:null,
    countries_links:[],
    currencies:[]
}

const CountryReducer = (state = initState, action) => {
    switch(action.type){
        case COUNTRY_ACTION_TYPES.setCountries:
            return {...state,countries:action.payload};
        case COUNTRY_ACTION_TYPES.setCurrencies:
            return {...state,currencies:action.payload};
        case COUNTRY_ACTION_TYPES.setPaginatedCountries:{
            const {data,links} = action.payload;
            return {
                ...state,
                countries:data,
                countries_links:links
            };
        };
        case COUNTRY_ACTION_TYPES.setCurrentCountriesLink:{
            return {...state,current_countries_link:action.payload};
        };
        case COUNTRY_ACTION_TYPES.setCountriesParams:{
            return {...state,countries_params:action.payload};
        }
        case COUNTRY_ACTION_TYPES.setCurrenciesParams:{
            return {...state,currencies_params:action.payload};
        }
        default:return state;
    }
}

export default CountryReducer;