import { Navbar } from "components/ComponentIndex";
import { CrabAnat, Footer, NFT, ShopZone, WhenIsItOut } from "./containers/ContainerIndex";
import { useScrollEvent } from "lib/useScroll";


import SunLight from "img/sunlight.png";
import './App.css';

function App() {

  // eslint-disable-next-line no-unused-vars
  const setOffsetY = useScrollEvent();

  return (
    <div className="App">
      <img className="sunlight" src={SunLight} alt="" />
      <Navbar></Navbar>
      <div className="parallax-group">
        <ShopZone></ShopZone>
        <NFT></NFT>
        <CrabAnat></CrabAnat>
        <WhenIsItOut></WhenIsItOut>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
