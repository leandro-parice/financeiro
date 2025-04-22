import { Button } from "@/components/ui/button";

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationProps {
    links: PaginationLink[];
    onPageChange: (page: number, url: string) => void;
}

export function Pagination({ links, onPageChange }: PaginationProps) {
    return (
        <div className="flex justify-end mt-4 gap-2">
            {links.map((link, i) => {
                const urlParams = link.url ? new URLSearchParams(link.url.split('?')[1]) : null;
                const page = urlParams ? parseInt(urlParams.get('page') || '1', 10) : null;

                return (
                    <Button
                        key={i}
                        variant={link.active ? "default" : "outline"}
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => {
                            if (link.url && page !== null) {
                                onPageChange(page, link.url);
                            }
                        }}
                        disabled={!link.url}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}