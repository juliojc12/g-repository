import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

interface Patrimonio {
    id: number;
    defeito: string;
    numeroPatrimonio: string;
}

app.get('/', async (req: Request, res: Response) => {
    try {
        const patrimonios = await prisma.patrimonio.findMany();
        res.json(patrimonios);
    } catch (error) {
        console.error("Failed to retrieve patrimonios:", error);
        res.status(500).json({ error: 'Erro ao buscar patrimônios.' });
    }
});

app.post('/', async (req: Request, res: Response) => {
    const { defeito, numeroPatrimonio } = req.body as Patrimonio;
    try {
        console.log(defeito, numeroPatrimonio);
        if (defeito !== "" && numeroPatrimonio !== "") {
            const patrimonio = await prisma.patrimonio.create({
                data: {
                    defeito,
                    numeroPatrimonio,
                },
            });
            res.json(patrimonio);
        }
        else {
            res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
        }
    } catch (error) {
        console.error("Failed to create patrimonio:", error);
        res.status(500).json({ error: 'Erro ao criar o patrimônio.' });
    }
});

app.put('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { defeito } = req.body as { defeito: string };

    try {
        const patrimonio = await prisma.patrimonio.update({
            where: { id },
            data: { defeito },
        });
        res.json(patrimonio);
    } catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: 'Patrimônio não encontrado.' });
        } else {
            console.error("Failed to update patrimonio:", error);
            res.status(500).json({ error: 'Erro ao atualizar o patrimônio.' });
        }
    }
});

app.delete('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

    try {
        const patrimonio = await prisma.patrimonio.delete({
            where: { id },
        });
        res.json(patrimonio);
    } catch (error) {
        if (error.code === "P2025") {
            res.status(404).json({ error: 'Patrimônio não encontrado.' });
        } else {
            console.error("Failed to delete patrimonio:", error);
            res.status(500).json({ error: 'Erro ao deletar o patrimônio.' });
        }
    }
});

app.listen(3000, () =>
    console.log(`
    🚀 Server running on http://localhost:3000
    ✔️ Api desenvolvida por TI Gondim, 
    💻 Dev responsável: julio.silva@gondimadv.com.br    
`),
);
