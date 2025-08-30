import ChatBot from 'react-chatbotify'
import Icon from '@public/favicon/android-chrome-192x192.png'
import { flow, themes } from '../data/chatbot'

function Chatbot() {
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