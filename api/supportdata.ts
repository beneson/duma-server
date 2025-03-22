import fs from 'fs';
import path from 'path';
const fastLevenshtein = require('fast-levenshtein');

// Endpoint para buscar dados do cliente com base no documento (CPF)
export async function GET({ request }: { request: any }) {
    const document = request.query.document;
    if (!document) {
        return request.status(400).json({ error: "document é obrigatório" });
    }
    const formatDocument = document.replace(/[.-]/g, '');

    const filePath = path.join(__dirname, '/data/clients.json');
    let clientsData: any[] = [];
    try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
        clientsData = JSON.parse(fileContent);

        if (!Array.isArray(clientsData)) {
            throw new Error('O arquivo JSON não contém um array');
        }
    } catch (error: any) {
        return new Response(JSON.stringify({
            error: `Erro ao carregar dados dos clientes: ${error.message}`
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    // Procura o cliente com similaridade >= 75%
    const client = clientsData.find(client => {
        const clientFormatDocument = client.cpf.replace(/[.-]/g, '');
        const similarity = calculateSimilarity(clientFormatDocument, formatDocument);
        return similarity >= 75;
    });

    if (!client) {
        return new Response(JSON.stringify({ error: "Cliente não encontrado" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    return new Response(JSON.stringify(client), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};

// Função para calcular similaridade usando fast-levenshtein
function calculateSimilarity(str1: string, str2: string) {
    const maxLength = Math.max(str1.length, str2.length);
    const distance = fastLevenshtein.get(str1, str2);
    return ((maxLength - distance) / maxLength) * 100;
}