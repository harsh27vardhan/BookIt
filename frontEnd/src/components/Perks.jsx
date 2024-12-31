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
    const perksArray = [{ name: 'wifi', text: "Wifi" },
    { name: 'parking', text: "Free Parking spot" },
    { name: 'restaurants', text: "Restaurants" },
    { name: 'tv', text: "TV" },
    { name: 'pets', text: "Pets Allowed" },
    { name: 'entrance', text: "Private Entrance" },
    { name: 'bars', text: "Bars" },
    ]
    return (
        <div className='flex flex-wrap gap-2 mt-2'>
            {perksArray.map((perk, index) => (
                <label key={index} className='flex items-center gap-2 border p-4 rounded-2xl border-gray-400'>
                    <input type="checkbox" checked={selected.includes(perk.name)} name={perk.name} onChange={handleCbClick} />
                    <span className='text-gray-600 text-nowrap'>{perk.text}</span>
                </label>
            ))}
        </div>
    )
}

export default Perks
