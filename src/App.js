import Sidebar from "./compunents/sidebar/Sidebar";
import Topbar from "./compunents/topbar/Topbar";
import "./app.css"
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate,} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import { TransList } from "./pages/transList/TransList";
import { Transaction } from "./pages/transaction/Transaction";
import { Report } from "./pages/report/Report";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector(state => state.user.currentUser)
  return (
    <Router>
    <>
      {/* <Topbar/> */}
      <div className="container">
        {/* <Sidebar/> */}
        <Routes>
        <Route path="/" element={!user ? <Navigate to="/login"/> : <Home/>}/>
        <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
        <Route path="/users" element={<UserList/>}/>
        <Route path="/newUser" element={<NewUser/>}/>
        <Route path="/users/:userId" element={<User/>}/>
        <Route path="/products" element={<ProductList/>}/>
        <Route path="/newProduct" element={<NewProduct/>}/>
        <Route path="/products/:productId" element={<Product/>}/>
        <Route path="/transactions" element={<TransList/>}/>
        <Route path="/transaction/:transactionId" element={<Transaction/>}/>
        <Route path="/report" element={<Report/>}/>
        </Routes>
      </div>
    </>
    </Router>
  );
}

export default App;
