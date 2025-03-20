const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST({ request }: { request: any }) {
    try {
        const sdpBody = request.body;
        
        const response = await fetch('https://api.openai.com/v1/realtime?model=gpt-4o-mini-realtime-preview-2024-12-17', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/sdp'
            },
            body: sdpBody,
        });

        // Check if the request was successful
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error from OpenAI API:', errorText);
            
            return new Response(errorText, {
                status: response.status,
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
        }

        // Process successful response
        const responseBody = await response.text();
        
        return new Response(responseBody, {
            status: 200,
            headers: {
                'Content-Type': 'application/sdp'
            }
        });
    } catch (error: unknown) {
        console.error('Erro ao processar requisição:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return new Response(`Erro interno: ${errorMessage}`, {
            status: 500,
            headers: {
                'Content-Type': 'text/plain'
            }
        });
    }
}