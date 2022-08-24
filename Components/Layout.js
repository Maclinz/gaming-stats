import React from 'react'
import { useStatsContext } from '../context/context'
import GameModal from './GameModal'
import Header from './Header'
import Sidebar from './Sidebar'

function Layout({children}) {
    const {modal_open} = useStatsContext()
    return (
        <React.Fragment>
            <Header />
            <Sidebar />
            {
                modal_open && <GameModal />
            }
            {children}
        </React.Fragment>
    )
}

export default Layout