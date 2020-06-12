import React, { useState } from 'react'

const Checkbox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([])

    const handleToggle = category => () => {
        const currentCategoryId = checked.indexOf(category)
        const newCheckedCategoryId = [...checked]

        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(category)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1)
        }

        setChecked(newCheckedCategoryId)
        handleFilters(newCheckedCategoryId)
    }

    return categories.map((c, i) => (
        <li key={i} className='list-unstyled'>
            <label className='form-check-label'>
                <input onChange={handleToggle(c._id)} value={checked.indexOf(c._id === -1)} type='checkbox' className='form-check-input' />
                {c.name}
            </label>
        </li>
    ))
}

export default Checkbox