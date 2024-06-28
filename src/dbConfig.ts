import { ConnectionConfiguration } from 'tedious';

export const dbConfig: ConnectionConfiguration = {
    server: 'localhost',
    options: {
        trustServerCertificate: true,
        database: 'bookish',
    },
    authentication: {
        type: 'default',
        options: {
            userName: 'admin',
            password: 'b00kish_4dmin!',
        },
    },
};