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

const clientsData =
    [
        {
            "idCliente": 1,
            "nomeCompleto": "Beneson Corrêa Damasceno",
            "cpf": "14928872770",
            "endereco": {
                "logradouro": "Rua das Amendoeiras",
                "numero": 120,
                "bairro": "Jardim das Flores",
                "cidade": "São Paulo",
                "estado": "SP",
                "cep": "04510-001"
            },
            "telefoneContato": "(11) 98765-4321",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-11",
                    "dataVencimento": "2024-11-10",
                    "valor": 137.50,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-10",
                    "valor": 140.79,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-10",
                    "valor": 132.45,
                    "status": "Em Aberto"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 2,
            "nomeCompleto": "João Batista Pereira",
            "cpf": "987.654.321-00",
            "endereco": {
                "logradouro": "Avenida Brasil",
                "numero": 456,
                "bairro": "Centro",
                "cidade": "Rio de Janeiro",
                "estado": "RJ",
                "cep": "20040-000"
            },
            "telefoneContato": "(21) 91234-5678",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-11",
                    "dataVencimento": "2024-11-12",
                    "valor": 220.10,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-12",
                    "valor": 215.33,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-12",
                    "valor": 198.50,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": [
                {
                    "dataOcorrencia": "2024-10-05",
                    "motivo": "Queda de energia",
                    "descricao": "Bairro ficou sem luz por 2 horas",
                    "tipoResolucao": "Envio de equipe técnica e restabelecimento"
                }
            ]
        },
        {
            "idCliente": 3,
            "nomeCompleto": "Fernanda Costa Silva",
            "cpf": "321.654.987-02",
            "endereco": {
                "logradouro": "Rua Maranhão",
                "numero": 789,
                "bairro": "Bela Vista",
                "cidade": "Belo Horizonte",
                "estado": "MG",
                "cep": "30150-100"
            },
            "telefoneContato": "(31) 99876-5432",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-10",
                    "valor": 89.90,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-10",
                    "valor": 105.75,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 4,
            "nomeCompleto": "Pedro Henrique Souza",
            "cpf": "555.888.777-03",
            "endereco": {
                "logradouro": "Rua Bariri",
                "numero": 100,
                "bairro": "Ramos",
                "cidade": "Rio de Janeiro",
                "estado": "RJ",
                "cep": "21031-000"
            },
            "telefoneContato": "(21) 93456-7890",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-11",
                    "dataVencimento": "2024-11-09",
                    "valor": 134.20,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-09",
                    "valor": 130.65,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-09",
                    "valor": 125.10,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 5,
            "nomeCompleto": "Carolina Oliveira Santos",
            "cpf": "999.111.222-44",
            "endereco": {
                "logradouro": "Rua Tiradentes",
                "numero": 45,
                "bairro": "Jardim Imperial",
                "cidade": "Curitiba",
                "estado": "PR",
                "cep": "80030-100"
            },
            "telefoneContato": "(41) 98765-4422",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-15",
                    "valor": 180.00,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-15",
                    "valor": 172.50,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 6,
            "nomeCompleto": "Thiago Gonçalves Machado",
            "cpf": "444.777.333-66",
            "endereco": {
                "logradouro": "Avenida Ceará",
                "numero": 1000,
                "bairro": "Centro",
                "cidade": "Fortaleza",
                "estado": "CE",
                "cep": "60060-120"
            },
            "telefoneContato": "(85) 99999-2222",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-11",
                    "dataVencimento": "2024-11-08",
                    "valor": 200.75,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-08",
                    "valor": 198.90,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-08",
                    "valor": 212.35,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": [
                {
                    "dataOcorrencia": "2024-09-22",
                    "motivo": "Oscilação de tensão",
                    "descricao": "Equipamentos desligando repetidamente",
                    "tipoResolucao": "Monitoramento e ajuste na rede"
                }
            ]
        },
        {
            "idCliente": 7,
            "nomeCompleto": "Ana Carolina Almeida",
            "cpf": "777.666.555-77",
            "endereco": {
                "logradouro": "Rua XV de Novembro",
                "numero": 67,
                "bairro": "Jardim Paulista",
                "cidade": "São Paulo",
                "estado": "SP",
                "cep": "01310-200"
            },
            "telefoneContato": "(11) 94567-8901",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-07",
                    "valor": 150.00,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-07",
                    "valor": 140.25,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 8,
            "nomeCompleto": "Guilherme Alves Teixeira",
            "cpf": "111.222.333-88",
            "endereco": {
                "logradouro": "Rua das Palmeiras",
                "numero": 230,
                "bairro": "Vila Mariana",
                "cidade": "São Paulo",
                "estado": "SP",
                "cep": "04114-050"
            },
            "telefoneContato": "(11) 98655-3322",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-11",
                    "dataVencimento": "2024-11-10",
                    "valor": 102.50,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-10",
                    "valor": 98.00,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-10",
                    "valor": 95.80,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 9,
            "nomeCompleto": "Beatriz Rodrigues de Souza",
            "cpf": "222.333.444-99",
            "endereco": {
                "logradouro": "Rua Santa Clara",
                "numero": 510,
                "bairro": "Copacabana",
                "cidade": "Rio de Janeiro",
                "estado": "RJ",
                "cep": "22041-010"
            },
            "telefoneContato": "(21) 94444-5566",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-13",
                    "valor": 184.90,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-13",
                    "valor": 176.30,
                    "status": "Paga"
                }
            ],
            "incidentesReportados": []
        },
        {
            "idCliente": 10,
            "nomeCompleto": "Lucas Martins Ferraz",
            "cpf": "020900",
            "endereco": {
                "logradouro": "Rua Dom Pedro II",
                "numero": 900,
                "bairro": "Boa Vista",
                "cidade": "Recife",
                "estado": "PE",
                "cep": "50050-002"
            },
            "telefoneContato": "(81) 97777-0011",
            "historicoFaturas": [
                {
                    "mesReferencia": "2024-11",
                    "dataVencimento": "2024-11-20",
                    "valor": 210.05,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2024-12",
                    "dataVencimento": "2024-12-20",
                    "valor": 200.00,
                    "status": "Paga"
                },
                {
                    "mesReferencia": "2025-01",
                    "dataVencimento": "2025-01-20",
                    "valor": 205.75,
                    "status": "Em Aberto"
                }
            ],
            "incidentesReportados": []
        }
    ];