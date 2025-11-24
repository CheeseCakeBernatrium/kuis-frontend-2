'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

type Combo = {
    id: number;
    title: string;
    notation: string;
    date: string;
};

export default function EditCombo() {
    const {id} = useParams<{id: string}>();
    const [title, setTitle] = useState("");
    const [notation, setNotation] = useState("");
    const router = useRouter();

    useEffect(() => {
        const saved = localStorage.getItem("combos");
        if(saved){
            const combos: Combo[] = JSON.parse(saved);
            const found = combos.findLast((p) => p.id === Number(id));
            if(found){
                setTitle(found.title);
                setNotation(found.notation);
            }
        }
    }, [id]);

    const handleEdit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!notation.trim())
            return alert("Notation is Required!");
        if (!title.trim())
            return setTitle("Untitled Combo");

        const saved = localStorage.getItem("combos");
        if (!saved) return;

        const combos: Combo[] = JSON.parse(saved);

        const updatedCombo = combos.map((combo) => {
            if (combo.id === Number(id)) {
                return { ...combo, title, notation };
            }
            return combo;
        });
        
        localStorage.setItem("combos", JSON.stringify(updatedCombo)); 
        router.push("/"); 
    };

    return (
        <div>
            <h1>Edit Combo</h1>
            <form onSubmit={handleEdit}>
                <div>
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Combo Title"
                    />
                </div>
                <div>
                    <label>Content</label>
                    <textarea
                        rows={4}
                        value={notation}
                        onChange={(e) => setNotation(e.target.value)}
                        placeholder="Combo Notation Goes Here"
                    ></textarea>
                </div>
                <button type="submit">
                    Combo Edited
                </button>
            </form>
        </div>
    );
}