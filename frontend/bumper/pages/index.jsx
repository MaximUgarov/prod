import Head from 'next/head'
import { Fragment, useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import mainFrameImg from '../public/Images/mainPage/mainFrameImg.png'
import mainPageImgMobile from '../public/Images/mainPage/mainPageImgMobile.png'
import aboutImg from '../public/Images/mainPage/aboutImg.jpg'
import payimg from '../public/Images/mainPage/payimg.jpg'
import advantagesImg from '../public/Images/mainPage/advantagesImg.jpg'
import icon1 from '../public/Images/mainPage/icon1.svg'
import icon2 from '../public/Images/mainPage/icon2.svg'
import icon3 from '../public/Images/mainPage/icon3.svg'
import icon4 from '../public/Images/mainPage/icon4.svg'
import Footer from '../components/footer'
import axios from "axios";
import Link from 'next/link'
import BtnsBlock from '../components/btnsBlock'


export default function Home() {

  const [width, setwidth] = useState()

  useEffect(() => {
    setwidth(900 < window.screen.width)
  }, [])

  const [user_name, setuser_name] = useState("")
  const [user_phone, setuser_phone] = useState("")
  const [user_mail, setuser_mail] = useState("")
  const [user_subject, setuser_subject] = useState("")

  const [valid_name, setvalid_name] = useState(true)
  const [valid_phone, setvalid_phone] = useState(true)
  const [valid_mail, setvalid_mail] = useState(true)
  const [valid_subject, setvalid_subject] = useState(true)

  const [Popup, setPopup] = useState(false)

  const onHandlerClickName = (e) => {
    setuser_name(e.target.value)
    if (user_name) {
      setvalid_name(true)
    }
    else {
      setvalid_name(false)
    }
  }
  const onHandlerClickPhone = (e) => {
    setuser_phone(e.target.value)
    let re = /^\d[\d\(\)\ -]{4,14}\d$/;
    let valid = re.test(user_phone);
    if (user_phone && valid) {
      setvalid_phone(true)
    }
    else {
      setvalid_phone(false)
    }

  }
  const onHandlerClickMail = (e) => {
    setuser_mail(e.target.value)
    let re2 = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i;
    let valid2 = re2.test(e.target.value);
    if (user_mail && valid2) {
      setvalid_mail(true)
    }
    else {
      setvalid_mail(false)
    }
  }

  const onHandlerClickSubject = (e) => {
    setuser_subject(e.target.value)
    if (user_subject) {
      setvalid_subject(true)
    }
    else {
      setvalid_subject(false)
    }
  }

  const onHandlerSubmit = (e) => {
    const payload = {
      user_name: user_name,
      user_number: user_phone,
      user_email: user_mail,
      user_subject: user_subject
    }
    console.log(valid_name, valid_phone, valid_mail, valid_subject, user_name, user_phone, user_mail, user_subject)
    if (valid_name && valid_phone && valid_mail && valid_subject && user_name && user_phone && user_mail && user_subject) {
      CallbackResult(payload)
    }
    else {
      if (user_name) {
        setvalid_name(true)
      }
      else {
        setvalid_name(false)
      }
      let re = /^\d[\d\(\)\ -]{4,14}\d$/;
      let valid = re.test(user_phone);
      if (user_phone && valid) {
        setvalid_phone(true)
      }
      else {
        setvalid_phone(false)
      }
      let re2 = /^[\w-\.]+@[\w-]+\.[a-z]{1,4}$/i;
      let valid2 = re2.test(user_mail);
      if (user_mail && valid2) {
        setvalid_mail(true)
      }
      else {
        setvalid_mail(false)
      }
      if (user_subject) {
        setvalid_subject(true)
      }
      else {
        setvalid_subject(false)
      }
    }
  }

  const CallbackResult = async (payload) => {
    let response = await axios({
      method: 'post',
      url: '/api/callback',
      data: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    if (response.data === "success") {
      setPopup(true)
      setTimeout(() => {
        setPopup(false)
      }, 3000);
    }

  }

  return (
    <Fragment>
      <Head>
        <title>Бампер 35 Вологда - купить автозапчасти для ваз, газ и иномарок</title>
        <meta name="title" content="Бампер 35 Вологда - купить автозапчасти для ваз, газ и иномарок" />
        <meta name="description" content="В магазине широкий выбор сертифицированных запчастей и кузовных деталей по ценам от производителя. Адрес: Южакова 2. Телефон 8 981 506 5429" />
      </Head>
      <div className="container-main-frame">
        <Navbar />
        <BtnsBlock />
        <div className="content-wrapper">
          <div className="main-frame__wrapper">
            <div className="main-frame-text-block">
              <h1 className="main-frame-text__title">Автомобиль начинается с бампера!</h1>
              {width ? null : <div>
                <img src={mainPageImgMobile} alt="Изображение Машины" className="main-frame__img" />
              </div>}
              <span className="main-frame-text__text">Хотите, чтобы ваша машина выглядела эффектно, привлекая к
              себе всеобщее внимание? Магазин автозапчастей «Бампер 35»
              предлагает вам заказать бампера, кузовные детали и запчасти к
              отечественным автомобилям. Мы являемся официальным
              представителем заводов-изготовителей, которые заслужили
              репутацию одних из лучших предприятий, осуществляющих
            производство бамперов и других автокоплектующих!</span>
              <Link href="/catalog">
                <a>
                  <button className="main-frame-text__btn">В каталог</button>
                </a>
              </Link>
            </div>
            <div>
              {width ? <img src={mainFrameImg} alt="Изображение Машины" className="main-frame__img" /> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="suppliers-block">
          <h2 className="suppliers__title">Наши поставщики</h2>
          <div className="suppliers-items-conteiner">
            <div className="suppliers-items-block">
              <div className="suppliers-items__item">ЗАО "Технопласт" г. Нижний Новгород</div>
              <div className="suppliers-items__item">ОАО "АвтоВАЗ" г. Тольятти</div>
              <div className="suppliers-items__item">АО "Пластик" г. Сызрань</div>
            </div>
            <div className="suppliers-items-block">
              <div className="suppliers-items__item">Бампер-НН</div>
              <div className="suppliers-items__item">Спец-Автопласт</div>
            </div>
          </div>
        </div>
        <div className="about-block">
          <div className="about-block-info-wrapper">
            <h2 className="suppliers__title">О нас</h2>
            {width ? null : <img src={aboutImg} alt="" className="about-block-img__img" />}
            <span className="about-block-info__title">Магазин автозапчастей «Бампер 35» предлагает большой ассортимент
            качественных оригинальных запасных частей и кузовных деталей для
            автомобилей ВАЗ. Работая напрямую с производителем, мы имеем возможность
            не только вести лояльную ценовую политику, но и с уверенностью говорить о
            качестве наших изделий. Вся выпускаемая продукция имеет сертификаты
                 соответствия, выданные Госстандартом России.</span>
          </div>
          <div className="about-block-img-wrapper">
            <img src={aboutImg} alt="" className="about-block-img__img" />
          </div>
        </div>
        <div className="payment-block">
          <div className="payment-wrapper">
            <h2 className="suppliers__title">Доставка и оплата</h2>
            <span className="about-block-info__title">Мы ценим время наших клиентов, поэтому доставка по Вологде и Вологодской
            области осуществляется в максимально короткие сроки.
           Оплатить заказанные детали можно наличными при оформлении заказа в магазине или непосредственно при получении товара.</span>
            <div className="payment-block-decoration__text">Стоимость доставки по г. Вологда 150 рублей</div>
            <span className="about-block-info__title">
              Доставка в регионы осуществляется с помощью транспортных компаний
          </span>
            <div className="flex">
              <div className="payment-block-decoration__text">Деловые линии</div>
              <div className="payment-block-decoration__text">ПЭК</div>
            </div>
            <span className="about-block-info__title">
              Стоимость расчитывается индивидуально и оплачивается отдельно.
          </span>
          </div>
          <div>
            <img src={payimg} alt="" className="payment__img" />
          </div>
        </div>
        <div className="advantages-block">
          <div>
            <img src={advantagesImg} alt="" />
          </div>
          <div className="advantages-wrapper-text">
            <h2 className="suppliers__title">Наши преимущества</h2>
            {width ? null : <img src={advantagesImg} alt="" />}
            <span className="main-frame-text__text">Иногда возникают такие ситуации, когда ремонт сломанного или разбитого бампера становится невозможным, очень сложным или излишне дорогим. В этой ситуации на помощь приходит компания «Бампер35». У нас вы всегда сможете подобрать совершенно новый бампер в цвет вашего автомобиля. Все бамперы производятся на заводе серийно, это позволяет снизить себестоимость продукции до минимума, а так же гарантирует заводское качество. Конечно же, этим преимуществом не могут похвастаться ремонтные мастерские, ведь сломанный бампер необходимо будет клеить, подбирать и колеровать краску, а также производить покрасочные работы. И все это часто делается в кустарных условиях, в результате такой ремонт является очень дорогим и не всегда качественным.
              <br />
              <br />
Наши бамперы поставляются напрямую с завода-изготовителя. Мы имеем склад в г. Кирове, поэтому бампера в цвет на многие популярные марки автомобилей имеются в наличии. При отсутствии на складе бампера в цвет на ваш автомобиль мы осуществим доставку нужного элемента в течении 7-14 дней с момента заказа.</span>
          </div>
        </div>
        <div className="icons-block">
          <div className="icons-flex">
            <div className="icons-block-item">
              <div>
                <img src={icon1} alt="" className="icons-block__itemImg" />
              </div>
              <span className="icons-block-item__text">Высокое качество</span>
            </div>
            <div className="icons-block-item">
              <div>
                <img src={icon2} alt="" className="icons-block__itemImg" />
              </div>
              <span className="icons-block-item__text">Широкий ассортимент</span>
            </div>
            <div className="icons-block-item">
              <div>
                <img src={icon3} alt="" className="icons-block__itemImg" />
              </div>
              <span className="icons-block-item__text">Доступные цены</span>
            </div>
            <div className="icons-block-item">
              <div>
                <img src={icon4} alt="" className="icons-block__itemImg" />
              </div>
              <span className="icons-block-item__text">Опыт работы</span>
            </div>
          </div>
          <div className="contact-form-block">
            <span className="contact-from-block-info__title">Свяжитесь с нами и мы проконсультируем вас по любому вопросу</span>
            <div className="contact-from-block__form">
              {Popup
                ?
                <div className="pop-up-success">
                  <span className="pop-up-success__span">Благодарим, ожидайте<br />обратной связи!</span>
                </div>
                :
                <>
                  <input type="name" className={valid_name ? "contact-form-block__input active" : "contact-form-block__input"} placeholder="Имя" onInput={onHandlerClickName} />
                  <input type="text" className={valid_mail ? "contact-form-block__input active" : "contact-form-block__input"} placeholder="E-mail" onInput={onHandlerClickMail} />
                  <input type="phone" className={valid_phone ? "contact-form-block__input active" : "contact-form-block__input"} placeholder="Телефон" onInput={onHandlerClickPhone} />
                  <textarea className={valid_subject ? "contact-form-block__textArea active" : "contact-form-block__textArea"} placeholder="Что вас интересует?" onInput={onHandlerClickSubject} />
                  <button className="contact-form-block__btn" onClick={onHandlerSubmit}>Отправить</button>
                </>}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  )
}
