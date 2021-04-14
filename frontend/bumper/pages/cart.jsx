import Head from 'next/head'
import { Fragment, useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import { useRouter } from 'next/router'
import Link from 'next/link'
import arrowDown from '../public/Images/cart/arrowDown.svg'
import error from '../public/Images/cart/error.svg'
import CartItem from '../components/cart/CartItem'
import axios from "axios";
import BtnsBlock from '../components/btnsBlock'
const Cart = (props) => {
    const router = useRouter()

    const [resGood, setresGood] = useState(false)
    const [deliveryOpened, setdeliveryOpened] = useState(false)
    const [itemsArray, setitemsArray] = useState([])
    const [buyer_name, setbuyer_name] = useState("")
    const [buyer_email, setbuyer_email] = useState("")
    const [buyer_phone, setbuyer_phone] = useState("")
    const [buyer_deliveryMethetod, setbuyer_deliveryMethetod] = useState("Способ доставки")

    const [buyer_deliveryCity, setbuyer_deliveryCity] = useState("")
    const [buyer_deliveryStreet, setbuyer_deliveryStreet] = useState("")
    const [buyer_deliveryHouse, setbuyer_deliveryHouse] = useState("")
    const [buyer_deliveryFlat, setbuyer_deliveryFlat] = useState("")
    const [buyer_deliveryIndex, setbuyer_deliveryIndex] = useState("")
    const [valid_deliveryCity, setvalid_deliveryCity] = useState("")
    const [valid_deliveryStreet, setvalid_deliveryStreet] = useState("")
    const [valid_deliveryHouse, setvalid_deliveryHouse] = useState("")
    const [valid_deliveryFlat, setvalid_deliveryFlat] = useState("")
    const [valid_deliveryIndex, setvalid_deliveryIndex] = useState("")

    const [buyer_payMethetod, setbuyer_payMethetod] = useState("")
    const [reloader, setreloader] = useState(1)


    // Валидация
    const [valid_mail, setvalid_mail] = useState(true)
    const [valid_name, setvalid_name] = useState(true)
    const [valid_phone, setvalid_phone] = useState(true)
    const [valid_delivery, setvalid_delivery] = useState(true)

    const onHandlerInputName = (e) => {
        setbuyer_name(e.target.value)
        let value = e.target.value
        if (value) {
            setvalid_name(true)
            window.localStorage.setItem("save_name", JSON.stringify(value))
        }
        else {
            setvalid_name(false)
        }
    }

    const onHandlerInputdeliveryCity = (e) => {
        setbuyer_deliveryCity(e.target.value)
        let value = e.target.value
        if (value) {
            setvalid_deliveryCity(true)
        }
        else {
            setvalid_deliveryCity(false)
        }
    }
    const onHandlerInputdeliveryStreet = (e) => {
        setbuyer_deliveryStreet(e.target.value)
        let value = e.target.value
        if (value) {
            setvalid_deliveryStreet(true)
        }
        else {
            setvalid_deliveryStreet(false)
        }
    }
    const onHandlerInputdeliveryHouse = (e) => {
        setbuyer_deliveryHouse(e.target.value)
        let value = e.target.value
        if (value) {
            setvalid_deliveryHouse(true)
        }
        else {
            setvalid_deliveryHouse(false)
        }
    }
    const onHandlerInputdeliveryFlat = (e) => {
        setbuyer_deliveryFlat(e.target.value)
        let value = e.target.value
        if (value) {
            setvalid_deliveryFlat(true)
        }
        else {
            setvalid_deliveryFlat(false)
        }
    }
    const onHandlerInputdeliveryIndex = (e) => {
        setbuyer_deliveryIndex(e.target.value)
        let value = e.target.value
        if (value) {
            setvalid_deliveryIndex(true)
        }
        else {
            setvalid_deliveryIndex(false)
        }
    }

    const onHandlerInputNumber = (e) => {
        setbuyer_phone(e.target.value)
        let value = e.target.value
        let re = /^\d[\d\(\)\ -]{4,14}\d$/;
        let valid = re.test(value);
        if (value && valid) {
            setvalid_phone(true)
            window.localStorage.setItem("save_phone", JSON.stringify(value))
        }
        else {
            setvalid_phone(false)
        }
    }

    const onHandlerInputMail = (e) => {
        setbuyer_email(e.target.value)
        let value = e.target.value
        let re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
        let valid = re.test(value);
        if (value && valid) {
            setvalid_mail(true)
            window.localStorage.setItem("save_mail", JSON.stringify(value))
        }
        else {
            setvalid_mail(false)
        }
    }


    useEffect(() => {
        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        setitemsArray(JSON.parse(itemsStorgeJson));
    }, [reloader])


    const HandlerRemoveItem = (id) => {
        setitemsArray(itemsArray.filter(itemsArray => itemsArray.item_id !== id))
        window.localStorage.setItem("itemsProducts", JSON.stringify(itemsArray.filter(itemsArray => itemsArray.item_id !== id)))
        setreloader(reloader + 1)
    }
    const [priceAllItems, setpriceAllItems] = useState(itemsArray.reduce((s, i) => s = s + (i.item_price * i.item_value), 0))

    const handlerPrice = (e) => {
        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        let itemsStorge = JSON.parse(itemsStorgeJson)
        setpriceAllItems(itemsStorge.reduce((s, i) => s = s + (i.item_price * i.item_value), 0))
    }

    const HandlerSubmit = async () => {
        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        let itemsStorge = JSON.parse(itemsStorgeJson)
        setitemsArray(itemsStorge)
        if (itemsStorge.length > 0) {
            if (valid_mail && valid_name && valid_phone && buyer_deliveryMethetod !== "Способ доставки" && itemsStorge.length > 0 && buyer_payMethetod !== "") {
                const data = {
                    ClientName: buyer_name,
                    ClientEmail: buyer_email,
                    ClientPhone: buyer_phone,
                    ClientDelivery: buyer_deliveryMethetod,
                    ClientPay: buyer_payMethetod,
                    cart: itemsStorge.map(item => item.item_id),
                    coast: `${priceAllItems}Р`,
                    ClientDeliveryCity: buyer_deliveryCity,
                    ClientDeliveryStreet: buyer_deliveryStreet,
                    ClientDeliveryHouse: buyer_deliveryHouse,
                    ClientDeliveryFlat: buyer_deliveryFlat,
                    ClientDeliveryIndex: buyer_deliveryIndex,
                    cartJson: itemsStorge,
                }

                let response = await axios({
                    method: 'post',
                    url: '/api/order',
                    data: JSON.stringify(data),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }).then((res) => {
                    if (res.status === 200) {
                        setresGood(true)
                        setTimeout(() => {
                            setresGood(false)
                            router.push("/")
                        }, 4000);
                    }
                })
            }
            else {
                if (buyer_name) {
                    setvalid_name(true)
                }
                else {
                    setvalid_name(false)
                }
                let re = /^\d[\d\(\)\ -]{4,14}\d$/;
                let valid = re.test(buyer_phone);
                if (buyer_phone && valid) {
                    setvalid_phone(true)
                }
                else {
                    setvalid_phone(false)

                }

                let re2 = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
                let valid2 = re2.test(buyer_email);
                if (buyer_email && valid2) {
                    setvalid_mail(true)
                }
                else {
                    setvalid_mail(false)
                }
                if (buyer_deliveryMethetod !== "Способ доставки") {
                    setvalid_delivery(true)
                }
                else {
                    setvalid_delivery(false)
                }
            }
        }
        else {
            console.log("Корзина Пустая")
        }
    }

    if (!resGood) {
        return (
            <Fragment>
      <Head>
        <title>Бампер 35 Вологда - купить автозапчасти для ваз, газ и иномарок</title>
        <meta name="title" content="Бампер 35 Вологда - купить автозапчасти для ваз, газ и иномарок" />
        <meta name="description" content="В магазине широкий выбор сертифицированных запчастей и кузовных деталей по ценам от производителя. Адрес: Южакова 2. Телефон 8 981 506 5429" />
      </Head>
                <Navbar />
                <BtnsBlock/>
                <div className="content-wrapper">
                    <div className="catalog-wrapper-header">
                        <h1 className="catalog-header__title">Оформление заказа</h1>
                        <Link href="/catalog">
                            <a>
                                <button className="catalog-header__btn cart">В каталог</button>
                            </a>
                        </Link>
                    </div>
                    <div className="cart-wrapper">
                        <div className="cart-items-wrapper">
                            <span className="cart-items__title">Корзина:</span>
                            <div className="cart-items-container">
                                {itemsArray ? itemsArray.length > 0 ?
                                    itemsArray.map((itemsArray, index) => <CartItem itemsArray={itemsArray} HandlerRemoveItem={(key) => HandlerRemoveItem(key)} handlerPrice={handlerPrice} key={index} reloader={reloader} />) :
                                    <span className="cart-block-items__nullText">Корзина пустая, добавьте товары из каталога...</span>
                                : null}
                            </div>
                            <span className="cart-items__price">Итого: {priceAllItems}₽</span>
                        </div>
                        <div className="cart-billing-wrapper">
                            <span className="cart-billing__title">Оформить заказ</span>
                            <div className="cart-billing-container">
                                <div className="cart-billing-form">
                                    <div style={{ "position": "relative" }}><input type="text" className={valid_name ? "cart-billing-input active" : "cart-billing-input"} placeholder="ФИО*" onInput={onHandlerInputName} />{valid_name ? null : <img src={error} className="cart-billing__error" />}</div>
                                    <div style={{ "position": "relative" }}><input type="text" className={valid_mail ? "cart-billing-input active" : "cart-billing-input"} placeholder="E-mail" onInput={onHandlerInputMail} />{valid_mail ? null : <img src={error} className="cart-billing__error" />}</div>
                                    <div style={{ "position": "relative" }}><input type="text" className={valid_phone ? "cart-billing-input active" : "cart-billing-input"} placeholder="Телефон*" onInput={onHandlerInputNumber} />{valid_phone ? null : <img src={error} className="cart-billing__error" />}</div>
                                    <div className={valid_delivery ? "cart-billing-input active" : "cart-billing-input"} onClick={() => setdeliveryOpened(!deliveryOpened)} >
                                        <span>{buyer_deliveryMethetod}</span>
                                        <img src={arrowDown} alt="" className="cart-billing-input__img" />
                                        {deliveryOpened ?
                                            <div className="cart-billing-input__setDelivery">
                                                <span className="cart-billing-input__deliverySpan" onClick={() => { setdeliveryOpened(false), setbuyer_deliveryMethetod("Деловые линии"), setvalid_delivery(true) }}>Деловые линии</span>
                                                <span className="cart-billing-input__deliverySpan" onClick={() => { setdeliveryOpened(false), setbuyer_deliveryMethetod("ПЭК"), setvalid_delivery(true) }}>ПЭК</span>
                                                <span className="cart-billing-input__deliverySpan" onClick={() => { setdeliveryOpened(false), setbuyer_deliveryMethetod("Самовывоз (г. Вологда, ул. Южакова, д. 2)"), setvalid_delivery(true) }}>Самовывоз (г. Вологда, ул. Южакова, д. 2)</span>
                                            </div>
                                            :
                                            null}
                                        {valid_delivery ? null : <img src={error} className="cart-billing__error" style={{ "top": "60%" }} />}
                                    </div>
                                    {buyer_deliveryMethetod === "Деловые линии" || buyer_deliveryMethetod === "ПЭК" ?
                                        <div className="cart-delivery-subForms">
                                            <div className="cart-delivery-subFroms__wrapper">
                                                <input type="text" className="cart-billing-input__subFroms" placeholder="Город" onInput={onHandlerInputName} onInput={onHandlerInputdeliveryCity} />
                                                <input type="text" className="cart-billing-input__subFroms" placeholder="Улица" onInput={onHandlerInputName} onInput={onHandlerInputdeliveryStreet} />
                                            </div>
                                            <div className="cart-delivery-subFroms__wrapper">
                                                <input type="text" className="cart-billing-input__subFroms" placeholder="Дом" onInput={onHandlerInputName} onInput={onHandlerInputdeliveryHouse} />
                                                <input type="text" className="cart-billing-input__subFroms" placeholder="Квартира" onInput={onHandlerInputName} onInput={onHandlerInputdeliveryFlat} />
                                                <input type="text" className="cart-billing-input__subFroms" placeholder="Индекс" onInput={onHandlerInputName} onInput={onHandlerInputdeliveryIndex} />
                                            </div>
                                        </div>
                                        :
                                        null}
                                </div>
                                <div className="cart-billing-text">
                                    <span className="cart-billing-text__content">Мы ценим время наших клиентов, поэтому доставка по Вологде и Вологодской области осуществляется в максимально короткие сроки. Оплатить заказанные детали можно при оформлении заказа в магазине или непосредственно при получении товара.</span>
                                    <span className="cart-billing-text__content">Стоимость доставки по г. Вологда 150 рублей. </span>
                                    <span className="cart-billing-text__content">Доставка в регионы осуществляется с помощью транспортных компаний “Деловые линии” и “ПЭК”.
                                    Стоимость расчитывается индивидуально и оплачивается отдельно.</span>
                                </div>
                                <div className="cart-billing-btns-block">
                                    <button className={buyer_payMethetod === "Наличными при получении" ? "cart-billing-bts_payment active" : "cart-billing-bts_payment"} onClick={() => { setbuyer_payMethetod("Наличными при получении") }}>Наличными<br />при получении</button>
                                    <button className={buyer_payMethetod === "Оплата по банковской карте при получении" ? "cart-billing-bts_payment active" : "cart-billing-bts_payment"} onClick={() => { setbuyer_payMethetod("Оплата по банковской карте при получении") }}>Оплата по<br />банковской карте<br />при получении</button>
                                    <button className="cart-billing-bts_submitorder" onClick={HandlerSubmit}>Отправить заказ</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                <Navbar />
                <div className="content-wrapper">
                    <div className="cart-res-wrapper">
                        <span className="cart-res__title">Спасибо, дальше мы свяжемся с<br /> вами, чтобы обсудить детали.</span>
                        <Link href="/">
                            <a>
                                <button className="cart-res__link">На главную</button>
                            </a>
                        </Link>
                    </div>
                </div>
                <Footer />
            </Fragment>
        )
    }

}



export default Cart