import React, { useRef, useEffect } from "react";

interface Props {
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void,
}

const InputFeild: React.FC<Props> = ({ value, setValue, handleAdd }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef?.current?.focus();
    }, []);


    return (
        <form className="flex items-center w-11/12"
            onSubmit={(e) => {
                handleAdd(e);
                inputRef.current?.focus();
            }}
        >
            <input ref={inputRef} type="text" id="task" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl shadow-2xl focus:ring-blue-500 focus:border-blue-500 outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="enter a task" required value={value} onChange={e => setValue(e.target.value)} />
            <button type="submit" className="bg-sky-500 rounded-full h-9 w-9 -ml-11 text-white text-sm shadow-lg">GO</button>
        </form>
    )
}

export default InputFeild;