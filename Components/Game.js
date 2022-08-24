import Image from 'next/image';
import React from 'react'
import styled from 'styled-components'
import { useStatsContext } from '../context/context';
import { useThemeContext } from '../context/themeContext';
import noimage from '../assets/noimage.jpg'

function Game({values, click}) {
    const theme = useThemeContext()
    
    const {name, background_image} = values;
    
    return (
        <GameStyled theme={theme} onClick={click}>
            <div className="image">
                <Image
                    alt="Game Picture"
                    layout={'fill'}
                    objectFit={'cover'}
                    priority
                    src={!background_image ? noimage : background_image}
                    style={{
                        borderRadius: theme.borderRadiusSm 
                    }}
                />
            </div>
            <div className="title">
                <h1>
                    {name}
                </h1>
            </div>
        </GameStyled>
    )
}

const GameStyled = styled.div`
    width: 100%;
    background-color: ${props => props.theme.colorBg2};
    border-radius: ${props => props.theme.borderRadiusSm};
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    img{
        transition: all 0.3s ease-in-out;
        border-radius: ${props => props.theme.borderRadiusSm};
    }
    &:hover{
        transition: all 0.3s ease-in-out;
        transform: translateY(-5px);
        img{
            transform: scale(1.1);
        }
    }
    .image{
        height: 500px;
        position: relative;
    }

    .title{
        padding: 2rem;
    }
`;

export default Game