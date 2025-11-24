'use client';

import Button from "./button";
import { deleteCombo } from "@/app/actions";

export default function DeleteComboButton({ id }: { id: number }) {
    return (
        <div onClick={() => deleteCombo(id)}>
            <Button text="Delete" />
        </div>
    );
}
