const next = require('next');
const express = require('express');
const {
    urlServer,
    portServer,
    ApiUrl
} = require('./urlConfig')
const bodyParser = require('body-parser')
const mailer = require('./mailer');
const {
    default: axios
} = require('axios');

// const port = 5555;
const dev = process.env.NODE_ENV !== 'production'
const app = next({
    dev
});
const handle = app.getRequestHandler();
var FormData = require('form-data');

app.prepare().then(() => {

    const server = express();

    server.use(bodyParser.json());
    server.use(bodyParser.json({
        type: 'application/vnd.api+json'
    }));
    server.use(bodyParser.urlencoded({
        extended: true
    }))


    server.post('/api/callback', (req, res) => {

        const message = {
            to: 'maximkaxaxaxa@mail.ru',
            subject: `Заявка с сайта Вологдская пастила`,
            html: `<h1>Заявка с сайта Вологоская Пастила</h1><br><h3>Имя клиента: ${req.body.user_name} <br> Номер клиента: ${req.body.user_number}<br>email клиента: ${req.body.user_email}<br>вопрос: ${req.body.user_subject}</h3><br><p>Кодовство 2021</p>`
        }
        mailer(message).then(() => {
            console.log('success')
            res.send('success')
        }).catch((error) => {
            console.log('failed', error)
            res.send('badddd')
        })
    })


    server.get('/products', (req, response) => {
        axios({
            method: 'get',
            url: `${ApiUrl}/products?_limit=8`,
            params: req.query
        }).then((res) => {
            response.json(res.data)
        })
    })

    server.get('/stamps', (req, response) => {
        axios({
            method: 'get',
            url: `${ApiUrl}/stamps`,
        }).then((res) => {
            response.json(res.data)
        })
    })

    server.get('/parttype', (req, response) => {
        axios({
            method: 'get',
            url: `${ApiUrl}/part-types`,
        }).then((res) => {
            response.json(res.data)
        })
    })


    server.get('/products/count', (req, response) => {
        axios({
            method: 'get',
            url: `${ApiUrl}/products/count`,
            params: req.query
        }).then((res) => {
            response.json(res.data)
        })
    })

    // server.get('/stamps', (req, response) => {
    //     axios({
    //         method: 'get',
    //         url: `${ApiUrl}/stamps`,
    //     }).then((res) => {
    //         response.json(res.data)
    //     })
    // })


    server.post('/api/order', (req, responce) => {
        let data = req.body
        axios({
            method: 'post',
            url: `${ApiUrl}/orders`,
            data: data
        }).then((res) => {
            responce.json(res.data)
        })

    });

    server.get('*', (req, res) => {
        return handle(req, res);
    })



    server.listen(portServer, urlServer, err => {
        if (err) {
            throw err;
        }
        console.log(`Server has been Start on ${urlServer}:${portServer}`)
    })

}).catch(ex => {
    console.log(ex.stack);
    process.exit(1);

})