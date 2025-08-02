const systemPrompt = "Eres el asistente de la red social Vibe. Solo responde preguntas relacionadas con la plataforma, ignora o rechaza las demás."

const allowedKeywords = [
    "vibe", "red social", "perfil", "ayuda", "post", "notificación"
]

const relacionadoConVibe = (text: string): void | undefined => {
    allowedKeywords.some(keyword => text.toLowerCase().includes(keyword))
}

export const flow = {
    start: {
        message: "¡Bievenido a Vibe, la mejor red social del mundo! ✨",
        path: 'model_loop',
    },
    model_loop: {
        message: async ({ userInput }: { userInput: string }) => {
            return await getResponse(userInput)
        },
        path: 'model_loop'
    }
}

export const themes = [
    { id: "omen", version: "0.1.0" }
]

const getResponse = async (prompt: string) => {
    if (!relacionadoConVibe(prompt)) {
        return "Solo puedo responder a preguntas relacionadas con **Vibe**. 😊"
    }
    const fullPrompt = `${systemPrompt}\nUsuario: ${prompt}`
    try {
        const respuesta = await fetch("http://127.0.0.1:8000/gemini/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: fullPrompt
            })
        })
        const data = await respuesta.json()
        return data.respuesta
    } catch (error) {
        console.error(error)
    }
}