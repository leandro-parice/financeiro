import { Button } from "@/components/ui/button"
import { Trash, Trash2 } from "lucide-react"

interface Product {
	id: number
	name: string
	description: string
	price: string
	created_at: string
	updated_at: string
}

interface TableActionDeleteButtonProps {
    product: Product;
    onConfirmDelete: (product: Product) => void;
}

export function TableActionDeleteButton({ product, onConfirmDelete }: TableActionDeleteButtonProps) {
    return (
        <Button
            variant="destructive"
            size="sm"
            onClick={() => onConfirmDelete(product)}
            className="cursor-pointer"
        >
            <Trash2 /> Remover
        </Button>
    );
}