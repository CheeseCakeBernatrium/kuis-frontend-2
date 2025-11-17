'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type Combo = {
    id: number;
    title: string;
    notation: string;
    date: string;
};

export default function CreateCombo() {
    const [title, setTitle] = useState("");
    const [notation, setNotation] = useState("");
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!notation.trim())
            return alert("Notation is required!");
        if (!title.trim())
            return setTitle("Untitled Combo");

        const newCombo: Combo = {
            id: Date.now(),
            title, 
            notation, 
            date: new Date().toLocaleDateString("en-GB"),
        }

        const saved = localStorage.getItem("combos");
        const combos = saved ? JSON.parse(saved) : [];
        combos.push(newCombo);
        localStorage.setItem("combos", JSON.stringify(combos));

        router.push("/");
    };

    return (
        <div>
            <h1>Listing A Combo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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