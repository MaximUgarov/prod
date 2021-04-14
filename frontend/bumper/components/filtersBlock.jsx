import { Fragment, useEffect, useState } from "react";
import arrow from '../public/Images/catalog/arrowDown.svg'
import { useRouter } from 'next/router'

const FiltersBlock = (props) => {

    const { stamps } = props
    const { partTypes } = props
    const router = useRouter()


    const [stampName, setstampname] = useState("Выберите из предложенного...")
    const [modelName, setmodelname] = useState("Выберите из предложенного...")
    const [typeName, settypename] = useState("Выберите из предложенного...")

    const [stampNameOpened, setstampNameOpened] = useState(false)
    const [modelNameOpened, setmodelnameOpened] = useState(false)
    const [typeNameOpened, settypenameOpened] = useState(false)

    const [stampIndex, setstampIndex] = useState()


    useEffect(() => {
        setstampNameOpened(false)
        setmodelnameOpened(false)
        settypenameOpened(false)
    }, [router])

    useEffect(() => {
        if (router.query.stamp) {
            let arr = stamps.filter(stamps => stamps.id == router.query.stamp)
            setstampname(arr[0].name)
            setstampIndex(arr[0].id)
        }
        if (router.query.model) {
            let arr = stamps.filter(stamps => stamps.id == router.query.stamp)
            let subarr = arr[0].models.filter(model => model.id == router.query.model)
            setmodelname(subarr[0].name)
        }

        if (router.query.part_type) {
            let arr = partTypes.filter(partTypes => partTypes.id == router.query.part_type)
            settypename(arr[0].name)
        }
    }, [router.query])





    return (
        <Fragment>
            <div className="filters-block-wrapper">
                <div className="filters-block-obj">
                    <span className="filters-block-obj__title">Марка автомобиля</span>
                    <div className="filters-block-obj__input" onClick={() => { setstampNameOpened(!stampNameOpened), setmodelnameOpened(false), settypenameOpened(false) }}>
                        <img src={arrow} alt="" className="filters-block-obj__img" />{stampName}
                        {stampNameOpened ? <div className="filters-block-obj-wrapper-list">{stamps.map((stamps, index) =>
                            router.query.part_type ? <span onClick={() => { setstampname(stamps.name), setstampIndex(stamps.id), setmodelname("Выберите из предложенного..."), router.push({ query: { _start: 0, stamp: stamps.id, part_type: router.query.part_type } }) }} key={index}>{stamps.name}</span> :
                                <span onClick={() => { setstampname(stamps.name), setstampIndex(stamps.id), setmodelname("Выберите из предложенного..."), router.push({ query: { _start: 0, stamp: stamps.id } }) }} key={index}>{stamps.name}</span>
                        )} </div> : null}
                    </div>
                </div>
                <div className="filters-block-obj">
                    <span className="filters-block-obj__title">Модель</span>
                    {stampName !== "Выберите из предложенного..." ? <div className="filters-block-obj__input" onClick={() => { setmodelnameOpened(!modelNameOpened), setstampNameOpened(false), settypenameOpened(false) }}>
                        <img src={arrow} alt="" className="filters-block-obj__img" />{modelName}
                        {modelNameOpened ? <div className="filters-block-obj-wrapper-list">{stamps.filter(stamps => stamps.id == stampIndex)[0].models.map(models =>
                            router.query.part_type ? <span onClick={() => { setmodelname(models.name), router.push({ query: { _start: 0, stamp: router.query.stamp, model: models.id, part_type: router.query.part_type } }) }}>{models.name}</span> :
                                <span onClick={() => { setmodelname(models.name), router.push({ query: { _start: 0, stamp: router.query.stamp, model: models.id } }) }}>{models.name}</span>
                        )}</div> : null}
                    </div> : <div className="filters-block-obj__input" >
                            <img src={arrow} alt="" className="filters-block-obj__img" />{modelName}
                            {modelNameOpened ? <div className="filters-block-obj-wrapper-list">{stamps[stampIndex].models.map(models =>
                                <span onClick={() => setmodelname(models.name)}>{models.name}</span>
                            )}</div> : null}
                        </div>}
                </div>
                <div className="filters-block-obj">
                    <span className="filters-block-obj__title">Кузовной элемент</span>
                    <div className="filters-block-obj__input" onClick={() => { settypenameOpened(!typeNameOpened), setstampNameOpened(false), setmodelnameOpened(false) }}><img src={arrow} alt="" className="filters-block-obj__img" />{typeName}
                        {typeNameOpened ? <div className="filters-block-obj-wrapper-list">{partTypes.map((partTypes, index) =>
                            router.query.stamp ? router.query.model ? <span onClick={() => { settypename(partTypes.name), router.push({ query: { _start: 0, stamp: router.query.stamp, model: router.query.model, part_type: partTypes.id } }) }} key={index}>{partTypes.name}</span>
                                :
                                <span onClick={() => { settypename(partTypes.name), router.push({ query: { _start: 0, stamp: router.query.stamp, part_type: partTypes.id } }) }} key={index}>{partTypes.name}</span> :
                                <span onClick={() => { settypename(partTypes.name), router.push({ query: { _start: 0, part_type: partTypes.id } }) }} key={index}>{partTypes.name}</span>
                        )}
                        </div>
                            :
                            null}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default FiltersBlock