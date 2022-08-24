import Link from 'next/link'
import Router, { useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import { useStatsContext } from '../context/context'
import { useThemeContext } from '../context/themeContext'
import menu from '../utilts/menu'

function Sidebar() {
    const theme = useThemeContext()
    const router = useRouter()
    const {collapsed} = useStatsContext()

    const handleClick = (url) =>{
        Router.push(url)
    }

    return (
        <SidebarStyled theme={theme} collapsed={collapsed}>
            <nav className="navigation">
                <div className="top-nav">
                    <ul className="nav-items">
                        {
                            menu.map((item) =>{
                                return <li key={item.id} 
                                    className={`nav-item ${router.pathname === item.url ? 'active': null}`}
                                    onClick={() => {
                                        handleClick(item.url)
                                    }}
                                >
                                    {item.icon}
                                    <Link href={item.url}>{item.name}</Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </nav>
            <footer>
                <div className="links">
                    <Link href={'/terms'}>Terms</Link>
                    <Link href={'/privacy'}>Privacy</Link>
                    <Link href={'/help'}>Help</Link>
                </div>
                <p>
                    &copy;Copyright 2022 <Link href={'/'}>SnippetMaster</Link>
                </p>
            </footer>
        </SidebarStyled>
    )
}

const SidebarStyled = styled.div`
    width: ${props => props.collapsed ? props.theme.sidebarCollapsed : props.theme.sidebarWidth };
    background-color: ${props => props.theme.colorBg2};
    position: fixed;
    height: calc(100vh - 8vh);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    i{
        color: ${props => props.theme.colorIcons};
    }
    .active{
        background-color: ${props => props.theme.activeNavLink};
        i{
            color: ${props => props.theme.colorIcons2} !important;
        }
    }
    .navigation{
        margin: 1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        .nav-item{
            padding: ${props => props.collapsed ? '.79rem 2rem' : '.6rem 2rem'  };
            display: grid;
            grid-template-columns: 40px 1fr;
            margin: .3rem 0;
            cursor: pointer;
            position: relative;
            &::after{
                content: '';
                position: absolute;
                transition: all .4s ease-in-out;
                left: 0;
                top: 0;
                width: 0;
                height: 100%;
                background-color: ${props => props.theme.activeNavLinkHover};
                z-index: -1;
            }
            &:hover{
                &::after{
                    width: 100%;
                }
            }
            i{
                display: flex;
                align-items: center;
            }

            a{
                display: ${props => props.collapsed ? 'none': 'initial'};
            }
        }
    }

    footer{
        padding: 1rem 2rem;
        border-top: 1px solid ${props => props.theme.borderColor};
        display: ${props => props.collapsed ? 'none' : 'initial'};
        .links{
            display: flex;
            align-items: center;
            justify-content: center;
            a{
                font-size: ${props => props.theme.fontSmall};
                margin:0 .5rem;
            }
        }
        p{
            font-size: ${props => props.theme.fontSmall};
            text-align: center;
            margin: .5rem 0;
        }
    }
`;

export default Sidebar