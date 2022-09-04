import { Routes, Route } from "react-router-dom"
import { Store } from "./pages/Store"
import { Nav } from "./components/Nav"
import { Cart } from "./pages/Cart"
import categories from './data/categories.json'

function App() {

  return (
    <div className="flex flex-col items-center">
      <Nav />
      <div className="bg-gray-50 w-full">
        <Routes>
          {categories.map(category => (
            <Route key={category.path} path={category.path} element={<Store category={category.category} />} />
          ))}
          <Route path="/cart" element={<Cart />} />
          {/* TODO: 
            * Search page + search bar in nav
            * Checkout page? Try Stripe implementation
          */}
        </Routes>
      </div>
    </div>
  )
}

export default App
