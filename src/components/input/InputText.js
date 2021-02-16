import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'

const InputText = forwardRef(({text, helperText, label, ...props}, ref) => {
    const [input, setInput] = useState('');

    useEffect(() => {
        if (text) setInput(text)
    }, [text])

    useImperativeHandle(ref, () => ({
        setText: (newText) => {
            setInput(newText)
        },
        getText: () => {
            return input;
        }
    }));

    return (
        <div>
            { label ?
                <label className="label">{label}</label>
                :
                <></>
            }
            <input
                type="text" 
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                ref={ref}
                {...props}
            />
            { helperText ?
                <p className="is-size-7">{helperText}</p>
                :
                <></>
            }
        </div>
    )
});

export default InputText
