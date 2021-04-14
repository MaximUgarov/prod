module.exports = ({ env }) => ({
  host: env('HOST', '127.0.0.1'),
  port: env.int('PORT', 10002),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '7ff898c273a7b65dca402bd2a799c3ff'),
    },
  },
});
