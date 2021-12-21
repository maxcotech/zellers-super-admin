import { CATEGORY_ACTION_TYPES } from "../action_types/CategoryActionTypes";

const initState = {
    categories:[],
    links:[],
    current_link:null,
    category_stack:{
        level_0:{
            categories:[],
            links:[],
            current_link:null
        },
        level_1:{
            categories:[],
            links:[],
            current_link:null
        },
        level_2:{
            categories:[],
            links:[],
            current_link:null
        }
    }
    
}


const CategoryReducer = (state = initState,action) => {
    switch(action.type){
        case CATEGORY_ACTION_TYPES.setCategories:
            const {key,data} = action.payload;
            const category_stack = state.category_stack;
            category_stack[key] = data;
            console.log(category_stack);
            return {...state,category_stack:category_stack};
        case CATEGORY_ACTION_TYPES.setCurrentLink:
            return {...state,current_link:action.payload};
        default: return state;
    }
}

export default CategoryReducer;