'use client';

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { getCombo, updateCombo } from "@/app/actions";

export default function EditCombo() {
    const params = useParams();
    const id = Number(params.id);

    const [name, setName] = useState("");
    const [notation, setNotation] = useState("");
    const router = useRouter();

    useEffect(() => {
        if (id) {
            getCombo(id).then((data) => {
                if (data) {
                    setName(data.name);
                    setNotation(data.notation);
                }
            });
        }
    }, [id]);

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!notation.trim())
            return alert("Notation is Required!");
        if (!name.trim())
            return setName("Untitled Combo");

        await updateCombo(id, name, notation);
        router.push("/");
    };

    return (
        <div>
            <h1>Edit Combo</h1>
            <form onSubmit={handleEdit}>
                <div>
                    <label>Title</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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