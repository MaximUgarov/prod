import { Fragment, useState, useEffect } from "react"

import Link from 'next/link'



const BtnsBlock = (props) => {

    const [itemsArray, setitemsArray] = useState([])
    const { reload } = props

    useEffect(() => {
        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        let itemsStorge = JSON.parse(itemsStorgeJson)
        setitemsArray(itemsStorge);
    }, [reload])


    return (

        <Fragment>
            <div className="btns-block-wrapper">
                <a href="tel:8 981 506 54 29"><div className="btns-block__btnWrap" /></a>
                <Link href="/cart">
                    <a>
                        <div className="btns-block__btnWrap">
                            <span className="btns-block-counterCart">{itemsArray.length}</span>
                        </div>
                    </a>
                </Link>
            </div>
        </Fragment>
    )
}




export default BtnsBlock