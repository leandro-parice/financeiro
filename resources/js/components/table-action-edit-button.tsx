import { Button } from "@/components/ui/button"
import { Pencil } from "lucide-react";

export function TableActionEditButton({ href }: { href: string }) {
    return (
        <a href={href}>
        <Button variant="outline" size="sm" className="cursor-pointer">
            <Pencil /> Editar
        </Button>
    </a>
    );
}