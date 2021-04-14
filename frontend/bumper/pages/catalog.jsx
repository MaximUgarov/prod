import Head from 'next/head'
import { Fragment, useState, useEffect } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import FiltersBlock from '../components/filtersBlock'
import { url } from "../urlConfig"
import CatalogProduct from '../components/catalog/catalogProduct'
import PaginationBlock from '../components/paginationBtns'
import { useRouter } from 'next/router'
import BtnsBlock from '../components/btnsBlock'

const Catalog = (props) => {

    const [itemsArray, setitemsArray] = useState([])
    const router = useRouter()
    const { products } = props
    const { stamps } = props
    const { partTypes } = props
    const { Count } = props
    const [reload, setreload] = useState(1)
    useEffect(() => {

        let itemsStorgeJson = window.localStorage.getItem("itemsProducts")
        let itemsStorge = JSON.parse(itemsStorgeJson)
        setitemsArray(itemsStorge)
    }, [products])


    const HandlerStorgeAdd = (id, subid, name, car, price, value, color) => {
        let arrayitems = itemsArray
        let checkObj = arrayitems.find(item => item.item_subid === subid)
        if (checkObj) {
            checkObj.item_value += value
        }
        else {
            let item = {
                item_id: id,
                item_subid: subid,
                item_name: name,
                item_carname: car,
                item_price: price,
                item_value: value,
                item_color: color
            }
            arrayitems.push(item)
        }

        setitemsArray(arrayitems)
        window.localStorage.setItem("itemsProducts", JSON.stringify(itemsArray))
        setreload(reload + 1)
    }

    console.log(products)
    
    return (
        <Fragment>
            <Head>
                <title>Бампер 35 Вологда - каталог автозапчастей</title>
                <meta name="title" content="Бампер 35 Вологда - каталог автозапчастей" />
                <meta name="description" content="Закажите онлайн кузовные запчасти для иномарок, ваз и газ: деу, киа, хендай, шевроле, лада, нива, ларгус, газель, соболь и другие. У нас можно купить бампер в цвет от изготовителя." />
            </Head>
            <Navbar />
            <BtnsBlock reload={reload} />
            <div className="content-wrapper">
                <div className="catalog-wrapper-header">
                    <h1 className="catalog-header__title">Каталог продукции</h1>
                    <button className="catalog-header__btn" onClick={() => router.push("/cart")}><a>Оформить заказ</a></button>
                </div>
                <FiltersBlock stamps={stamps} partTypes={partTypes} />
                <div className="catalog-products-wrapper">
                    {products.map(products =>
                        <CatalogProduct products={products} HandlerStorgeAdd={(id, subid, name, car, price, value, color) => HandlerStorgeAdd(id, subid, name, car, price, value, color)} />
                    )}
                </div>
                <PaginationBlock Count={Count} routerPage={router.query.page} />
            </div>
            <Footer />
        </Fragment>
    )
}


export async function getServerSideProps({ query }) {



    const data = await fetch(`${url}/products?` + new URLSearchParams(query));
    const products = await data.json();

    const dataCounts = await fetch(`${url}/products/count?` + new URLSearchParams(query));
    const Count = await dataCounts.json();

    const dataStamps = await fetch(`${url}/stamps`);
    const stamps = await dataStamps.json();

    const dataPart_type = await fetch(`${url}/parttype`);
    const partTypes = await dataPart_type.json();



    return { props: { products, stamps, partTypes, Count } }
}

export default Catalog