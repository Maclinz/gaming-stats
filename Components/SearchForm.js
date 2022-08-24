import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStatsContext } from '../context/context'
import { useThemeContext } from '../context/themeContext'
import { search } from '../utilts/Icons'
import { API_KEY } from '../config';


function SearchForm() {
    const theme = useThemeContext()
    const {setSearching, searchGames, popularGames, fetchGames,page_size, upcomingGames } = useStatsContext()

    //state
    const [searchValue, setSearchValue] = useState('')

    const handleChange = (e) =>{
        setSearchValue(e.target.value)
    }

    //handle submit
    const handleSubmit = (e) =>{
        e.preventDefault()
        if(searchValue){
            searchGames(searchValue)
        }
    }

    useEffect(() =>{
        if(searchValue === ''){
            setSearching(false)
            popularGames(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2019-09-01,2022-09-30`)
            fetchGames(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}`)
            upcomingGames(`https://api.rawg.io/api/games?key=${API_KEY}&dates=2022-09-01,2026-12-31&ordering=-added&page_size=${page_size}`)
        }
    }, [searchValue])

    return (
        <SearchFormStyled theme={theme}>
            <div className="input-control">
                <input type="text" placeholder='Search Here...'
                    onChange={handleChange}
                    value={searchValue}
                />
                <button type='submit' className='search' onClick={handleSubmit}>
                    {search}
                </button>
            </div>
        </SearchFormStyled>
    )
}

const SearchFormStyled = styled.form`
    .input-control{
        position: relative;
        input{
            background: ${props => props.theme.colorBg2};
            padding: .6rem .7rem;
            border-radius: ${props => props.theme.borderRadiusSm};
            font-family: inherit;
            width: 400px;
            transition: all .4s ease-in-out;
            color: ${props => props.theme.colorWhite};
            border: 1px solid ${props => props.theme.colorIcons3};
            &:active{
                width: 500px;
                border: 1px solid ${props => props.theme.colorIcons};
            }
            &:focus{
                width: 500px;
                border: 1px solid ${props => props.theme.colorIcons};
            }
            &::placeholder{
                font-weight: 500;
            }
        }

        .search{
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
        }
    }
`;

export default SearchForm