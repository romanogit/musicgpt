'use client';

import Writer from './Writer';
import MessageProps from './MessageProps';

export default function ChatMessage({ text, writer }: MessageProps) {
    return (
        <>
            {writer == Writer.Me && (
                <div className="conversationMessageItem conversationMessageItem--left clearfix">
                    <div className="messageValue">
                        <p>{text}</p>
                    </div>
                </div>
            )}

            {writer == Writer.GPT && (
                <div className="conversationMessageItem conversationMessageItem--right clearfix">
                    <div className="messageValue">
                        <p>{text}</p>
                    </div>
                </div>
            )}
        </>
    );
};