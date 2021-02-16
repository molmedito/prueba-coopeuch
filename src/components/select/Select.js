import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react'

const Select = forwardRef(({optionList, label, ...props}, ref) => {
    const [input, setInput] = useState('selecciona');
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (optionList) setOptions(optionList)
    }, [optionList])

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
            <div className="select">
                <select
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    ref={ref}
                >
                    <option
                        disabled
                        value="selecciona"
                    >
                        Selecciona una opción...
                    </option>

                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
            </div>
        </div>
    )
});
  
export default Select
