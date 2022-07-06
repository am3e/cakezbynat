import '../App.css';
import React from 'react'
import products from '../data/product.js'
import {Context} from '../Context'

export default function Item() {
  const { 
    itemInfo,
    quotePrice,
    setItemInfo,
    setQuotePrice,
    updateAmount,
    selectOne,
    selectMultiple 
  } = React.useContext(Context)
  const cake = products
  const [selected, setSelected] = React.useState(false)
  
  const handleItemClick = (index, cakeItem) => {
    console.log('cakeeey', cakeItem)
    setSelected(index)
    itemInfo['Cake Name'] = cakeItem['Cake Name']
    itemInfo['Base Price'] = cakeItem['Base Price']
    setItemInfo(itemInfo)
    setQuotePrice(cakeItem['Base Price'])
    console.log(itemInfo)
  }  
    
  const itemElements = cake.map((i, index) => {
    console.log(i, index)
    const showForm = selected === index
    return (
      <div className={`${showForm ? 'item' :'button-item'}`}>
        <h4 onClick={() => handleItemClick(index, i)}>{i['Cake Name']}</h4>
        <p className={`base-price ${showForm ? '' : 'invisible'}`}>Base Price: {updateAmount(i['Base Price'])}</p>
        {showForm && 
        selectOne('Size', i['Size'])}
        {showForm && selectOne('Cake Batter Flavour', i['Cake Batter Flavour'])}
        {showForm && selectOne('Buttercream Icing Flavour', i['Buttercream Icing Flavour'])}
        {showForm && selectMultiple('Add-ons', i['Add ons'])}
      
        
      </div>
    )
  })

  const tmpfunction = (obj) => {
    const tmp = Object.entries(obj).map(ii => (<li>{ii[0]} {ii[1]}</li>))
    return (
      <ul>
        {tmp}
      </ul>
    )
  }

  return (
    <div>
        <h3>Products</h3>

        {quotePrice}
        {tmpfunction(itemInfo)}
        <section className="menu-item">
            {itemElements}
        </section>
    </div>
    
  );
}