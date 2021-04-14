import Link from "next/link"
import { Fragment, useState, useEffect } from "react"




const CartItem = (props) => {

    const [width, setwidth] = useState()
    const { reloader } = props
    useEffect(() => {
        setProductValue(itemsArray.item_value)
        updateData()
        handlerPrice()
        setwidth(900 < window.screen.width)

    }, [ProductValue, reloader])


    const { itemsArray } = props
    const HandlerRemoveItem = props.HandlerRemoveItem
    const [ProductValue, setProductValue] = useState(0)
    const handlerPrice = props.handlerPrice
    const [localDataArray, setlocalDataArray] = useState({})

    const updateData = () => {
        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        let itemsStorge = JSON.parse(itemsStorgeJson)
        let item = itemsStorge.find(x => x.item_id === itemsArray.item_id);
        setlocalDataArray(item)
    }

    const productValueUp = () => {

        setProductValue(ProductValue + 1)
        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        let itemsStorge = JSON.parse(itemsStorgeJson)

        const changeDesc = (id, value) => {
            let item = itemsStorge.find(x => x.item_id === id);
            item.item_value = value;
        };

        changeDesc(itemsArray.item_id, ProductValue + 1);

        window.localStorage.setItem("itemsProducts", JSON.stringify(itemsStorge))
        handlerPrice()
        updateData()
    }

    const productValueDown = (e) => {
        updateData()
        if (ProductValue >= 2) {
            updateData()
            setProductValue(ProductValue - 1)
            updateData()
            let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
            let itemsStorge = JSON.parse(itemsStorgeJson)

            const changeDesc = (id, value) => {
                let item = itemsStorge.find(x => x.item_id === id);
                item.item_value = value;
            };

            changeDesc(itemsArray.item_id, ProductValue - 1);

            window.localStorage.setItem("itemsProducts", JSON.stringify(itemsStorge))
            handlerPrice()
            updateData()
        }
        else {
            HandlerRemoveItem(itemsArray.item_id)
            handlerPrice()
            updateData()
        }
    }

    if (width) {
        return (
            <Fragment>
                <div className="cart-block-item__item" >
                    <div className="cart-block-item-wrapperContent">
                        <div className="news-product-item-counter-wrapper cart">
                            <input type="button" value="-" className="news-product-item-counter__btn cart" onClick={productValueDown} data-id={itemsArray.item_id} />
                            <input type="text" value={ProductValue} className="news-product-item-counter__inputValue cart" />
                            <input type="button" value="+" className="news-product-item-counter__btn cart" onClick={productValueUp} />
                        </div>
                        <p className="item__title cart">{itemsArray.item_name}</p>
                        <p className="item__title cart">{itemsArray.item_carname}</p>
                    </div>
                    <div className="cart-block-item-wrapperContent">
                        <p className="item__price cart color">{itemsArray.item_color}</p>
                        <p className="item__price cart">{itemsArray.item_price * ProductValue}₽</p>
                    </div>
                </div>
            </Fragment>
        )
    }
    else {
        return (
            <Fragment>
                <div className="cart-block-item__item" >
                    <div className="cart-block-item-wrapperContent">
                        <p className="item__title cart">{itemsArray.item_name}</p><br/>
                        <p className="item__title cart">{itemsArray.item_carname}</p><br/>
                        <p className="item__price cart color">{itemsArray.item_color}</p>
                    </div>
                    <div className="cart-block-item-wrapperContent">
                        <div className="news-product-item-counter-wrapper cart">
                            <input type="button" value="-" className="news-product-item-counter__btn cart" onClick={productValueDown} data-id={itemsArray.item_id} />
                            <input type="text" value={ProductValue} className="news-product-item-counter__inputValue cart" />
                            <input type="button" value="+" className="news-product-item-counter__btn cart" onClick={productValueUp} />
                        </div>
                        <p className="item__price cart">{itemsArray.item_price * ProductValue}₽</p>
                    </div>
                </div>
            </Fragment>
        )
    }
}




export default CartItem




