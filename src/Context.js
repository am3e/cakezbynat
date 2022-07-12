import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

const Context = React.createContext()

function ContextProvider({children}) {
    const [itemInfo, setItemInfo] = useState({})
    const [quotePrice, setQuotePrice] = useState(0)
    const [formSubmit, setFormSubmit] = useState(false)

    const updateAmount = (amount, currency) => {
        return (amount !== 0 && currency && amount.toLocaleString('en-US', {style: 'currency', 
        currency: 'CAD'})) || (amount !== 0 && !currency && `$${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`)
    }

    
      
    
    return (
        <Context.Provider value={{
            itemInfo,
            quotePrice,
            formSubmit, 
            setFormSubmit,
            setItemInfo,
            setQuotePrice,
            updateAmount
        }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}