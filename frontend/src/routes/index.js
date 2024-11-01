import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Login from '../pages/Login'
import ForgotPassowrd from '../pages/ForgotPassword'
import SignUp from '../pages/SignUp'
import AdminPanel from '../pages/AdminPanel'
import AllUsers from '../pages/AllUsers'
import AllProducts from '../pages/AllProducts'
import CategoryProduct from '../pages/CategoryProduct'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import SearchProduct from '../pages/SearchProduct'
import Buy from '../pages/Buy'
import Shippingdelivery from '../pages/Shippingdeliery'
import PaymentSecurity from '../pages/PaymenrSecurityHelp'
import FurnitureCare from '../pages/FurnitureCareHelp'
import Warranty from '../pages/QurceeWarrantyHelp'
import TermsAndCond from '../pages/TermsAndCond'
// import AboutOwnerFrniture from '../pages/AboutOwnerQurceeFurniture'
import AboutOwnerQurceeFurniture from '../pages/AboutOwnerQurceeFurniture,'
import Service from '../pages/Service'
import ContactUs from '../pages/ContactUs'
import Success from '../pages/Success'
import Cancel from '../pages/Cancel'
import Order from '../pages/Order'
import OurClients from '../pages/PortfolioSection'
import AllProtfolio from '../pages/AllProtfolio'
const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : "login",
                element : <Login/>
            },
            {
                path : "forgot-password",
                element : <ForgotPassowrd/>
            },
            {
                path : "sign-up",
                element : <SignUp/>
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : "search",
                element : <SearchProduct/>
            },
            {
                path:"/about",
                element:<AboutOwnerQurceeFurniture/>
            },
            {
                path:"/service",
                element:<Service/>
            },
            {
                path:"/success",
                element:<Success/>
            },
            {
                path:"/cancel",
                element:<Cancel/>
            },
            {
                path:"/orders",
                element:<Order/>
            },
            {
                path:"/buy",
                element:<Buy/>
            },
            {
                path:"/contact-us",
                element:<ContactUs/>
            },
            {
                path:"/protfolio",
                element:<OurClients/>
            },
            {
                path:"/shipping&delivery",
                element:<Shippingdelivery/>
            },
            {
                path:"/payment-security",
                element:<PaymentSecurity/>
            },
            {
                path:"/terms&conditions",
                element:<TermsAndCond/>
            },
            {
                path:"/furniture-care",
                element:<FurnitureCare/>
            },
            {
                path:"/warranty",
                element:<Warranty/>
            },
            {
                path : "admin-panel",
                element : <AdminPanel/>,
                children : [
                    {
                        path : "all-users",
                        element : <AllUsers/>
                    },
                    {
                        path : "all-products",
                        element : <AllProducts/>
                    },
                    {
                        path:"all-portfolio",
                        element:<AllProtfolio/>
                    }
                ]
            },
        ]
    }
])


export default router