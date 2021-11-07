import React from 'react'
import { useParams } from 'react-router-dom'

const DirectMessagePage = () => {
    const { id } = useParams()
    return (
        <div className="text-red-500">
           HEllo {id}
        </div>
    )
}

export default DirectMessagePage
