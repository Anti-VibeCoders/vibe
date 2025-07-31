import ChatBot from 'react-chatbotify'
import Icon from '@public/favicon/android-chrome-192x192.png'

function Chatbot() {
    const allowedKeywords = [
        "vibe", "red social", "perfil", "ayuda", "post", "notificación"
    ]

    const relacionadoConVibe = (text: string) : void | undefined => {
        allowedKeywords.some(keyword => text.toLowerCase().includes(keyword))
    }

    const systemPrompt = "Eres el asistente de la red social Vibe. Solo responde preguntas relacionadas con la plataforma, ignora o rechaza las demás."

    const getResponse = async (prompt: string) => {
        if (!relacionadoConVibe(prompt)) {
            return "Solo puedo responder a preguntas relacionadas con **Vibe**. 😊"
        }
        const fullPrompt = `${systemPrompt}\nUsuario: ${prompt}`
        try {
            const respuesta = await fetch("http://localhost:3000/geminiapi", {
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

    const flow = {
        start: {
            message: "¡Bievenido a Vibe, la mejor red social del mundo! ✨",
            path: 'model_loop',
        },
        model_loop: {
            message: async (params: any) => {
                return await getResponse(params.userInput)
            },
            path: 'model_loop'
        }
    }

    const themes = [
        { id: "omen", version: "0.1.0" }
    ]

    return (
        <ChatBot
        flow={flow}
        themes={themes}
        settings={{
            tooltip: {
                mode: "NEVER"
            },
            chatButton: {
                icon: Icon,
            },
            header: {
                title: 'Vibe Bot',
                avatar: Icon
            },
        }}
        styles={{
            chatButtonStyle: { scale: 0.7, bottom: '32px', right: '30px' },
        }}
        />
    )
}

export default Chatbot