import { Navbar } from "./components/ComponentIndex";
import { CrabAnat, Footer, NFT, ShopZone, TreasureChest, WhenIsItOut } from "./containers/ContainerIndex";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ScrollValue } from 'Atom/Atoms';


import ShopImg from "img/shop.gif";

import './App.css';
function App() {

  const setOffsetY = useSetRecoilState(ScrollValue);
  

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
    console.log(window.pageYOffset);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
   
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  },);

  return (
    <div className="App">
      <img className="shop-img" src={ShopImg} alt="" />
      <Navbar></Navbar>
      <ShopZone></ShopZone>
      
      <NFT></NFT>
      <CrabAnat></CrabAnat>
      <WhenIsItOut></WhenIsItOut>
      <TreasureChest></TreasureChest>
      <Footer></Footer>
    </div>
  );
}

export default App;
