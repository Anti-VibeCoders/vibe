import { GoogleGenAI } from '@google/genai';
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import dotenv from 'dotenv'
dotenv.config()

const ai = new GoogleGenAI({ apiKey: `AIzaSyDfLhZUVlJPz72HQwMBk19uTJzz1La36h8` })
const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())

async function run(prompt: string) {
    const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: prompt
    })
    console.log(response.text)
    const text_response = response.text
    return text_response
}

app.post('/geminiapi', async (req: any, res: any) => {
    const { prompt } = req.body
    const response = await run(prompt)
    res.json({ respuesta: response })
})

app.listen(PORT, () => {
    console.log("El servidor se inició en el puerto 3000")
})