const express = require('express');
const amqp = require('amqplib');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const QUEUE = 'pedidos';

async function sendToQueue(msg) {
    const conn = await amqp.connect(RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue(QUEUE, { durable: true });
    channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)), { persistent: true });
    await channel.close();
    await conn.close();
}

app.post('/pedidos', async (req, res) => {
    const pedido = req.body;
    if (!pedido.nome || !pedido.itens || !pedido.quantidade || !pedido.valorTotal) {
        return res.status(400).json({ error: 'Pedido incompleto' });
    }
    try {
        await sendToQueue(pedido);
        res.status(201).json({ message: 'Pedido enviado para fila' });
    } catch (e) {
        console.error('Erro ao enviar para fila:', e);
        res.status(500).json({ error: 'Erro ao enviar pedido' });
    }
});

app.listen(3000, () => {
    console.log('API Pedidos rodando na porta 3000');
});
