import '../App.css';
import Item from './Item'

export default function Order() {
  //delivery or pick up
  // date selection
  //cart access

  const orderQuestions = [
    ['date', 'Event Date','eventDate'],
    ['email', 'Email','email'],
    ['name', 'First Name','firstName'],
    ['text', 'Instagram Username','igName'],
  ]

  const infoQuestions = [
    ['Preferred Contact Method', 'contactMethod', ['Email', 'Instagram']],
    ['I understand that the prices listed above are ONLY BASE PRICES and there will be additional costs for special requests or toppings', 'basepriceDisclaimer',
    ['Yes','No']],
    ['You acknowledge that baking equipment may come into contact with nuts, peanutes, sesame and other tree nuts. Products contain milk, eggs, gluten. CakezByNat cannot guarantee that our products are safe to consume for people with specific allergies.',  'acknowledge',
    ['Yes','No']],
  ]
  const order_questions  = orderQuestions.map(q => {
    const [type, title, id] = q
    return (
      <div className="order-question" id={id}>
        <label htmlFor={id}>{title}</label>
        <input 
          id={id}
          type={type}
          name={id}
          className={id}
          required
        />
      </div>
    )
  })
  const info_questions  = infoQuestions.map(q => {
    const [title, id, options] = q

    return (
      <div className="info-question" id={id}>
        <label htmlFor={id}>{title}</label>
        <select id={id}>
          {options.map((op, index) => 
            <option id={op+index} value={op}>{op}</option>
          )}
        </select>
      </div>
    )
  })

  return (
    <>
    <section className="order">
      <form className="order-form">
      <h3>Order Information</h3>
        {order_questions}
        {info_questions}
      </form>
    </section>
      
      <Item />


    </>
  );
}
