import '../App.css';
import Item from './Item'
import orderQuestions from '../data/orderQuestions';
import infoQuestions from '../data/infoQuestions';

export default function Order() {
  //delivery or pick up
  // date selection
  //cart access

  
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
