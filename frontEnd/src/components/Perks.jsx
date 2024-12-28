import React from 'react'

const Perks = ({ selected, onChange }) => {
    function handleCbClick(e) {
        const { checked, name } = e.target;
        if (checked) {
            onChange([...selected, name]);
        }
        else {
            onChange(selected.filter(perk => perk !== name));
        }
    }
    return (
        <div className='grid mt-2 gap-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-6'>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('wifi')} name="wifi" onChange={handleCbClick} />
                <span className='text-gray-600'>Wifi</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('parking')} name="parking" onChange={handleCbClick} />
                <span className='text-gray-600'>Free Parking spot</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('restaurants')} name="restaurants" onChange={handleCbClick} />
                <span className='text-gray-600'>Restaurants</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('tv')} name="tv" onChange={handleCbClick} />
                <span className='text-gray-600'>TV</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('pets')} name="pets" onChange={handleCbClick} />
                <span className='text-gray-600'>Pets</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('entrance')} name="entrance" onChange={handleCbClick} />
                <span className='text-gray-600'>Private entrance</span>
            </label>
            <label className='flex items-center gap-2 border p-4 rounded-2xl'>
                <input type="checkbox" checked={selected.includes('bars')} name="bars" onChange={handleCbClick} />
                <span className='text-gray-600'>Bars</span>
            </label>
        </div>
    )
}

export default Perks
