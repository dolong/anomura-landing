import { Navbar, ScrollBackground } from "./components/ComponentIndex";
import { CrabAnat, Footer, NFT, ShopZone, TreasureChest, WhenIsItOut } from "./containers/ContainerIndex";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ScrollValue } from 'Atom/Atoms';
import ShopImg from "img/shop.gif";
import SubscribeImg from "img/subscribe.png";


import './App.css';
function App() {

  const setOffsetY = useSetRecoilState(ScrollValue);

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
   
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  },);

  return (
    <div className="App">
      <ScrollBackground></ScrollBackground>
      <Navbar></Navbar>
      <ShopZone></ShopZone>
      <div className="d-flex f-justify-center">
        <img className="shop-img" src={ShopImg} alt="" />
      </div>
      <div className="d-flex f-justify-center">
        <img className="sub-image" src={SubscribeImg} alt="" />
      </div>
      <NFT></NFT>
      <CrabAnat></CrabAnat>
      <WhenIsItOut></WhenIsItOut>
      <TreasureChest></TreasureChest>
      <Footer></Footer>
    </div>
  );
}

export default App;
