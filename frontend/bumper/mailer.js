const {
    response
} = require("express");
const express = require("express");
const nodemailer = require('nodemailer')
const {
    login,
    password
} = require('./urlConfig')
const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true,
    auth: {
        user: login,
        pass: password
    }
}, {
    from: 'Кодовство <maximkaxaxaxa@mail.ru>',
});

const mailer = message => {

    return new Promise((resolve, reject) => {
        transporter.sendMail(message, (error, info) =>
            error ? reject(error) : resolve(info)
        )
    })

}


module.exports = mailer