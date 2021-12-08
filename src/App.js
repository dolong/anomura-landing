import { Navbar } from "./components/ComponentIndex";
import { Subscribe, CrabAnat, Footer, NFT, ShopZone, TreasureChest, WhenIsItOut } from "./containers/ContainerIndex";
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <ShopZone></ShopZone>
      <Subscribe></Subscribe>
      <NFT></NFT>
      <CrabAnat></CrabAnat>
      <WhenIsItOut></WhenIsItOut>
      <TreasureChest></TreasureChest>
      <Footer></Footer>

    </div>
  );
}

export default App;
