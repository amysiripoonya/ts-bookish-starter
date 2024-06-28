import { Router, Request, Response } from 'express';
import Book from '../book';
import { Connection as TediousConnection, Request as TediousRequest } from 'tedious';
import { dbConfig } from '../dbConfig';

class BookController {
    router: Router;

    constructor() {
        this.router = Router();
        this.router.get('/catalogue', this.getAllBooks.bind(this));
        this.router.get('/:id', this.getBook.bind(this));
        this.router.post('/', this.createBook.bind(this));
    }

    getBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    createBook(req: Request, res: Response) {
        // TODO: implement functionality
        return res.status(500).json({
            error: 'server_error',
            error_description: 'Endpoint not implemented yet.',
        });
    }

    getAllBooks(req: Request, res: Response) {
        const allBooks: Book[] = [];
        const connection = new TediousConnection(dbConfig);

        connection.on('connect', function (err: Error | undefined) {
            if (err) {
                res.json(JSON.stringify(err));
                return;
            }
            const request = new TediousRequest(
                'select * from bookish.dbo.book',
                (err: Error) => {
                    if (err) {
                        console.log(err);
                    } else {
                        // and we close the connection
                        connection.close();
                        res.json(JSON.stringify(allBooks));
                    }
                },
            );

            request.on('row', function (columns) {
                const ISBN = columns.find((col) => col.metadata.colName=='ISBN').value;
                const title = columns.find((col) => col.metadata.colName=='title').value;
                allBooks.push(new Book(ISBN, title));
            });
            // console.log(JSON.stringify(allBooks));
            connection.execSql(request);
        });
        connection.connect();
    }
}

export default new BookController().router;
