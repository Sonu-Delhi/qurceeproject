import React, { useContext, useState } from 'react'
// import Logo from './Logo'
import {FaBars, FaTimes } from "react-icons/fa";
// import { Link } from 'react-router-dom';
import CategoryList from './CategoryList';
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)

  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full container mx-auto flex items-center px-4 justify-between'>
            <div className=''>
                <Link to={"/"}>
                    {/* <Logo w={90} h={50}/> */}
                    <h1 className='text-xl font-bold text-gray-800'>Qurcee</h1>
                </Link>
            </div>

            <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2'>
                <input type='text' placeholder='search product here...' className='w-full outline-none' onChange={handleSearch} value={search}/>
                <div className='text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white'>
                  <GrSearch />
                </div>
            </div>


            <div className='flex items-center gap-7'>
                
                <div className='relative flex justify-center'>

                  {
                    user?._id && (
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        {
                          user?.profilePic ? (
                            <img src={user?.profilePic} className='w-10 h-10 rounded-full' alt={user?.name} />
                          ) : (
                            <FaRegCircleUser/>
                          )
                        }
                      </div>
                    )
                  }
                  
                  
                  {
                    menuDisplay && (
                      <div className='absolute z-50 bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded' >
                        <nav>
                          {
                            user?.role === ROLE.ADMIN && (
                              <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Panel</Link>
                            )
                          }
                         
                        </nav>
                      </div>
                    )
                  }
                 
                </div>

                  {
                     user?._id && (
                      <Link to={"/cart"} className='text-2xl relative'>
                          <span><FaShoppingCart/></span>
      
                          <div className='bg-blue-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                      )
                  }
              


                <div>
                  {
                    user?._id  ? (
                      <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700'>Logout</button>
                    )
                    : (
                    <Link to={"/login"} className='px-3 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700'>Login</Link>
                    )
                  }
                    
                </div>

            </div>

      </div>
      <hr/>
      <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-40">
          <div className="container mx-auto px-4 md:px-0 flex items-center py-2">
            {/* Left Side - Logo */}
            
            <div className="flex-shrink-0">
            <CategoryList/>
              {/* <Link to="/" className="text-xl font-bold text-gray-800">Qurcce</Link> */}
            </div>
            
            
            
            {/* Center - Navigation Links */}
            <div className={`font-medium top-11 left-0 w-full lg:w-fit bg-white md:static md:flex items-center md:space-x-1 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
              <Link to={"/"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Home</Link>
              <Link to={"/about"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">About</Link>
              <Link to="/buy" className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Buy</Link>
              <Link to={"/service"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Services</Link>
              <Link to={"/protfolio"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">PortFolio</Link>
              <Link to={"/contact-us"} className="block md:inline-block px-4 py-2 text-gray-700 hover:text-gray-900">Contact</Link>
            </div>
    
            {/* Right Side - Profile, Cart, and Login */}
            <div className="flex items-center gap-4">
              
              {/* Hamburger Menu Icon for Mobile */}
            <div className="md:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            </div>
          </div>
        </nav>
    </header>
  )
}

export default Header