// A component becomes a Client Component when using the "use client" directive at the top of the file (before any imports).
'use client';

import useState from 'react-usestateref';

import Writer from '@/chat/Writer';
import MessageProps from '@/chat/MessageProps';
import ChatMessage from '@/chat/ChatMessage';
import ChatInput from '@/chat/ChatInput';

export default function Home() {
    const [messages, setMessages, messagesRef] = useState<MessageProps[]>([]);
    const [model, setModel] = useState('davinci:ft-personal-2023-03-30-16-35-37');
    const [loading, setLoading] = useState(false);

    const callOpenaiApi = async (input: string) => {
        setLoading(true);

        const userMessage: MessageProps = {
            text: input,
            writer: Writer.Me,
            key: new Date().getTime() // TODO add some counter
        };

        setMessages([...messagesRef.current, userMessage]);

        const response = await fetch('/api/generate-response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input,
                model: model
            })
        }).then((response) => response.json());
        setLoading(false);

        if (response.text) {
            const gptMessage: MessageProps = {
                text: response.text,
                writer: Writer.GPT,
                key: new Date().getTime() // TODO add some counter
            }
            setMessages([...messagesRef.current, gptMessage]);
        } else {
            // TODO handle error
        }
    }

    return (
        <div>
            <div className="conversationPanel">
                {messages.map((msg: MessageProps) => (
                    <ChatMessage key={msg.key} text={msg.text} writer={msg.writer} />
                ))}
                {messages.length === 0 && <p>Start asking: type above and press enter</p>}
            </div>
            <div className="questionPanel">
                <ChatInput onSend={(input) => callOpenaiApi(input)} disabled={loading} />
                <select value={model} onChange={(event) => setModel(event.target.value)}>
                    <option value="davinci:ft-personal-2023-03-30-16-35-37">Da-Vinci Music Tuned</option>
                    <option value="curie:ft-personal-2023-03-30-12-31-10">Curie Music Tuned</option>
                    {/* <option value="gpt-3.5-turbo">GPT 3.5 turbo</option> */}
                </select>
            </div>
        </div>
    );
}