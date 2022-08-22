import server from './app';

server.listen(process.env.PORT, () => {
    console.log(`Application started on port ${process.env.PORT}!`);
});