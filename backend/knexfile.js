// Update with your config settings.

module.exports = {
    client: 'sqlite3',
    connection: {
      filename: './src/database/contactlist.sqlite'
    },
    migrations: {
      directory: './src/database/migrations'
    },
    useNullAsDefault: true,
};
