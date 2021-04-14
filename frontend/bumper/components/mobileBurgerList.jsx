import { Fragment, useEffect, useState } from "react";
import Link from 'next/link'

const MobileBurgerList = (props) => {
    const { scroll } = props
    const { handlerClick } = props
    const { Handlercallaback } = props
    const onHandlerClick = (e) => {
        scroll(e)
        handlerClick()
    }
    return (
        <Fragment>
            <menu className="mobile-navbar-list-items">
                <ul className="mobile-navbar-list-container">
                    <Link href="/">
                        <a>
                            <li className="mobile-navbar-list__item">Главная</li>
                        </a>
                    </Link>

                    <li className="mobile-navbar-list__item" data-link="about-block" onClick={onHandlerClick}>О нас</li>


                    <li className="mobile-navbar-list__item" data-link="advantages-block" onClick={onHandlerClick}>Преимущества</li>

                    <Link href="/catalog">
                        <a>
                            <li className="mobile-navbar-list__item">Каталог</li>
                        </a>
                    </Link>

                    <li className="mobile-navbar-list__item" data-link="suppliers-block" onClick={onHandlerClick}>Поставщики</li>


                    <li className="mobile-navbar-list__item" data-link="payment-block" onClick={onHandlerClick}>Доставка и оплата</li>


                    <li className="mobile-navbar-list__item" data-link="contact-form-block" onClick={onHandlerClick}>Контакты</li>

                    <li className="mobile-navbar-list__item" data-link="contact-form-block call" onClick={Handlercallaback}>Заказать звонок</li>

                </ul>
            </menu>
        </Fragment>
    );

}

export default MobileBurgerList