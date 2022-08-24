import React, { useContext, useEffect, useReducer, useState } from "react"
import { BEGIN_DATA_FETCH, CLOSE_MODAL, COLLAPSE_MENU, DATA_FETCHED, FETCH_GAME, FETCH_GAME_BEGIN, OPEN_MODAL, PAGE_SIZE, POPULAR_DATA_FETCHED, SEARCH_DATA_FETCHED, UPCOMING_GAMES } from "../utilts/actions"
import reducer from '../reducers/statsReducer';
import {API_KEY} from '../config'
import axios from "axios";

const baseUrl = `https://api.rawg.io/api/games?key=${API_KEY}`

const StatsContext = React.createContext()

export const ContextProvider = ({ children }) => {

    const initialState = {
        collapsed: false,
        loading: false,
        page_size: 12,
        modal_open: false,
        modal_id: null,
        game_data: {
            platforms: [],
            genres: []
        },
        homepage_games: [],
        popular_games: [],
        upcoming_games: [],
        games: [],
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [searching, setSearching] = useState(false)


    //fetch games
    const fetchGames = async (url) => {
        dispatch({type: BEGIN_DATA_FETCH})
        try {
            const res = await axios.get(url)
            dispatch({
                type: DATA_FETCHED,
                payload: res.data.results
            })
        } catch (error) {
            console.log(err);
        }
    }

    //fetch Game
    const fetchGame = async (id) =>{
        dispatch({type:FETCH_GAME_BEGIN})
        const game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

        dispatch({
            type: FETCH_GAME,
            payload: game.data
        })
    }

    //popular games
    const popularGames = async (url) => {
        dispatch({ type: BEGIN_DATA_FETCH })
        try {
            const res = await axios.get(url)
            dispatch({
                type: POPULAR_DATA_FETCHED,
                payload: res.data.results
            })
        } catch (error) {
            console.log(err);
        }
    }

    //popular games
    const upcomingGames = async (url) => {
        dispatch({ type: BEGIN_DATA_FETCH })
        try {
            const res = await axios.get(url)
            dispatch({
                type: UPCOMING_GAMES,
                payload: res.data.results
            })
        } catch (error) {
            console.log(err);
        }
    }

    //search games
    const searchGames = async (search) => {
        dispatch({ type: BEGIN_DATA_FETCH })
        try {
            const res = await axios.get(`${baseUrl}&search=${search}&page_size=${state.page_size}`)
            dispatch({
                type: SEARCH_DATA_FETCHED,
                payload: res.data.results
            })
            setSearching(true)
        } catch (error) {
            console.log(err);
        }
    }

    //collapse menu
    const collapseMenu = () =>{
        dispatch({
            type: COLLAPSE_MENU
        })
    }

    //open modal
    const openModal = (id) =>{
        dispatch({
            type: OPEN_MODAL,
            payload: id
        })
    }
    //close modal
    const closeModal = () =>{
        dispatch({
            type: CLOSE_MODAL
        })
    }

    //increase page side
    const increasePagesize = () =>{
        dispatch({
            type:PAGE_SIZE,
            payload: state.page_size + 4
        })
    }


    //fect game item
    const fetchClickedGame = async (id) => {
        fetchGame(id)
    }


    console.log(state)
    

    //fetch homepage games and upcoming games
    useEffect(() =>{
        fetchGames(`${baseUrl}&page_size=${state.page_size}`)
        popularGames(`${baseUrl}&page_size=${state.page_size}&dates=2011-09-01,2021-12-10`)
        upcomingGames(`${baseUrl}&dates=2022-09-01,2023-12-10&ordering=-added&page_size=${state.page_size}`)
    },[state.page_size])


    return (
        <StatsContext.Provider value={{    
            ...state, 
            collapseMenu, 
            increasePagesize,
            fetchClickedGame,
            openModal,
            closeModal,
            searching,
            setSearching,
            searchGames,
            popularGames,
            upcomingGames,
            fetchGames
            }}>
                {children}
        </StatsContext.Provider>
    )
}

export const useStatsContext = () => {
    return useContext(StatsContext)
}