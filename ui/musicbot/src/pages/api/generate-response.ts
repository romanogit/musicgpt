// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';

/**
 * API response, just a plain text response
 */
type ResponseData = {
    text: string
};

/**
 * API Request, contains the prompt and the model to use
 */
interface GenerateNextApiRequest extends NextApiRequest {
    body: {
        prompt: string,
        model: string
    };
}

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.OPENAI_API_KEY
}));

export default async function handler(
    req: GenerateNextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    const prompt = req.body.prompt;
    const model = req.body.model;

    if (!prompt || prompt.trim() === '') {
        throw new Response('Invalid prompt', { status: 400 });
    }

    try {
        const result = await openai.createCompletion({
            model: model, //'curie:ft-personal-2023-03-30-12-31-10', //davinci:ft-personal-2023-03-30-16-35-37
            prompt: `${prompt} ->`,
            max_tokens: 150,
            stop: ['\n'],
            temperature: 0.75, // the higher the value, higher the risks
            frequency_penalty: 0.5,
            presence_penalty: 0
        });
        if (!result.data) {
            res.status(200).json({ text: 'Ops, an error' });
            return;
        }
        const response = result.data.choices[0].text?.trim() || 'Ops, an error';
        res.status(200).json({ text: response });
    } catch (error) {
        res.status(404).end();
    }
}