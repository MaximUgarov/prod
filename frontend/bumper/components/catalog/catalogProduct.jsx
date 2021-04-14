import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import arrow from '../../public/Images/catalog/arrowDown.svg'
import { AroundUrl } from "../../urlConfig"

const CatalogProduct = (props) => {
    const [width, setwidth] = useState()
    const { products } = props
    console.log(products.part_type.name)
    const [ProductValue, setProductValue] = useState(1)
    const [color, setcolor] = useState("Введите цвет детали")
    const [valid_color, setvalid_color] = useState(true)
    const HandlerStorgeAdd = props.HandlerStorgeAdd
    const router = useRouter()
    useEffect(() => {
        setwidth(1024 < window.screen.width)
    }, [])
    useEffect(() => {
        setcolor("Введите цвет детали")
    }, [router])

    const productValueUp = () => {
        setProductValue(ProductValue + 1)
    }

    const productValueDown = (e) => {
        if (ProductValue >= 2) {
            setProductValue(ProductValue - 1)
        }
    }

    const HandlerProductAdd = (e) => {
        if (color !== "Введите цвет детали" && color) {
            setvalid_color(true)
            HandlerStorgeAdd(products.id, `${products.id} + ${color}`, products.part_type.name, `${products.stamp.name} ${products.model.name}`, products.price, ProductValue, color)
        }
        else {
            setvalid_color(false)
            setTimeout(() => {
                setvalid_color(true)
            }, 2000);
        }

    }

    return (
        <Fragment>
            <div className="product-wrapper">
                <div className="product-image-container">
                    <img src={AroundUrl + products.image ? AroundUrl + products.image[0].url : null} alt="" className="product-image__img" />
                </div>
                <div className="product-info-block">
                   {products.part_type ? <span className="product-info__name">{products.part_type.name ? products.part_type.name : null}</span> : null}
                    <div className="product-model-info-wrapper">
                       {products.stamp ? <span className="product-model__stampName">{products.stamp.name ? products.stamp.name : null} &nbsp;</span> : null}
                        {products.model ? <span className="product-model__ModelName">{products.model.name ? products.model.name : null}</span> : null}
                    </div>
                    <span className="product-info__price">{products.price ? products.price : 0}₽</span>
                    <input className={valid_color ? "product-info-colorPicker" : "product-info-colorPicker err"} onInput={(e) => setcolor(e.target.value)} placeholder={color} />
                    <div className="product-info-btns-wrapper">
                        <div className="product-info-btns-counter">
                            <input type="button" value="-" className="product-info-btns-counter__btn" onClick={productValueDown} />
                            <input type="text" value={ProductValue} className="product-info-btns-counter_value" />
                            <input type="button" value="+" className="product-info-btns-counter__btn" onClick={productValueUp} />
                        </div>
                        <button className="product-info-btns__addBtn" onClick={HandlerProductAdd}>В корзину</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}

export default CatalogProduct