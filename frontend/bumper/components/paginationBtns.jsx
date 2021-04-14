import { Fragment, useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from 'next/link'


const PaginationBlock = (props) => {
    const router = useRouter()
    const [pageNumber, setpageNumber] = useState(0)
    const [pageNumberCount, setpageNumberCount] = useState(0)
    const [btnData, setbtnData] = useState("Ещё")
    const { routerPage } = props
    const { Count } = props
    const [btnNextCheck, setbtnNextCheck] = useState(true)
    // 
    // const MatchPages = Math.round(Number(Count) / 8)
    // высчет нужного количества страниц
    function IsNumeric(input) {
        var RE = /^-{0,1}\d*\.{0,1}\d+$/;
        return (RE.test(input));
    }

    let MatchPages
    const MatchPagesCheck = IsNumeric(Number(Count) / 8)
    if (MatchPagesCheck) {
        if (Number(Count) / 8 >= 1.125) {
            MatchPages = Math.round(Number(Count) / 8) + 1
        }
    }
    else {
        MatchPages = Math.round(Number(Count) / 8)
    }

    useEffect(() => {
        if (router.query._start === undefined) {
            router.push({ pathname: router.pathname, query: { _start: 0 } })
        }

        let numberPage = router.query._start / 8

        if (router.query._start == (MatchPages - 1) * 8) {
            setbtnNextCheck(false)
        }
        else {
            setbtnNextCheck(true)
        }

    }, [router.query])

    let query = router.query

    let array = []
    let p = 0
    for (let i = 1; i <= MatchPages; i++) {
        let customObject
        if (i === 1) {
            customObject = {
                link: 0,
                numberKey: i
            }
        }
        else {
            customObject = {
                link: p + 8,
                numberKey: i
            }
            p = p + 8
        }
        array.push(customObject)
    }

    const HandlerNextBtn = () => {

        if (!router.query.stamp && !router.query.model && !router.query.part_type) {
            if (router.query._start == 0) {
                router.push({ pathname: `/catalog`, query: { _start: 8 } })
            }
            else {
                router.push({ pathname: `/catalog`, query: { _start: Number(router.query._start) + 8 } })
            }
        }
        else {
            if (router.query._start == 0) {
                router.push(`/catalog?${new URLSearchParams(router.query, router.query["_start"] = Number(router.query._start) + 8).toString()}`)
            }
            else {
                router.push(`/catalog?${new URLSearchParams(router.query, router.query["_start"] = Number(router.query._start) + 8).toString()}`)
            }
        }

    }
    console.log(router.query)
    // let finalarray = obj.slice(Number(router.query._start) + pageNumber, Number(router.query._start) + pageNumberCount)
    let finalarray = array
    if (finalarray.length === 0) {
        return null
    }
    else {
        if (!router.query.stamp && !router.query.model && !router.query.part_type) {
            return (
                <Fragment>
                    <div className="nav-btn-wrapper">
                        <div className="nav-btn-container">
                            {finalarray.map(obj =>
                                <Link href={{ pathname: `/catalog`, query: { _start: obj.link } }}  ><a className={router.query._start == obj.link ? "nav-btn__btn active" : "nav-btn__btn"}>{obj.numberKey}</a></Link>
                            )}
                        </div>
                        {btnNextCheck ? <button onClick={HandlerNextBtn} className="nav-btn__btn">{btnData}</button> : <button onClick={() => router.back()} className="nav-btn__btn">Вернуться назад</button>}
                    </div>
                </Fragment>
            )
        }
        else {
            return (
                <Fragment>
                    <div className="nav-btn-wrapper">
                        <div className="nav-btn-container">
                            {finalarray.map((obj, key) =>
                                <a key={obj.index} onClick={() => router.push(`/catalog?${new URLSearchParams(router.query, router.query["_start"] = obj.link).toString()}`)} style={{ "cursor": "pointer" }}><a className={router.query._start == obj.link ? "nav-btn__btn active" : "nav-btn__btn"}>{obj.numberKey}</a></a>
                            )}
                        </div>
                        {btnNextCheck ? <button onClick={HandlerNextBtn} className="nav-btn__btn">{btnData}</button> : <button onClick={() => router.back()} className="nav-btn__btn">Вернуться назад</button>}
                    </div>
                </Fragment>
            )
        }
    }




}


export default PaginationBlock




