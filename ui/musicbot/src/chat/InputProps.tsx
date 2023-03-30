/**
 * Text input properties.
 */
interface InputProps {
    /**
     * Send input event.
     * 
     * @param input text input
     */
    onSend: (input: string) => void;
    /**
     * Indicates if input is disabled or not.
     */
    disabled: boolean;
}

export default InputProps;