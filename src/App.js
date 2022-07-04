import './App.css';
import Header from './components/Header'
import Nav from './components/Nav'
import Order from './components/Order'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Order />
      <Footer />
    </div>
  );
}
