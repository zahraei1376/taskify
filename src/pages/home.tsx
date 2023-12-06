import React, { useState } from "react";
import InputFeild from "../components/InputFeild";

const Home: React.FC = () => {
    const [todo, setTodo] = useState<string>("");

    return (
        <div className="pt-5 w-full h-full bg-sky-500 flex flex-col items-center">
            <span className="font-bold text-center text-white">TASKIFY</span>
            <InputFeild value={todo} setValue={setTodo} />
        </div>
    )
}

export default Home;