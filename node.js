const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Banco de dados simulado
let contracts = [];

// Gerar IDs automáticos para contratos
let currentId = 1;

// Rotas

// 1. Criar um contrato
app.post('/contracts', (req, res) => {
    const { clientName, eventDate, location, price, status } = req.body;

    if (!clientName || !eventDate || !location || !price) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
    }

    const newContract = {
        id: currentId++,
        clientName,
        eventDate,
        location,
        price,
        status: status || 'Pendente' // Status padrão como "Pendente"
    };

    contracts.push(newContract);
    res.status(201).json(newContract);
});

// 2. Listar todos os contratos
app.get('/contracts', (req, res) => {
    res.json(contracts);
});

// 3. Buscar um contrato por ID
app.get('/contracts/:id', (req, res) => {
    const contract = contracts.find(c => c.id === parseInt(req.params.id));

    if (!contract) {
        return res.status(404).json({ error: 'Contrato não encontrado!' });
    }

    res.json(contract);
});

// 4. Atualizar um contrato
app.put('/contracts/:id', (req, res) => {
    const { id } = req.params;
    const { clientName, eventDate, location, price, status } = req.body;

    const contract = contracts.find(c => c.id === parseInt(id));

    if (!contract) {
        return res.status(404).json({ error: 'Contrato não encontrado!' });
    }

    // Atualizar campos
    if (clientName) contract.clientName = clientName;
    if (eventDate) contract.eventDate = eventDate;
    if (location) contract.location = location;
    if (price) contract.price = price;
    if (status) contract.status = status;

    res.json(contract);
});

// 5. Deletar um contrato
app.delete('/contracts/:id', (req, res) => {
    const { id } = req.params;

    const contractIndex = contracts.findIndex(c => c.id === parseInt(id));

    if (contractIndex === -1) {
        return res.status(404).json({ error: 'Contrato não encontrado!' });
    }

    contracts.splice(contractIndex, 1);
    res.status(204).send(); // Sem conteúdo
});

// Inicializar o servidor
app.listen(port, () => {
    console.log(`API de Contratos está rodando em http://localhost:${port}`);
});