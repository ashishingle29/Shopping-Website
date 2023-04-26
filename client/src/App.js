import './App.css';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/home/Homepage';
import About from './pages/about/About';
import Policy from './pages/policy/Policy';
import Contact from './pages/contact/Contact';
import Page404 from './pages/page404/Page404';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Dashboard from './pages/user/Dashboard';
import {UserRoute,AdminRoute} from './routes/private';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashBoard from './pages/admin/AdminDashBoard';
import Category from './pages/admin/Category';
import UserList from './pages/admin/UserList';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Product from './pages/admin/Product';
import ProductForm from './components/forms/ProductForm';
import Search from './pages/procuct/Search';
import ProductDetails from './pages/procuct/ProductDetails';
import Categories from './pages/categories/Categories';
import CategoryProducts from './pages/categories/CategoryProducts';
import Cart from './pages/cart/Cart';
import AdminOrders from './pages/admin/AdminOrders';
import CarouselPage from './pages/admin/CarouselPage';
import AdminProfile from './pages/admin/AdminProfile';
import LoaderContainerModal from './components/modal/LoaderContainerModal';
import { HashLoader } from 'react-spinners';
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/product/:slug' element={<ProductDetails/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path='/category/:slug' element={<CategoryProducts/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/dashboard' element={<UserRoute/>}> 
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/orders' element={<Orders/>}/>
          <Route path='user/profile' element={<Profile/>}/>
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}> 
          <Route path='admin' element={<AdminDashBoard/>}/>
          <Route path='admin/profile' element={<AdminProfile/>}/>
          <Route path='admin/create-category' element={<Category/>}/>
          <Route path='admin/products/add' element={<Product fragment={ProductForm}/>}/>
          <Route path='admin/products' element={<Product/>}/>
          <Route path='admin/carousel' element={<CarouselPage/>}/>
          <Route path='admin/orders' element={<AdminOrders/>}/>
          <Route path='admin/user-list' element={<UserList/>}/>
        </Route>
        <Route path='/about' element={<About/>}/>
        <Route path='/privacy-policy' element={<Policy/>}/>
        <Route path='/contact' element={<Contact/>}/>


        <Route path='/test' element={<LoaderContainerModal element={<HashLoader size={100}/>}/>}/>


        <Route path='/*' element={<Page404/>}/>
      </Routes>
      
    </>
  );
}

export default App;
