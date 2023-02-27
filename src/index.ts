import fastify from 'fastify'
import cors from '@fastify/cors'

import { ServerResponse } from 'http';
import { toRomanNumeral } from './converter.js';

// Don't do that in prod :)
const server = fastify().register(cors, { origin: '*' });
const clients = new Set<ServerResponse>();

server.get<{Params: {n: string}}>('/convert/:n', (request, reply) => {
  const n = Number(request.params.n);
  if (isNaN(n) || n < 0 || n > 100) {
    reply.status(400).send({ error: 'Invalid input. Please provide a number between 0 and 100.' });
    return;
  }

  const romanNumeral = toRomanNumeral(n);
  reply.send({ input: n, value: romanNumeral });
});

server.get<{Params: {n: string}}>('/sse/:n', (request, reply) => {
  const n = Number(request.params.n);
  if (isNaN(n) || n < 0 || n > 100) {
    reply.status(400).send({ error: 'Invalid input. Please provide a number between 0 and 100.' });
    return;
  }

  reply.raw.setHeader('Access-Control-Allow-Origin', '*');
  reply.raw.setHeader('Content-Type', 'text/event-stream');
  reply.raw.setHeader('Cache-Control', 'no-cache');
  reply.raw.setHeader('Connection', 'keep-alive');
  reply.raw.flushHeaders();

  clients.add(reply.raw);

  const sendEvent = (data: string) => {
    clients.forEach((client) => {
      client.write(`data: ${data}\n\n`);
    });
  };

  const romanNumeral = toRomanNumeral(n);
  sendEvent(romanNumeral);

  request.raw.on('close', () => {
    clients.delete(reply.raw);
  });
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})