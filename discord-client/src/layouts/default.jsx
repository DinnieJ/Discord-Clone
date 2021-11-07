import React from 'react'
import Sidebar from '../components/Sidebar'

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
