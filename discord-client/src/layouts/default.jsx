import React from 'react'
import Sidebar from '../components/Sidebar'

const DefaultLayout = ({children}) => {
    return (
        <div className="w-screen h-screen flex relative">
            <Sidebar/>
            <div className="wrapper flex flex-grow bg-gray-600 overflow-x-hidden">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout
