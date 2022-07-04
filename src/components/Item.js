import '../App.css';
import React from 'react'

const cake = [
  {
    'CakeName': 'Round Cake',
    'BasePrice': 45,
    'Size': [
      ['6 inch, two layer cake', 0],
      ['6 inch, three layer cake',15],
      ['8 inch, two layer cake',30]
    ],
    'CakeBatterFlavour': [
      'Chocolate', 
      'Vanilla', 
      'Birthday Cake', 
      'Red Velvet', 
      'Ube', 
      'Mocha', 
      'Strawberry Shortcake', 
      'Fruit cake'
    ],
    'ButtercreamIcingFlavour': [
      'Chocolate', 
      'Vanilla', 
      'Peanut Butter', 
      'Cream Cheese', 
      'Oreo', 
      'Chocolate Hazelnut (Nutella)', 
      'Ube', 
      'Mocha'
    ],
    'Addons': [
      ['Cheesecake layer', 5],
      ['Peanut Butter Cheesecake layer', 5],
      ['Chocolate Mousse', 4],
      ['White Chocolate Mousse', 4],
      ['Chocolate Fudge', 4],
      ['Crushed Almonds', 2],
      ['Raspberry Puree', 2],
      ['Custom Cake Topper', 8],
    ]
  },
  {
    'CakeName': 'Square Cake',
    'BasePrice': 45,
    'Size': [
      ['6 inch, two layer cake', 0],
      ['6 inch, three layer cake',15],
      ['8 inch, two layer cake',30]
    ],
    'CakeBatterFlavour': [
      'Chocolate', 
      'Vanilla', 
      'Birthday Cake', 
      'Red Velvet', 
      'Ube', 
      'Mocha', 
      'Strawberry Shortcake', 
      'Fruit cake'
    ],
    'ButtercreamIcingFlavour': [
      'Chocolate', 
      'Vanilla', 
      'Peanut Butter', 
      'Cream Cheese', 
      'Oreo', 
      'Chocolate Hazelnut (Nutella)', 
      'Ube', 
      'Mocha'
    ],
    'Addons': [
      ['Cheesecake layer', 5],
      ['Peanut Butter Cheesecake layer', 5],
      ['Chocolate Mousse', 4],
      ['White Chocolate Mousse', 4],
      ['Chocolate Fudge', 4],
      ['Crushed Almonds', 2],
      ['Raspberry Puree', 2],
      ['Custom Cake Topper', 8],
    ]
  }
    
]

const updateAmount = (amount) => {
  return amount !== 0 && amount.toLocaleString('en-US', {style: 'currency', currency: 'CAD'})
}

const selectOne = (title, input) => {
  console.log(input)
  const result = input.map((i, index) => {
    if (typeof(i[1]) === 'number') {
      const [name, amount] = i
      return (
        <div className='option' id={`option-${name}`}>
          <label htmlFor={`option-${name}`}>
            <p className="option-title">{name}</p>
          </label>
          <input className="option-input" type='radio' id={`option-${name}`} /> 
          <p className="option-pricing">{updateAmount(amount)}</p>
        </div>
      )
    } else {
      return (
        <div className='option' id={`option-${i}`}>
          <label htmlFor={`option-${i}`}>
            <p className="option-title">{i}</p>
          </label>
          <input className="option-input" type='radio' id={`option-${i}`} /> 
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
        <input className="option-input" type='checkbox' id={`option-${name}`} />
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

export default function Item() {
    const [input, setInput] = React.useState()
    
    const itemElements = cake.map(i => {
      return (
        <div className='item'>
          <h4>{i.CakeName}</h4>
          <p className="base-price">Base Price: {updateAmount(i.BasePrice)}</p>
          {selectOne('Size', i.Size)}
          {selectOne('Cake Batter Flavour', i.CakeBatterFlavour)}
          {selectOne('Buttercream Icing Flavour', i.ButtercreamIcingFlavour)}
          {selectMultiple('Add-ons', i.Addons)}

          
        </div>
      )
    })
  return (
    <div>
        
        
        <section className="menu-item">
            <h3>Cupcakes</h3>
            {itemElements}
        </section>
    </div>
    
  );
}