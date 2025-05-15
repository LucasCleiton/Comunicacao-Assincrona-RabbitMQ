// processador-pedidos/index.js
const amqp = require('amqplib');

const RABBITMQ_URL = 'amqp://admin:admin@localhost:5672';
const QUEUE_NAME = 'pedidos';

async function processarPedido(pedido) {
    console.log('📦 Processando pedido:', pedido);
    // Aqui você pode adicionar lógica de processamento, como validar pedido, gerar nota fiscal, etc.
    console.log('✅ Pedido processado com sucesso:', pedido);
}

async function consumirPedidos() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });

        console.log('📡 Aguardando pedidos...');

        channel.consume(QUEUE_NAME, async (msg) => {
            const pedido = JSON.parse(msg.content.toString());
            await processarPedido(pedido);
            channel.ack(msg); // Confirma que a mensagem foi processada com sucesso
        }, { noAck: false });
    } catch (error) {
        console.error('❌ Erro ao consumir pedidos:', error);
    }
}

consumirPedidos();
