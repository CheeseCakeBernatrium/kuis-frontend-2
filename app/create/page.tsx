'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCombo } from "../actions";

export default function CreateCombo() {
    const [name, setName] = useState("");
    const [notation, setNotation] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!notation.trim())
            return alert("Notation is required!");
        if (!name.trim())
            return setName("Untitled Combo");

        await createCombo(name, notation);
        router.push("/");
    };

    return (
        <div>
            <h1>Listing A Combo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Combo Title"
                    />
                </div>
                <div>
                    <label>Notation</label>
                    <textarea
                        rows={4}
                        value={notation}
                        onChange={(e) => setNotation(e.target.value)}
                        placeholder="Combo Notation Goes Here"
                    ></textarea>
                </div>
                <button type="submit">
                    Combo Create
                </button>
            </form>
        </div>
    );
}