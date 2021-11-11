import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useParams } from 'react-router-dom'

const DirectMessagePage = () => {
    const { id } = useParams()
    return (
        <div className="w-full h-full flex flex-col pt-6">
           <div className="h-48 w-full border-b border-gray-500 shadow-xl flex flex-col items-center">
               <div className="w-28 h-28 bg-gray-900 flex justify-center items-center rounded-100">
                    <FontAwesomeIcon icon={faDiscord} size='3x' color='#fff'/>
               </div>
               <h1 className="font-bold text-white text-center my-3">Friend {id}</h1>
           </div>
        </div>
    )
}

export default DirectMessagePage
