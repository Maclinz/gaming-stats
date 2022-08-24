import React from 'react'
import styled from 'styled-components'
import { useStatsContext } from '../context/context';
import { useThemeContext } from '../context/themeContext';

function MainContent({children}) {
    const theme = useThemeContext()
    const { collapsed } = useStatsContext()

    return (
        <MainContentStyled theme={theme} collapsed={collapsed}>
            {children}
        </MainContentStyled>
    )
}

const MainContentStyled = styled.main`
    min-height: 100vh;
    background-color:${props => props.theme.colorBg3};
    margin-top: 8vh;
    padding: 2rem 1.5rem;
    margin-left: ${props => props.collapsed ? props.theme.sidebarCollapsed : props.theme.sidebarWidth};
`;

export default MainContent