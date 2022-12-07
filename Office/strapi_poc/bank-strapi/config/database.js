module.exports = ({ env }) => ({
  connection: {
    client: 'mysql',
    connection: {
      host: env('DATABASE_HOST', '10.0.3.102'),
      port: env.int('DATABASE_PORT', 3306),
      database: env('DATABASE_NAME', 'bank_poc'),
      user: env('DATABASE_USERNAME', 'mysqlusr'),
      password: env('DATABASE_PASSWORD', 'mysqlusr@21042022'),
      ssl: env.bool('DATABASE_SSL', false),
    },
  },
});
