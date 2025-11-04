import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './component/Login';
import SignUp from './component/SignUp';
import Home from './file/Home';
import ProductsPage from './component/ProductsPage';
import Header from './component/Header';
import IndexHame from './component/IndexHame';
import LandingPage from './file/LandingPage';
import ProductDeatailc from './file/ProductDeatailc';
import PaymentOption from './component/PaymentOption';
import PaymentSuccess from './component/PaymentSuccess';
import CashOnDilivery from './component/CashOnDilivery';
import CategoryProducts from './component/CategoryProducts';
import MyBookings from './file/MyBookings';
import Ctegories from './file/Ctegories';
import ClickingView from './component/ClickingView';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>}></Route>
          <Route path='/SignUp' element={<SignUp/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          <Route path='/Home' element={<Home/>}></Route>
           <Route path='/ProductPage' element={<ProductDeatailc/>}></Route>
            <Route path='/PaymentOption' element={<PaymentOption/>}></Route>
            <Route path='/CashOnDilivery' element={<CashOnDilivery/>}></Route>
            <Route path='/paymentsuccess' element={<PaymentSuccess/>}></Route>
             <Route path='/mybookings' element={<MyBookings/>}></Route>
             <Route path='/CategoryProducts' element={<CategoryProducts/>}></Route>
              <Route path='/Catogiry' element={<Ctegories/>}></Route>
              <Route path='/ClickingView' element={<ClickingView/>}></Route>
        </Routes>
      </BrowserRouter>


    </>
  );
}

export default App;
