
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";
import RegisterPage from './pages/RegisterPage';
import {UserContextProvider} from "./context/userContext"
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';
import LoginPage from './pages/LoginPage';
import MainLayout from './components/layout';
import ProductFormPage from './pages/ProductFormPage';
import ProtectedRoute from './app/ProtectedRoute';
import { isUserAdmin } from './app/util';
import { ProductContextProvidet } from './context/productContext';
import CategoryProductsPage from './pages/CategoryProductsPage';
import SingleProductPage from './pages/SingleProductPage';
import { CartContextProvider } from './context/cartContext';
import CartPage from './pages/CartPage';

function App() {
  const isAdmin = isUserAdmin();
  return (
  <div className="App">
    
      <Router>
       <UserContextProvider>
        <ProductContextProvidet>
          <CartContextProvider>
        <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path="/profile/:name" element={<Profile/>}/>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/products/categories/:categoryName" element={<CategoryProductsPage/>}/>
         <Route
                    path="/products/categories/:categoryName/:productName"
                    element={<SingleProductPage />}
                  />
         <Route path="/products/new"  element={
         <ProtectedRoute hasAccess={isAdmin}> <ProductFormPage/></ProtectedRoute> }/>
         <Route
                    path="/products/:id/edit"
                    element={
                      <ProtectedRoute hasAccess={isAdmin}>
                        <ProductFormPage />
                      </ProtectedRoute>
                    }
                  />
         <Route path="/cart" element={<CartPage/>}/>

         </Routes>
        </MainLayout>
        </CartContextProvider>
        </ProductContextProvidet>
       </UserContextProvider>
      </Router>
    </div>
  )
};


export default App;
