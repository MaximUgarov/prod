import { Fragment, useEffect, useState } from "react";
import logo from '../public/Images/navbar/logo.svg'
import Callback from "./modalWindows/callback";
import { useRouter } from 'next/router';
import Link from 'next/link'
import BtnsBlock from "./btnsBlock";

import mobileLogo from '../public/Images/mobileNavbar/logo.svg'
import burger from '../public/Images/mobileNavbar/burger.svg'
import close from '../public/Images/mobileNavbar/close.svg'
import MobileBurgerList from "./mobileBurgerList";

const Navbar = (props) => {
    const [mobileOpenedBurger, setmobileOpenedBurger] = useState(false)
    const [modalCallback, setmodalCallback] = useState(false)
    const router = useRouter()
    let itemsProducts = []
    useEffect(() => {
        if (window.localStorage.getItem('itemsProducts') === null) {
            window.localStorage.setItem("itemsProducts", JSON.stringify(itemsProducts))
        }
    }, [])
    useEffect(() => {
        setmobileOpenedBurger(false)
    }, [router.pathname])
    const scroll = (e) => {
        if (router.pathname === "/") {
            let toEl = e.target.dataset.link
            const el = document.querySelector(`.${toEl}`)
            el.scrollIntoView({ block: 'center', behavior: 'smooth' })
        }
        else {
            router.push("/")
            setTimeout(() => {
                let toEl = e.target.dataset.link
                const el = document.querySelector(`.${toEl}`)
                el.scrollIntoView({ block: 'center', behavior: 'smooth' })
            }, 500);
        }
    }

    return (
        <Fragment>
            <header className="pc">
                <Link href="/">
                    <a>
                        <img src={logo} alt="Логотип" className="header__logo" />
                    </a>

                </Link>
                <menu>
                    <ul className="header-list-items">
                        <Link href="/">
                            <a>
                                <li className="header-list__item">Главная</li>
                            </a>
                        </Link>
                        <li className="header-list__item" data-link="about-block" onClick={scroll}>О нас</li>
                        <li className="header-list__item" data-link="advantages-block" onClick={scroll}>Преимущества</li>
                        <Link href="/catalog">
                            <a>
                                <li className="header-list__item">Каталог</li>
                            </a>
                        </Link>
                        <li className="header-list__item" data-link="suppliers-block" onClick={scroll}>Поставщики</li>
                        <li className="header-list__item" data-link="payment-block" onClick={scroll}>Доставка и оплата</li>
                        <li className="header-list__item" data-link="contact-form-block" onClick={scroll}>Контакты</li>
                    </ul>
                </menu>
                <div className="header-btns-wrapper">
                    <button className="header-btns__CallBtn" onClick={() => setmodalCallback(!modalCallback)}>Заказать звонок</button>
                    <a href="tel:8 981 506 54 29">
                        <span className="header-btns__info">8 981 506 54 29</span>
                    </a>
                    <span className="header-btns__info">г. Вологда, ул. Южакова, д. 2</span>
                </div>
                <BtnsBlock />
            </header>
            <header className="mobile">
                <Link href="/">
                    <a>
                        <img src={mobileLogo} alt="" className="mobile-navbar__logo" />
                    </a>
                </Link>
                <div className="mobile-navbar-burgerIcon-wrapper">
                    {mobileOpenedBurger
                        ?
                        <img src={close} alt="" className="mobile-navbar__logoBurger" onClick={() => { setmobileOpenedBurger(false), setmodalCallback(false) }} />
                        :
                        <img src={burger} alt="" className="navbar__logoBurger" onClick={() => setmobileOpenedBurger(true)} />}
                </div>
            </header>
            {mobileOpenedBurger ? <MobileBurgerList scroll={(e) => scroll(e)} handlerClick={() => setmobileOpenedBurger(false)} Handlercallaback={() => setmodalCallback(!modalCallback)} /> : null}
            <Callback modalCallback={modalCallback} setmodalCallback={() => setmodalCallback(false)} />
        </Fragment>
    );

}

export default Navbar