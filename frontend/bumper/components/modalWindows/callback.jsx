import { Fragment, useEffect, useState } from "react";
import axios from "axios";

const Callback = (props) => {


    const { modalCallback } = props
    const { setmodalCallback } = props

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
                setmodalCallback()
                setPopup(false)
            }, 3000);
        }

    }
    return (
        <Fragment>
            <div className={modalCallback ? "callback-wrapper active" : "callback-wrapper"}>
                <div className="callback-container">
                    <div className="callback-from">
                        {Popup ? <div className="pop-up-success"><span className="pop-up-success__span">Благодарим, ожидайте<br />обратной связи!</span></div> : <><span className="callback__title">Заказать звонок</span>
                            <input type="text" className={valid_name ? "callback__input active" : "callback__input"} placeholder="Имя" onInput={onHandlerClickName} name="user_name" />
                            <input type="text" className={valid_mail ? "callback__input active" : "callback__input"} placeholder="E-mail" onInput={onHandlerClickMail} name="user_email" />
                            <input type="text" className={valid_phone ? "callback__input active" : "callback__input"} placeholder="Телефон*" onInput={onHandlerClickPhone} name="user_number" />
                            <textarea className={valid_subject ? "callback__Textarea active" : "callback__Textarea"} placeholder="Задайте интересующий вас вопрос.." onInput={onHandlerClickSubject} name="user_subject" />
                            <button className="callback__btn" onClick={onHandlerSubmit}>Отправить</button></>}
                    </div>
                </div>
            </div>
            {modalCallback ? <div className="callback-bg" onClick={setmodalCallback} /> : null}
        </Fragment>
    );

}

export default Callback