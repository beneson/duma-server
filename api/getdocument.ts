import fs from 'node:fs';
import path from 'node:path';

export async function GET({request}: {request: any}) {
  
  const protocol = request.protocol;
    const host = request.get('host');
    const urlPath = request.originalUrl;
    const url = new URL(`${protocol}://${host}${urlPath}`);
    
    const params = url.searchParams;
    const document = params.get('document');
    const language = params.get('language');
  
  if (!document || !language) {
    return new Response(JSON.stringify({ error: 'Documento não fornecido' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  const filePath = path.join(process.cwd(), 'api', 'prompts', document);
  
  try {
    console.log('Lendo o arquivo:', filePath);
    let fileContent = fs.readFileSync(filePath, 'utf-8');

    const promptLanguage = 'Língua de resposta: ' + language;
    fileContent = promptLanguage + '\n\n' + fileContent;

    // Verificar se é um arquivo JSON ou texto
    if (document.endsWith('.json')) {
      // Se for .json, parse como JSON
      const data = JSON.parse(fileContent);
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } else {
      // Se não for .json, retorne como texto
      return new Response(fileContent, {
        status: 200,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  } catch (error) {
    console.error('Erro ao ler o arquivo agent-mapping.json:', error);
    return new Response(JSON.stringify({ error: 'Falha ao carregar dados' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}