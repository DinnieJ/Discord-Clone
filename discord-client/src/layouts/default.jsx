import React from 'react'
import ProfileBlock from '../components/common/ProfileBlock'
import Sidebar from '../components/Sidebar'
import SubSidebar from '../components/SubSidebar'

const DefaultLayout = ({children}) => {
    return (
        <div className="w-screen h-screen flex">
            <Sidebar/>
            <div className="wrapper flex-grow relative bg-gray-600">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout
