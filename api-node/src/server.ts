import server from './app';

//listen on port from .env
server.listen(process.env.PORT, () => {
    console.log(`Application started on port ${process.env.PORT}!`);
});