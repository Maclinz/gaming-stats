import { BEGIN_DATA_FETCH, CLOSE_MODAL, COLLAPSE_MENU, DATA_FETCHED, FETCH_GAME, FETCH_GAME_BEGIN, OPEN_MODAL, PAGE_SIZE, POPULAR_DATA_FETCHED, SEARCH_DATA_FETCHED, UPCOMING_GAMES } from "../utilts/actions";


const statsReducer = (state, action) =>{

    if(action.type === COLLAPSE_MENU){
        return {...state, collapsed: !state.collapsed}
    }

    if(action.type === BEGIN_DATA_FETCH){
        return {...state, loading: true}
    }
    
    if(action.type === DATA_FETCHED){
        return { ...state, homepage_games: action.payload , loading: false}
    }

    if(action.type === PAGE_SIZE){
        return { ...state, page_size: action.payload}
    }

    //open modal
    if(action.type === OPEN_MODAL){
        return { ...state,modal_open: true, modal_id: action.payload}
    }

    //open modal
    if(action.type === CLOSE_MODAL){
        return { ...state,modal_open: false, modal_id: null}
    }

    //fetch game
    if (action.type === FETCH_GAME_BEGIN) {
        return { ...state, loading:true }
    }
    if (action.type === FETCH_GAME) {
        return { ...state,game_data:action.payload, loading:false }
    }

    //popular games
    if (action.type === POPULAR_DATA_FETCHED) {
        return { ...state, popular_games: action.payload, loading: false }
    }

    //upcoming games
    if (action.type === UPCOMING_GAMES) {
        return { ...state, upcoming_games: action.payload, loading: false }
    }

    //upcoming games
    if (action.type === SEARCH_DATA_FETCHED) {
        return { 
            ...state, 
            games:action.payload ,
            upcoming_games: [], 
            popular_games:[],
            upcoming_games: [],
            homepage_games: [],
            loading: false 
        }
    }

    return {...state}
}

export default statsReducer;