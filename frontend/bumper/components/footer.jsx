import { Fragment, useEffect, useState } from "react";
import logo from '../public/Images/footer/footerImg.svg'
import codovstvo from '../public/Images/footer/codovstvo.svg'
import { useRouter } from 'next/router';
import Link from 'next/link'

const Footer = (props) => {

    const router = useRouter()
    const [width, setwidth] = useState()

    useEffect(() => {
        setwidth(750 < window.screen.width)
    }, [])

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
    if (width) {
        return (
            <Fragment>
                <footer>
                    <div className="">
                        <Link href="/">
                            <a>
                                <img src={logo} alt="" />
                            </a>

                        </Link>

                    </div>
                    <div className="footer-block-wrapper">
                        <a href="tel:8 981 506 54 29">
                            <span className="footer-text">8 981 506 54 29</span>
                        </a>
                        <span className="footer-text">г. Вологда, ул. Южакова, д. 2</span>
                        <span className="footer-text">ПН-ПТ: 09:00 - 19:00<br />СБ-ВС: 10:00 - 15:00</span>
                    </div>
                    <div className="footer-block-wrapper">
                        <Link href="/catalog">
                            <a>
                                <span className="footer-text">Каталог</span>
                            </a>
                        </Link>
                        <span className="footer-text" data-link="about-block" onClick={scroll}>О нас</span>
                        <span className="footer-text" data-link="advantages-block" onClick={scroll}>Почему мы?</span>
                        <span className="footer-text" data-link="payment-block" onClick={scroll} >Доставка и оплата</span>
                        <span className="footer-text" data-link="suppliers-block" onClick={scroll}>Мы поставялем</span>
                    </div>
                    <a href="https://codovstvo.ru">
                        <img src={codovstvo} alt="" />
                    </a>
                </footer>
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                <footer>
                    <div className="footer-block-wrapper">
                        <a href="tel:8 981 506 54 29">
                            <span className="footer-text">8 981 506 54 29</span>
                        </a>
                        <span className="footer-text">г. Вологда, ул. Южакова, д. 2</span>
                        <span className="footer-text">ПН-ПТ: 09:00 - 19:00<br />СБ-ВС: 10:00 - 15:00</span>
                    </div>
                    <a href="https://codovstvo.ru">
                        <img src={codovstvo} alt="" />
                    </a>
                </footer>
            </Fragment>
        )
    }


}

export default Footer