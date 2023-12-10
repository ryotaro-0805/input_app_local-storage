import React, { useState } from 'react'

const Revise = () => {
    const [preText, setPreText] = useState<string>('first text');
    const handleDecideReviseMode = () => {
        console.log('handleDecide!');
    }
    const handleChange = (e: any) => {
        setPreText(e.target.value);
    }
    return (
        <>
            <div>Revise</div>
            <input onChange={handleChange} className='border border-black' type="text" value={preText} />
            <button className='border border-black rounded ml-3' onClick={handleDecideReviseMode}>決定</button>
        </>

    )
}

export default Revise