'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getCombos() {
    return await prisma.combo.findMany({
        orderBy: {
            id: 'desc',
        },
    });
}

export async function getCombo(id: number) {
    return await prisma.combo.findUnique({
        where: { id },
    });
}

export async function createCombo(name: string, notation: string) {
    await prisma.combo.create({
        data: {
            name,
            notation,
            date: new Date().toLocaleDateString('en-GB'),
        },
    });
    revalidatePath('/');
}

export async function updateCombo(id: number, name: string, notation: string) {
    await prisma.combo.update({
        where: { id },
        data: {
            name,
            notation,
        },
    });
    revalidatePath('/');
}

export async function deleteCombo(id: number) {
    await prisma.combo.delete({
        where: { id },
    });
    revalidatePath('/');
}