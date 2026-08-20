import desktopLogo from '../assets/My Veggie Kitchen.png';
import mobileLogo from '../assets/My Veggie Kitchen-mobile.png';

const Banner = () => {
    return (
        <div className="hero-banner">
            <picture>
                <source media="(max-width: 767px)" srcSet={mobileLogo} />
                <img
                    src={desktopLogo}
                    alt="My Veggie Kitchen banner"
                />
            </picture>
        </div>
    )
}

export default Banner