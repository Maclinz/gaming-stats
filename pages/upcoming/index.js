import React from 'react'
import styled from 'styled-components'
import Button from '../../Components/Button'
import Game from '../../Components/Game'
import Layout from '../../Components/Layout'
import MainContent from '../../Components/MainContent'
import { useStatsContext } from '../../context/context'
import { useThemeContext } from '../../context/themeContext'
import { down } from '../../utilts/Icons'

function Upcoming() {
    const {searching, upcoming_games, fetchClickedGame, openModal, games, loading, increasePagesize } = useStatsContext()
    const theme = useThemeContext()

    return (
        <Layout>
            <MainContent>
                <UpcomingGamesStyled theme={theme}>
                    {
                        !searching && upcoming_games.map((game) => {
                            return <Game
                                key={game.id}
                                values={{ ...game }}
                                click={() => {
                                    fetchClickedGame(game.id)
                                    openModal(game.id)
                                }}
                            />
                        })
                    }
                    {
                        searching && games.map((game) => {
                            return <Game
                                key={game.id}
                                values={{ ...game }}
                                click={() => {
                                    fetchClickedGame(game.id)
                                    openModal(game.id)
                                }}
                            />
                        })
                    }
                </UpcomingGamesStyled>
                <div className="load-more">
                    <Button
                        name={'Load More'}
                        blob={'blob'}
                        padding={'.7rem 1.2rem'}
                        borderRad={'10px'}
                        fw={'bold'}
                        fs={'1.2rem'}
                        icon={down}
                        background={theme.colorPrimary}
                        click={increasePagesize}
                    />
                </div>
            </MainContent>
        </Layout>
    )
}

const UpcomingGamesStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 2rem;
`;

export default Upcoming