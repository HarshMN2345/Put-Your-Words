import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from "@apollo/server/express4";

const init = async () => {
    const app = express();
    app.use(express.json());

    const server = new ApolloServer({
        typeDefs: `
            type Query {
                hello: String
            }
        `,
        resolvers: {
            Query: {
                hello: () => 'Hello world!',
            }
        }
    });

    await server.start();
    app.get('/', (req, res) => {
        res.json({ message: 'Hello World' });
    });

    app.use("/graphql", expressMiddleware(server));

    app.listen(5000, () => {
        console.log('Server running at port 5000');
    });
}

init(); // Call the init function to start the server
