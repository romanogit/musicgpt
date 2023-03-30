
import useState from 'react-usestateref';

import InputProps from "./InputProps";

export default function ChatInput({ onSend, disabled }: InputProps) {
    const [input, setInput] = useState('');

    const sendInput = () => {
        onSend(input);
        setInput('');
    };

    const onKeyDown = (keyDownEvent: any) => {
        if (!keyDownEvent.shiftKey && keyDownEvent.keyCode === 13) {
            sendInput();
        }
    };

    return (
        <div>
            <textarea
                value={input}
                onChange={(changeEvent: any) => setInput(changeEvent.target.value)}
                placeholder="Enter question here..."
                disabled={disabled}
                onKeyDown={(keyDownEvent) => onKeyDown(keyDownEvent)}
                rows={1}
            />
            <button onClick={() => sendInput()}>
                <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                    strokeLinecap="round" strokeLinejoin="round"
                    height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
            </button>
        </div>
    )
}