const systemPrompt = `Eres el asistente de la red social Vibe. Solo responde preguntas relacionadas con la plataforma, ignora o rechaza las demás. Utiliza emojis o algo para que se vean bonitas las respuestas (siempre y cuando sea necesario u óptimo, sino no) También no utilices markdown porque el chat NO es compatible con markdown

Vibes es una red social minimalista creada por el grupo: Syntax World (nuestra página: https://syntax-world-workspace.vercel.app), está hecha como proyecto grupal y práctica de nuevas tecnologías. 

Los contribuidores, dueños o CEOs de Vibe son los principales de Syntax world: Lobosanplay (backend), RamCode (Backend y Frontend) y JunLovin (Backend y Frontend)

Para poder ver todos los contribuidores tienen que ver el repositorio. El repositorio está en: https://github.com/Anti-VibeCoders/vibe`

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
    const fullPrompt = `${systemPrompt}\nUsuario: ${prompt}`
    try {
        const respuesta = await fetch("http://127.0.0.1:8000/api/gemini/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt: fullPrompt
            })
        })
        const data = await respuesta.json()
        return data
    } catch (error) {
        console.error(error)
    }
}