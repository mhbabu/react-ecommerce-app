import React from "react";
import Dashboard from "./pages/dashboard/dashboard";
import ProductAttribute from "./pages/product/attribute/productAttribute";
import ProductSubattribute from "./pages/product/attribute/productSubattribute";
import ProductCategory from "./pages/product/productCategory";
import ProductSubcategory from "./pages/product/ProductSubcategory";
import NotFound from "./pages/not-found/notFound";
import Product from "./pages/product/product";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "./layouts/header";
import Sidebar from "./layouts/sidebar";
import Footer from "./layouts/footer";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateAttribute from "./pages/product/attribute/createAttribute";

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <Sidebar />
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-md-12'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/products' element={<Product />} />
                <Route path="/product/attributes">
                  <Route index element={<ProductAttribute />} />
                  <Route path="create" element={<CreateAttribute />} />
                </Route>
                <Route
                  path='/product/sub-attributes'
                  element={<ProductSubattribute />}
                />
                <Route
                  path='/product/subcategories'
                  element={<ProductSubcategory />}
                />
                <Route
                  path='/product/categories'
                  element={<ProductCategory />}
                />
                <Route path='/not-found' element={<NotFound />} />
                <Route
                  path='*'
                  element={<Navigate replace to='/not-found' />}
                />{" "}
                */
                {/* <Route path='/register' element={<Register />} /> */}
                {/* <Route path='/movies' element={<Movies user={user} />} />
            <Route
              path='/movies/:movieId'
              element={
                <ProtectedRoute>
                  <MovieForm />
                </ProtectedRoute>
              }
            />
            <Route path='/customers' element={<Customer />} />
            <Route path='/rentals' element={<Rental />} />
            <Route path='/' element={<Navigate replace to='/movies' />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate replace to='/not-found' />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default App;
