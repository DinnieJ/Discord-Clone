import React from 'react'
import { useSelector } from 'react-redux'
import './ProfileBlock.scss'

const ProfileBlock = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <div className="profile-block bg-gray-800 absolute top-0">
            
        </div>
    )
}

export default ProfileBlock
