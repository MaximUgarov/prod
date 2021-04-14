import Head from 'next/head'
import { Fragment } from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import Link from 'next/link'
import BtnsBlock from '../components/btnsBlock'


export default function Error() {



    return (
        <Fragment>
            <Head>

            </Head>
            <div className="container-main-frame">
                <Navbar />
                <BtnsBlock/>
                <div className="content-wrapper">
                    <div className="404-wrapper">
                        <span className="404__title">Кажется, возникли проблемы..</span>
                        <span className="404__subtitle">Страницы, которую вы ищете, не существует</span>
                        <Link href="/">
                            <a>
                                <button className="404__link">Вернуться на главную</button>
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    )
}
