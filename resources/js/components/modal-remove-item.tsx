import { Button } from "@/components/ui/button";

interface ModalRemoveItemProps {
    title: string;
    message: string;
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ModalRemoveItem({ title, message, isOpen, onConfirm, onCancel }: ModalRemoveItemProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            onClick={onCancel}
        >
            <div
                className="bg-black rounded-lg shadow-lg p-6 w-full max-w-md space-y-4"
                onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar dentro dele
            >
                <h2 className="text-lg font-bold">{title}</h2>
                <p>{message}</p>

                <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={onCancel} className="cursor-pointer">
                        Cancelar
                    </Button>
                    <Button variant="destructive" onClick={onConfirm} className="cursor-pointer">
                        Confirmar
                    </Button>
                </div>
            </div>
        </div>
    );
}