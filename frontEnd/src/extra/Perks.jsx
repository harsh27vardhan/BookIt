import React from 'react'

const Perks = ({ selected, onChange }) => {
    return (
        <div className='grid mt-2 gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>Wifi</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>Free Parking spot</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>Restaurants</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>TV</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>Pets</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>Private entrance</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" />
                <span className='text-gray-600'>Bars</span>
            </label>
        </div>
    )
}

export default Perks
