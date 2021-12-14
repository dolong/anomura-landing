import "sass/containers/shopzone.css"
/**
 * The main area of the landing page with the shop gif.
 * 
 */
export default function ShopZone() {
    return (
        <div>
            <div className="shop-zone">
                <div >
                    <h2 className="bold" >COMING SOON!</h2>
                    <p>
                        True Pixel Indie RPG briliant gameplay
                        <br /> inspired by Loop Hero, Diablo, Ragnarok Online -
                        <br />
                        <span className="bold">Anomura</span> will be a unique game with gameplay
                        <br /> that is both familiar and intriguing!
                    </p>
                    <p className="mt-2">
                        Welcome to <span className="bold">the future of Indie games</span>
                        <br /> brought to you by <span className="bold">VHS Labs</span>, founder of <span className="bold">Zed.Run</span>
                    </p>
                    <h2 className="bold mt-2" >
                        Follow us on:
                    </h2>
                    <div className="d-flex social-shop">
                        <a href="https://twitter.com/anomuragame">
                            <p className="bold">Twitter</p>
                        </a>
                        <a href="https://instagram.com/anomuragame">
                            <p className="bold">Instagram</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
