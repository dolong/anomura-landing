import ShopText from "components/ShopText"
import ShopImg from "img/shop.gif";

/**
 * The main area of the landing page with the shop gif.
 * 
 */

export default function ShopZone() {
    return (
        <div className="container shop-zone">
            <ShopText></ShopText>
            <div>
                <img className="shop-img" src={ ShopImg } alt="" />
            </div>
            
        </div>
    )
}
