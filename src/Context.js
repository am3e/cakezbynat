import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const Context = React.createContext()

function ContextProvider({children}) {
    const [itemInfo, setItemInfo] = useState({})
    const [quotePrice, setQuotePrice] = useState(0)
    const [checked, setChecked] = useState(['',-1])

    const updateAmount = (amount) => {
        return amount !== 0 && amount.toLocaleString('en-US', {style: 'currency', currency: 'CAD'})
    }

    const handleOptionChange = (title, index, name, amount) => {
        console.log('iteminfo',itemInfo)

        itemInfo[title] = [name, amount]
        const updateChecked = [title, index]
        console.log(updateChecked)
        setChecked(updateChecked)
        setQuotePrice(prev => prev + amount)
 
    }
      
    const selectOne = (title, input) => {
    console.log(input)
    const result = input.map((i, index) => {
        if (typeof(i[1]) === 'number') {
            const [name, amount] = i
            console.log(itemInfo, name, amount, 'kk')
        return (
            <div className='option' id={`option-${name}`}>
            <label htmlFor={`option-${name}`}>
                <p className="option-title">{name}</p>
            </label>
            <input className="option-input" type='radio' id={`option-${name}`} onChange={(e) => e.preventDefault} onClick={() => {handleOptionChange(title, index, name, amount)}} checked={itemInfo[title] === [name, amount] ? true : false}/> 
            <p className="option-pricing">{updateAmount(amount)}</p>
            </div>
        )
        } else {
        return (
            <div className='option' id={`option-${i}`}>
            <label htmlFor={`option-${i}`}>
                <p className="option-title">{i}</p>
            </label>
            <input className="option-input" type='radio' id={`option-${i}`} onChange={(e) => e.preventDefault} onClick={() => {handleOptionChange(title, index, i, 0)}} checked={checked[1] === index && checked[0] === title ? true : false} /> 
            </div>
        )
        }
        
    })
    return (
        <div id={title}>
        <h5>{title}</h5>
        {result}
        </div>
    )
    }
    
    const selectMultiple = (title, input) => {
    console.log(input)
    const result = input.map((i, index) => {
        const [name, amount] = i
        return (
        <div className='option' id={`option-${i}`}>
            
            <label htmlFor={`option-${name}`}>
                <p className="option-title">{name}</p>
            </label>
            <input className="option-input" type='checkbox' id={`option-${name}`} onChange={(e) => e.preventDefault} onClick={() => {handleOptionChange(name, index, name, amount)}} checked={checked[1] === index && checked[0] === name ? true : false} />
            <p className="option-pricing">{updateAmount(amount)}</p>
        </div>
        )
    })
    return (
        <div id={title}>
        <h5>{title}</h5>
        {result}
        </div>
    )
    }

    return (
        <Context.Provider value={{
            itemInfo,
            quotePrice,
            setItemInfo,
            setQuotePrice,
            updateAmount,
            selectOne,
            selectMultiple
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}