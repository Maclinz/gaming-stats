import Image from 'next/image';
import React from 'react'
import styled from 'styled-components'
import { useStatsContext } from '../context/context';
import { useThemeContext } from '../context/themeContext';
import {bars ,discord,moon } from '../utilts/Icons'
import logo from '../utilts/logo.svg'
import Button from './Button';
import SearchForm from './SearchForm';

export default function Header() {
    const theme = useThemeContext()
    const {collapseMenu} = useStatsContext()
    return (
        <HeaderStyled theme={theme}>
            <div className="logo-con">
                <div className="h-menu">
                    <button type='button' onClick={collapseMenu}>
                        {bars}
                    </button>
                </div>
                <div className="logo">
                    <Image src={logo} width={40} height={40} />
                    <h4>GameStats</h4>
                </div>
            </div>
            <div className="user-content">
                <div className="form-con">
                    <SearchForm />
                </div>
                <button className="h-btn theme">
                    {moon}
                </button>
                <Button 
                    name={'Join'}
                    selector={'btn-login'}
                    padding={'.6rem 2rem'}
                    borderRad={'0.8rem'}
                    fw={'bold'}
                    fs={'1.2rem'}
                    background={theme.colorPrimary2}
                    blob={'blob'}
                    icon={discord}
                />
            </div>
        </HeaderStyled>
    )
}

const HeaderStyled = styled.header`
    height: 8vh;
    width: 100%;
    background-color: ${props => props.theme.colorBg};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${props => props.theme.padLRSm};
    z-index: 3;
    position: fixed;
    top: 0;
    i{
        color: ${props => props.theme.colorIcons};
        font-size: 1.5rem;
    }
    .logo-con{
        display: flex;
        align-items: center;
        .h-menu{
            button{
                outline: none;
                border: none;
                background: transparent;
                cursor: pointer;
                margin-right: 1rem;
                i{
                    font-size: 1.5rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    &:hover{
                        color: ${props => props.theme.colorIcons2};
                        transition: all .4s ease-in-out;
                    }
                }
            }
        }
        .logo{
            display: flex;
            align-items: center;
        }
        h4{
            font-size: ${props => props.theme.fH4};
            margin-left: .5rem;
            color: ${props => props.theme.colorGrey0};
        }
    }

    .user-content{
        display: flex;
        align-items: center;
        .h-btn{
            margin: ${props => props.theme.marLRSm};
        }
        i{
            transition: all .3s ease-in-out;
        }
    }
`;
