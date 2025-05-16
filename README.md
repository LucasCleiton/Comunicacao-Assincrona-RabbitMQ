# Sistema de Processamento de Pedidos com RabbitMQ

Este é um sistema simples para processamento de pedidos em uma arquitetura distribuída, utilizando comunicação assíncrona com RabbitMQ para garantir resiliência e tolerância a falhas.

## 🚀 Arquitetura
![Comunicação assicrona](https://github.com/user-attachments/assets/04cfe1db-c450-4cb5-98f1-aed94948dba3)


## 🚀 Como Executar

1. Clone o repositório:

```bash
git clone https://github.com/LucasCleiton/Comunicacao-Assincrona-RabbitMQ.git
cd sistema-processamento-pedidos
```
2. Inicie o Docker Compose para o RabbitMQ:

```bash
docker-compose up -d
```
3. Inicie a API de Pedidos:

```bash
cd api-pedidos
npm install
node index.js
```
4. Inicie o Processador de Pedidos:

```bash
cd ../processador-pedidos
npm install
node processador.js
```

## 🛠 Testando o Sistema

* Envie pedidos para a API:

```bash ou Postman
curl -X POST http://localhost:3000/pedidos \
-H "Content-Type: application/json" \
-d '{"nome":"Cliente Teste", "itens":["item1", "item2"], "quantidade":2, "valorTotal":100}'
```

* Verifique a fila e os pedidos processados na interface do RabbitMQ:

```
http://localhost:15672
Usuário: admin
Senha: admin
```

## ⚙️ Tecnologias Utilizadas

* Node.js v20.10.0
* Express 5.1.0
* RabbitMQ 3.13.7
* Docker Compose v2.23.3-desktop.2

