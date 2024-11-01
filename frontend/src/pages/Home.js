import React from 'react'
// import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
// import HeaderBott from '../components/HeaderBott'

const Home = () => {
  return (
    <div>
      {/* <CategoryList/> */}
      {/* <HeaderBott/> */}
      <BannerProduct/>

      <HorizontalCardProduct category={"alpha"} heading={"Top's Alpha Chair"}/>
      <HorizontalCardProduct category={"bita"} heading={"Popular's Bita"}/>

      <VerticalCardProduct category={"gama"} heading={"Top's Gama Chair"}/>
      <VerticalCardProduct category={"iyota"} heading={"Popular's Iyota Chair"}/>
    </div>
  )
}

export default Home