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
    const client = clientData.find(client => {
        const clientFormatDocument = client.document.replace(/[.-]/g, '');
        const similarity = calculateSimilarity(clientFormatDocument, formatDocument);
        return similarity >= 85;
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

const clientData =
    [
        {
            "nome": "Bruno Lopes",
            "document": "456.789.123-00",
            "data_nascimento": "1988-05-22",
            "endereco": {
                "logradouro": "Rua das Palmeiras",
                "numero": "120",
                "complemento": "Apartamento 502, Bloco B",
                "bairro": "Jardim Europa",
                "cidade": "São Paulo",
                "estado": "SP",
                "cep": "01456-000"
            },
            "contato": {
                "telefone_celular": "(11) 98765-4321",
                "telefone_residencial": "(11) 3344-5566",
                "email": "bruno.lopes@email.com"
            }
            ,
            "dividas": [
                {
                    "contrato": "0012456789",
                    "descricao": "Empréstimo Pessoal",
                    "valor_original": 15000.00,
                    "valor_atualizado": 17650.35,
                    "data_emissao": "2024-10-10",
                    "data_vencimento": "2024-11-10",
                    "dias_em_atraso": 135,
                    "status": "Em aberto",
                    "acordo_disponivel": true,
                    "desconto_para_quitacao": "15%",
                    "canal_negociacao": "www.bancox.com.br/negocie"
                },
                {
                    "contrato": "0035698741",
                    "descricao": "Cartão de Crédito",
                    "valor_original": 5200.00,
                    "valor_atualizado": 5890.10,
                    "data_emissao": "2024-12-05",
                    "data_vencimento": "2025-01-05",
                    "dias_em_atraso": 80,
                    "status": "Em aberto",
                    "acordo_disponivel": true,
                    "desconto_para_quitacao": "10%",
                    "canal_negociacao": "www.bancox.com.br/negocie"
                }
            ],
            "observacoes": "Cliente com bom histórico de relacionamento até 2023. Ofertas especiais disponíveis para pagamento à vista ou parcelamento em até 12x sem juros até 31/03/2025.",
            "ultima_atualizacao": "2025-03-25T09:00:00Z"
        },

        {
            "idCliente": 1,
            "nomeCompleto": "Jonathan Santos",
            "document": " 987.654.321-00",
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
            "incidentesReportados": [
                {
                    "motivo": "Queda de energia",
                    "status": "Equipe se deslocando para o local",
                    "descricao": "Bairro ficou sem luz após chuvas e ventanias",
                    "expectativa_solucao": "Após 8am do dia seguinte"
                }]
        },
        {
            "idCliente": 2,
            "nomeCompleto": "João Batista Pereira",
            "document": "987.654.321-00",
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
            "orderId": "v22987004frm-02",
            "document": "80711847568",
            "sequence": "22987005",
            "marketplaceOrderId": "",
            "marketplaceServicesEndpoint": null,
            "sellerOrderId": "885934",
            "origin": "Marketplace",
            "affiliateId": "",
            "salesChannel": "9",
            "merchantName": null,
            "status": "invoice",
            "workflowIsInError": true,
            "statusDescription": "Verificando Fatura",
            "value": 11920,
            "creationDate": "2025-03-20T17:17:02.3751439+00:00",
            "lastChange": "2025-03-21T14:47:43.8175360+00:00",
            "orderGroup": "v22987004frm",
            "followUpEmail": "3de3264add2f4fda83d6cf343a0b0334@ct.vtex.com.br",
            "lastMessage": null,
            "hostname": "lojafarm",
            "isCompleted": true,
            "roundingError": 0,
            "orderFormId": "d322fe3f67c74bceb6c764276a2c5905",
            "allowCancellation": false,
            "allowEdition": false,
            "isCheckedIn": false,
            "authorizedDate": "2025-03-20T17:17:24.0000000+00:00",
            "invoicedDate": null,
            "cancelReason": null,
            "checkedInPickupPointId": null,
            "totals": [
                {
                    "id": "Items",
                    "name": "Total dos Itens",
                    "value": 14900
                },
                {
                    "id": "Discounts",
                    "name": "Total dos Descontos",
                    "value": -2980
                },
                {
                    "id": "Shipping",
                    "name": "Total do Frete",
                    "value": 0,
                    "alternativeTotals": [
                        {
                            "id": "AlternativeShippingTotal",
                            "name": "Alternative Shipping Total",
                            "value": 1500
                        },
                        {
                            "id": "AlternativeShippingDiscount",
                            "name": "Alternative Shipping Discount",
                            "value": -1500
                        }
                    ]
                },
                {
                    "id": "Tax",
                    "name": "Total da Taxa",
                    "value": 0
                }
            ],
            "sellers": [
                {
                    "id": "MKTP183",
                    "name": "MKTP_DOM STORE MULTIMARCAS",
                    "logo": "https://somaplace.somalabs.com.br/app/",
                    "fulfillmentEndpoint": "https://gruposomaapi.conectala.com.br/app/Api/SellerCenter/Vtex/Farm"
                }
            ],
            "clientPreferencesData": {
                "locale": "pt-BR",
                "optinNewsLetter": true
            },
            "cancellationData": null,
            "taxData": null,
            "subscriptionData": null,
            "itemMetadata": {
                "Items": [
                    {
                        "Id": "539394",
                        "Seller": "MKTP183",
                        "Name": "Toalha Tchibum Bananarte Bananarte - U",
                        "SkuName": "Bananarte - U",
                        "ProductId": "154642",
                        "RefId": "343850_00064_1",
                        "Ean": "3438500006401",
                        "ImageUrl": "https://lojafarm.vteximg.com.br/arquivos/ids/3401874-100-150/343850_00064_1-TOALHA-TCHIBUM-BANANARTE.jpg?v=638573412374230000",
                        "DetailUrl": "/toalha-tchibum-bananarte-bananarte-343850-00064/p",
                        "AssemblyOptions": []
                    },
                    {
                        "Id": "515439",
                        "Seller": "1",
                        "Name": "Vestido Fenda Estampado Jardim Da Grécia Jardim Da Grecia_Off White - M",
                        "SkuName": "Jardim Da Grecia_Off White - M",
                        "ProductId": "149301",
                        "RefId": "334855_49183_3",
                        "Ean": "33485549183M",
                        "ImageUrl": "https://lojafarm.vteximg.com.br/arquivos/ids/3427623-100-150/334855_49183_1-VESTIDO-FENDA-JARDIM-DA-GRECIA.jpg?v=638604119042070000",
                        "DetailUrl": "/vestido-fenda-estampado-jardim-da-grecia-jardim-da-grecia_off-white-334855-49183/p",
                        "AssemblyOptions": []
                    },
                    {
                        "Id": "526145",
                        "Seller": "1",
                        "Name": "Short Sarja Bainha Dobrada Laranja Neon Laranja Neon - 38",
                        "SkuName": "Laranja Neon - 38",
                        "ProductId": "151628",
                        "RefId": "338849_0005_3",
                        "Ean": "338849000538",
                        "ImageUrl": "https://lojafarm.vteximg.com.br/arquivos/ids/3403617-100-150/338849_0005_1-SHORT-SARJA-BAINHA-DOBRADA-LARANJA-NEON.jpg?v=638575301075700000",
                        "DetailUrl": "/short-sarja-bainha-dobrada-laranja-neon-laranja-neon-338849-0005/p",
                        "AssemblyOptions": []
                    },
                    {
                        "Id": "544837",
                        "Seller": "1",
                        "Name": "Maiô Side Boob Estampado Festa Das Araras Est Festa Das Araras_Biquini Praia_Multi - P",
                        "SkuName": "Est Festa Das Araras_Biquini Praia_Multi - P",
                        "ProductId": "155769",
                        "RefId": "333192_49017_2",
                        "Ean": "33319249017P",
                        "ImageUrl": "https://lojafarm.vteximg.com.br/arquivos/ids/3442343-100-150/333192_49017_1-MAIO-SIDE-BOOB-ESTAMPADO-FESTA-DAS-ARARAS.jpg?v=638647902791630000",
                        "DetailUrl": "/maio-side-boob-estampado-festa-das-araras-est-festa-das-araras_biquini-praia_multi-333192-49017/p",
                        "AssemblyOptions": []
                    }
                ]
            },
            "marketplace": null,
            "storePreferencesData": {
                "countryCode": "BRA",
                "currencyCode": "BRL",
                "currencyFormatInfo": {
                    "CurrencyDecimalDigits": 2,
                    "CurrencyDecimalSeparator": ",",
                    "CurrencyGroupSeparator": ".",
                    "CurrencyGroupSize": 3,
                    "StartsWithCurrencySymbol": true
                },
                "currencyLocale": 1046,
                "currencySymbol": "R$",
                "timeZone": "E. South America Standard Time"
            },
            "customData": null,
            "commercialConditionData": null,
            "openTextField": {
                "value": "7483 - ANA OLIVEIRA"
            },
            "invoiceData": null,
            "changesAttachment": null,
            "callCenterOperatorData": null,
            "paymentData": {
                "transactions": [
                    {
                        "isActive": true,
                        "transactionId": "12C473AED7A24B2BA420A9EC3B9C5349",
                        "merchantName": "LOJAFARM",
                        "payments": [
                        ]
                    }
                ],
                "giftCards": []
            },
            "shippingData": {
                "id": "shippingData",
                "address": {
                    "addressType": "residential",
                    "receiverName": "MARIA SOUZA SANTOS",
                    "addressId": "79894969a847402e9bb9ee5424d60e37",
                    "versionId": null,
                    "entityId": null,
                    "postalCode": "41760050",
                    "city": "Salvador",
                    "state": "BA",
                    "country": "BRA",
                    "street": "Rua Doutor Arnaldo",
                    "number": "272",
                    "neighborhood": "Costa Azul",
                    "complement": "Ed Côte d’Azur 103",
                    "reference": null,
                    "geoCoordinates": [
                        -38.449073791503906,
                        -12.996094703674316
                    ]
                },
                "trackingHints": null,
                "selectedAddresses": [
                    {
                        "addressType": "residential",
                        "receiverName": "MARIA SOUZA SANTOS",
                        "addressId": "79894969a847402e9bb9ee5424d60e37",
                        "versionId": null,
                        "entityId": null,
                        "postalCode": "41760050",
                        "city": "Salvador",
                        "state": "BA",
                        "country": "BRA",
                        "street": "Rua Doutor Boureau",
                        "number": "272",
                        "neighborhood": "Costa Azul",
                        "complement": "Ed Côte d’Azur 103",
                        "reference": null,
                        "geoCoordinates": [
                            -38.449073791503906,
                            -12.996094703674316
                        ]
                    }
                ],
                "availableAddresses": [
                    {
                        "addressType": "residential",
                        "receiverName": "MARIA SOUZA SANTOS",
                        "addressId": "79894969a847402e9bb9ee5424d60e37",
                        "versionId": null,
                        "entityId": null,
                        "postalCode": "41760050",
                        "city": "Salvador",
                        "state": "BA",
                        "country": "BRA",
                        "street": "Rua Doutor Boureau",
                        "number": "272",
                        "neighborhood": "Costa Azul",
                        "complement": "Ed Côte d’Azur 103",
                        "reference": null,
                        "geoCoordinates": [
                            -38.449073791503906,
                            -12.996094703674316
                        ]
                    }
                ],
                "contactInformation": []
            },
            "marketingData": {
                "id": "marketingData",
                "utmSource": null,
                "utmPartner": null,
                "utmMedium": null,
                "utmCampaign": null,
                "coupon": "bazar20",
                "utmiCampaign": "codigodavendedora",
                "utmipage": null,
                "utmiPart": null,
                "marketingTags": [
                    "app_2.55.0",
                    "app_ios",
                    "app_iphone17,1"
                ]
            },
            "giftRegistryData": null,
            "clientProfileData": {
                "id": "clientProfileData",
                "email": "3de3264add2f4fda83d6cf343a0b0334@ct.vtex.com.br",
                "firstName": "PAULA SHIRLEY SOUZA",
                "lastName": "SANTOS",
                "documentType": "cpf",
                "phone": "+55719997746",
                "corporateName": null,
                "tradeName": null,
                "corporateDocument": null,
                "stateInscription": null,
                "corporatePhone": null,
                "isCorporate": false,
                "userProfileId": "0289ba47-1eff-46d2-99f1-8111a7a32271",
                "userProfileVersion": null,
                "customerClass": null,
                "customerCode": null
            },
            "items": [
                {
                    "uniqueId": "B5EB7C7C758E47A5858A3B9234A0C9BA",
                    "id": "539394",
                    "productId": "154642",
                    "ean": "3438500006401",
                    "lockId": null,
                    "itemAttachment": {
                        "content": {},
                        "name": null
                    },
                    "attachments": [],
                    "quantity": 1,
                    "seller": "MKTP183",
                    "name": "Toalha Tchibum Bananarte Bananarte - U",
                    "refId": "343850_00064_1",
                    "price": 14900,
                    "listPrice": 14900,
                    "manualPrice": null,
                    "manualPriceAppliedBy": null,
                    "priceTags": [
                        {
                            "name": "discount@price-366b734b-74ba-48a9-af80-9141c02739ed#caf7ae07-0e29-4076-8612-d120a83eccd8",
                            "value": -2980,
                            "isPercentual": false,
                            "identifier": "366b734b-74ba-48a9-af80-9141c02739ed",
                            "rawValue": -29.80,
                            "rate": null,
                            "jurisCode": null,
                            "jurisType": null,
                            "jurisName": null
                        },
                        {
                            "name": "discount@shipping-766d65b4-9e4b-4153-9595-abf2e6261e55#94f97370-de92-452e-9b7c-a189a01ebd7a",
                            "value": -1500,
                            "isPercentual": false,
                            "identifier": "766d65b4-9e4b-4153-9595-abf2e6261e55",
                            "rawValue": -15.0,
                            "rate": null,
                            "jurisCode": null,
                            "jurisType": null,
                            "jurisName": null
                        },
                        {
                            "name": "discount@shipping-103b6e20-d00d-475c-9585-2e344f767cf0#2912a011-dd98-4a6e-ae07-af0e95ab9a18",
                            "value": 0,
                            "isPercentual": false,
                            "identifier": "103b6e20-d00d-475c-9585-2e344f767cf0",
                            "rawValue": 0.0,
                            "rate": null,
                            "jurisCode": null,
                            "jurisType": null,
                            "jurisName": null
                        }
                    ],
                    "imageUrl": "https://lojafarm.vteximg.com.br/arquivos/ids/3401874-100-150/343850_00064_1-TOALHA-TCHIBUM-BANANARTE.jpg?v=638573412374230000",
                    "detailUrl": "/toalha-tchibum-bananarte-bananarte-343850-00064/p",
                    "components": [],
                    "bundleItems": [],
                    "params": [],
                    "offerings": [],
                    "attachmentOfferings": [],
                    "sellerSku": "78317061",
                    "priceValidUntil": "2026-03-20T17:14:03.0000000+00:00",
                    "commission": 2000,
                    "tax": 0,
                    "preSaleDate": null,
                    "additionalInfo": {
                        "brandName": "Farm",
                        "brandId": "2000001",
                        "categoriesIds": "/2/386/",
                        "categories": [
                            {
                                "id": 386,
                                "name": "Acessórios"
                            },
                            {
                                "id": 2,
                                "name": "bazar farm"
                            },
                            {
                                "id": 428,
                                "name": "me leva"
                            },
                            {
                                "id": 1,
                                "name": "Moda Feminina"
                            }
                        ],
                        "productClusterId": "141,143,144,191,271,278,794,1048,1380,1444,1445,1446,1448,1460,1488,1619",
                        "commercialConditionId": "1",
                        "dimension": {
                            "cubicweight": 0.0,
                            "height": 1.0,
                            "length": 1.0,
                            "weight": 333.0,
                            "width": 1.0
                        },
                        "offeringInfo": null,
                        "offeringType": null,
                        "offeringTypeId": null
                    },
                    "measurementUnit": "un",
                    "unitMultiplier": 1.0,
                    "sellingPrice": 11920,
                    "isGift": false,
                    "shippingPrice": null,
                    "rewardValue": 0,
                    "freightCommission": 0,
                    "priceDefinition": {
                        "sellingPrices": [
                            {
                                "value": 11920,
                                "quantity": 1
                            }
                        ],
                        "calculatedSellingPrice": 11920,
                        "total": 11920,
                        "reason": null
                    },
                    "taxCode": "63029300",
                    "parentItemIndex": null,
                    "parentAssemblyBinding": null,
                    "callCenterOperator": null,
                    "serialNumbers": null,
                    "assemblies": [],
                    "costPrice": null
                }
            ],
            "marketplaceItems": [],
            "cancellationRequests": null,
            "approvedBy": null,
            "cancelledBy": null
        }
    ];