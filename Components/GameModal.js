import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { useStatsContext } from '../context/context'
import {useThemeContext} from '../context/themeContext'
import { play, star, starHalf } from '../utilts/Icons'
import Button from './Button'
import playstation from '../assets/playstation.svg'
import xbox from '../assets/xbox.svg'
import nitendo from '../assets/nitendo.svg'
import steam from '../assets/steam.svg'
import apple from '../assets/apple.svg'
import windows from '../assets/windows.svg'
import android from '../assets/android.svg'
import gamepad from '../assets/gamepad.svg'

function GameModal() {
    const theme = useThemeContext()
    const {closeModal, game_data} = useStatsContext()
    const { name, platforms, rating, genres, background_image, website, reddit_url, description_raw, background_image_additional } = game_data;


    //playforms
    const platformItem = (plat) =>{
        switch (plat){
            case 'PlayStation 4' || 'PlayStation 3' || 'PlayStation 2' || 'PlayStation 5' || 'PlayStation':
                return <Image src={playstation} alt="PlayStation 4" width={28} height={28} />
            case 'Xbox One' || 'Xbox 360' || 'Xbox Series X' || 'Xbox Series S/X':
                return <Image src={xbox} alt="Xbox One" width={28} height={28} />
            case 'Nintendo Switch' || 'Nintendo 3DS' || 'Nintendo':
                return <Image src={nitendo} alt="Nintendo Switch" width={28} height={28} />
            case 'PC' || 'Windows' || 'Windows 7':
                return <Image src={windows} alt="PC" width={28} height={28} />
            case 'Mac' || 'MacOS' || 'MacOSX' || 'Mac OS X':
                return <Image src={steam} alt="Mac" width={28} height={28} />
            case 'iOS' || 'iPhone' || 'iPad' || 'iPod' || 'iPod touch':
                return <Image src={apple} alt="iOS" width={28} height={28} />
            case 'Android' || 'Android OS' || 'Android Tablet':
                return <Image src={android} alt="Android" width={28} height={28} />
            default:
                return ''
        }
    }

    //rating stars
    const displayStars = Array.from({length: 5}, (_,index) =>{
        const num = index + 0.5
        return <span key={index}>
            {
                rating >= index + 1 ? (star) : rating >= num ? (starHalf) : ''
            }
        </span>
    })

    return (
        <GameModalStyled theme={theme}>
            <div className="modal-content">
                <div className="top-modal">
                    <div className="name">
                        <h1>{name}</h1>
                        <div className="rating">
                            <p>Rating</p>
                            {
                                rating ? displayStars : <span>No Rating</span> 
                            }
                            {`(${rating})`}
                        </div>
                    </div>
                    <div className="platforms">
                        <h1>Platforms</h1>
                        <div className="icons">
                            {
                                platforms.map((plat) => {
                                    return <span key={plat.platform.id}>
                                        {
                                            platformItem(plat.platform.name)
                                        }
                                    </span>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="image">
                    <Image
                        src={background_image_additional}
                        alt="Game Picture"
                        layout={'fill'}
                        objectFit={'cover'}
                        priority
                        style={{
                            borderRadius: theme.borderRadiusSm,
                        }}
                    />
                    <div className="play">
                        <a href={website}>
                            {play}
                        </a>
                    </div>
                </div>
                <div className="genres">
                    {
                        genres.map((genre) =>{
                            return <Button
                                        name={genre.name}
                                        key={genre.id}
                                        background={theme.buttonGradient5}
                                        padding={'.4rem 1rem'}
                                        borderRad={'12px'}
                                    />
                        })
                    }
                </div>
                <div className="desc">
                    <p>
                        {description_raw}
                    </p>
                </div>
            </div>

            <div className="modal-hider" onClick={closeModal}></div>
        </GameModalStyled>
    )
}

const GameModalStyled = styled.div`
    width: 100%;
    min-height: 100vh;
    z-index: 10;
    position: fixed;
    top: 0;
    .modal-hider{
        width: 100%;
        height: 100%;
        background-color: ${props => props.theme.colorIcons4};
        position: absolute;
        top: 0;
        backdrop-filter: blur(3px);
    }

    .top-modal{
        display: flex;
        justify-content: space-between;
        .name{
            display: flex;
            flex-direction: column;
            p{
                font-weight: 500;
                margin: .5rem 0;
                font-size: 20px;
            }
            span{
                margin-right: .3rem;
                i{
                    color: #FDCC0D;
                }
            }
            h1{
                font-size: 2.5rem;
                font-weight: 800;
                background: linear-gradient(to  right, #CF57A3 50.2%, #4731B6 110%);
                background-clip: text;
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                color: transparent;
            }
        }

        .platforms{
            display: flex;
            flex-direction: column;
            align-items: center;
            h4{
                font-size: 24px;
                color: ${props => props.theme.colorGrey0};
            }
            .icons{
                display: flex;
                align-items: center;
                span{
                    margin-top: 1rem;
                    &:not(:last-child){
                        margin-right: 1rem;
                    }
                }
            }
        }
    }

    .modal-content{
        position: absolute;
        width: 64%;
        max-height: 90vh;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: ${props => props.theme.colorBg2};
        padding: 2.5rem;
        border-radius: ${props => props.theme.borderRadiusSm};
        box-shadow: ${props => props.theme.shadow3};
        z-index: 15;
        overflow-y: auto;
        &::-webkit-scrollbar {
            width: 0.5rem;
        }
        .image{
            position: relative;
            height: 500px;
            margin: 1rem 0;
            .play{
                position: absolute;
                bottom: 5%;
                left: 5%;
                a{
                    padding: 1rem;
                    width: 60px;
                    background-color: ${props => props.theme.colorBg2};
                    height: 60px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    i{
                        font-size: 1.5rem;
                    }
                }
            }
            
        }

        .genres{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 1rem;
            button{
                margin-right: .5rem;
                transition: all .2s ease-in-out;
                border: 1px solid ${props => props.theme.colorIcons};
                &:hover{
                    box-shadow: ${props => props.theme.shadow5};
                }
            }
        }
    }
`;

export default GameModal