import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Save } from 'lucide-react';

interface ProductFormProps {
    data: {
        name: string;
        price: string;
        description?: string;
    };
    setData: (field: string, value: any) => void;
    onSubmit: () => void;
    processing: boolean;
    errors: Record<string, string>;
}

export default function ProductForm({ data, setData, onSubmit, processing, errors }: ProductFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="name">Nome</Label>
                    <Input
                        id="name"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                    />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div>
                    <Label htmlFor="price">Preço</Label>
                    <Input
                        id="price"
                        type="text"
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                    />
                    {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                </div>

                <div>
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                        id="description"
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                    />
                    {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                </div>

                <Button type="submit" disabled={processing} className="cursor-pointer">
                    <Save /> {data.name ? 'Atualizar' : 'Salvar'}
                </Button>
            </form>
        </div>
    );
}