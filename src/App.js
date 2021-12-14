import { Navbar } from "components/ComponentIndex";
import { CrabAnat, Footer, NFT, ShopZone, WhenIsItOut } from "./containers/ContainerIndex";
import { useScrollEvent } from "lib/useScroll";
import SubscribeImg from "img/subscribe.png";
import ShopImg from "img/shop.gif";
import SunLight from "img/sunlight.png";
import './App.css';

function App() {

  // eslint-disable-next-line no-unused-vars
  const setOffsetY = useScrollEvent();

  return (
    <div className="App">
      <img className="sunlight" src={SunLight} alt="" />
      <img className="shop-img" src={ShopImg} alt="" />
      <Navbar></Navbar>
      <ShopZone></ShopZone>

      <div className="parallax-group">
        <div className="d-flex f-justify-c">
          <img className="sub-img" src={SubscribeImg} alt="" />
        </div>
        <NFT></NFT>
        <CrabAnat></CrabAnat>
        <WhenIsItOut></WhenIsItOut>
        <Footer></Footer>
      </div>

    </div>
  );
}

export default App;
