import Fastify from 'fastify';
import cors from '@fastify/cors'
import axios from 'axios';

const fastify = Fastify({
    logger: true,
});

fastify.register(cors, {
    origin: (origin, cb) => {
        // const hostname = new URL(origin).hostname
        // console.log('here', hostname)
        // if(hostname === "Tushars-MacBook-Pro.local"){
            //  Request from localhost will pass
            cb(null, true)
            return
        // }
        // Generate an error on other origins, disabling access
        // cb(new Error("Not allowed"), false)
    }
})

fastify.get('/', async (request, reply) => {
    reply.status(200).send({ hello: 'world' })
});

fastify.post('/trigger', async (request, reply) => {
    const { pat } = request.body as { pat: string };
    try {
        const response = await axios.post('https://api.github.com/repos/chtushar/icons-github-figma/dispatches', {
            event_type: 'addIcon',
        }, {
            headers: {
                Accept: 'application/vnd.github.everest-preview+json',
                Authorization: `token ${pat}`,
            }
        });
    
        reply.status(200).send({ message: 'success' });
    } catch (error) {
        console.log(error);
    }

});

const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
};

start();
