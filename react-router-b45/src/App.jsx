import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Products from './pages/Products'
import Orders from './pages/Orders'
import Errors from './pages/Errors'
import Navbar from './components/Navbar'
import ImageClassifier from './pages/Tensorflow'
import ToxicDetector from './pages/CommentPredictor'

function App() {
  return (
   <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path='/tensorflow' element={<ImageClassifier />} />
        <Route path='/comment' element={<ToxicDetector />} />
        <Route path="*" element={<Errors />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App