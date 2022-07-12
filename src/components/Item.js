import '../App.css';
import React, {useState, useEffect} from 'react'
import products from '../data/product.js'
import {Context} from '../Context'
import { nanoid } from 'nanoid'

export default function Item() {
  const { 
    itemInfo,
    quotePrice,
    formSubmit,
    setFormSubmit,
    setItemInfo,
    setQuotePrice,
    updateAmount,
  } = React.useContext(Context)
  const cake = products
  const [selected, setSelected] = useState(false)
  const [checked, setChecked] = useState({})
  const [count, setCount] = useState(0)

  const updateQuotePrice = () => {
    let updateQuoteAmount = itemInfo['Base Price']
    Object.values(itemInfo).map(item => {
      if (typeof(item[1]) === 'number') { 
        updateQuoteAmount += item[1]
      }
    })
    setQuotePrice(updateQuoteAmount)
  }

  const createElement = (title, name, amount, index, type) => {
    const itemId = title === 'Add ons' ? name + index : title + name + index
    const tmp = title === 'Add ons' ? name : title

    let foundOption = !!(checked[tmp] && checked[tmp].find(option => option === itemId));
    const option = 
      <div 
        id={itemId}
        className='option'
        onClick={() => {handleOptionChange(title, index, name, amount, itemId)}}
        >
        <label htmlFor={`option-${name}`}>
            <p className="option-title">{name}</p>
        </label>
        <input 
          id={'_' + itemId}
          name={title === 'Add ons' ? name : title}
          className="option-input" 
          type={type} 
          onChange={(e) => e.preventDefault}
          checked={foundOption}
        /> 
        <p className="option-pricing">{updateAmount(amount, false)}</p>
      </div>
    return option
  }
  
  const selectOne = (title, input) => {
    const result = input.map((i, index) => {
      const [name, amount] = i
      return createElement(title, name, amount, index, 'radio')
    })
    return (
        <div id={title}>
        <h5>{title}</h5>
        {result}
        </div>
    )
    }
    
    const selectMultiple = (title, input) => {
    const result = input.map((i, index) => {
        const [name, amount] = i
        return createElement(title, name, amount, index, 'checkbox')
    })
    return (
        <div id={title}>
        <h5>{title}</h5>
        {result}
        </div>
    )
  }

  const handleOptionChange = (title, index, name, amount, id) => {
    const tmp = title === 'Add ons' ? name : title
    let updateItemInfo = itemInfo
    const updateChecked = {...checked}

    if (!updateChecked[tmp]) {
      updateChecked[tmp] = []
    }
    if (updateChecked[tmp]) {

      const foundOption = updateChecked[tmp] && updateChecked[tmp].find(option => option === id)
      if (!foundOption && updateChecked[tmp].length === 0) {
        updateChecked[tmp].push(id)
        updateItemInfo[tmp] = title === 'Add ons' ? ['(add on)', amount] : [`${name}`, amount]
      } else if (!foundOption && updateChecked[tmp].length > 0) {
        updateChecked[tmp] = []
        updateChecked[tmp].push(id)
        updateItemInfo[tmp] = title === 'Add ons' ? ['(add on)', amount] : [`${name}`, amount]
      } else if (foundOption) {
        updateChecked[tmp] = updateChecked[tmp].filter(option => option !== id )
        delete updateItemInfo[tmp]
      }
    }
    setChecked(updateChecked)
    setItemInfo(updateItemInfo)
    updateQuotePrice()
  }

  const handleItemClick = (index, cakeItem) => {
    setSelected(index)
    itemInfo['Cake Name'] = cakeItem['Cake Name']
    itemInfo['Base Price'] = cakeItem['Base Price']
    setItemInfo(itemInfo)
  }  
    
  const itemElements = cake.map((i, index) => {
    console.log(i, index)
    const showForm = selected === index
    const invisible = !showForm && 'invisible'

    return (
      <div 
        className={`${showForm ? 'item' :'button-item'}`}
        onClick={() => handleItemClick(index, i)}>
        <h4>{i['Cake Name']}</h4>
        <p className={`base-price ${invisible}`}>Base Price: {updateAmount(i['Base Price'], false)}</p>
        {showForm && selectOne('Size', i['Size'])}
        {showForm && selectOne('Cake Batter Flavour', i['Cake Batter Flavour'])}
        {showForm && selectOne('Buttercream Icing Flavour', i['Buttercream Icing Flavour'])}
        {showForm && selectMultiple('Add ons', i['Add ons'])}
        {showForm &&         
          <button className='formButton' onClick={()=> setFormSubmit(true)}>
            Request Quote
          </button>
        }
      </div>
    )
  })

  const ProductSummary = ({itemInfo}) => {
    const list = Object.entries(itemInfo).map(info => {
      return (
        <li className="option">
          <p className="option-title" >
            {
              info[0] === 'Cake Name' ? info[1] :
              info[0] === 'Base Price' ? info[0] :
              `${info[0] + ' ' + info[1][0]}`
            }
          </p>
          <p className="option-pricing" >
            {
              typeof(info[1][1]) === 'number' ? updateAmount(info[1][1], false) :
              info[0] === 'Base Price' ? updateAmount(info[1], false) :
              info[0] === 'Cake Name' ? '' : updateAmount(info[1][1], false)
            }
          </p>
        </li>)
    })

    return (
      <div className="summary">
        <ul className=''>
          {list}
        </ul>
        <h4>Amount: {updateAmount(quotePrice, true)}</h4>
      </div>
      
    )
  }




  return (
    <div>
        <h3>Products</h3>

        {itemInfo['Cake Name'] && <ProductSummary itemInfo={itemInfo}/>}
        <section className="menu-item">
            {itemElements}
        </section>
    </div>
    
  );
}