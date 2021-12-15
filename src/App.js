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
      <ShopZone></ShopZone>

      <div className="parallax-group">
        <NFT></NFT>
      </div>
      <div className="parallax-group">
        <CrabAnat></CrabAnat>
      </div>
      <div className="parallax-group">
        <WhenIsItOut></WhenIsItOut>
      </div><div className="parallax-group">
        <Footer></Footer>
      </div>


    </div>
  );
}

export default App;
