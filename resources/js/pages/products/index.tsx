import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { SortableTableHead } from '@/components/sortable-table-head';
import { TableActionEditButton } from '@/components/table-action-edit-button';
import { TableActionDeleteButton } from '@/components/table-action-delete-button';
import { ModalRemoveItem } from '@/components/modal-remove-item';
import { Pagination } from "@/components/pagination";

const breadcrumbs: BreadcrumbItem[] = [
	{
		title: 'Produtos',
		href: '/products',
	},
];

interface Product {
	id: number
	name: string
	description: string
	price: string
	created_at: string
	updated_at: string
}

interface PaginationLink {
	url: string | null
	label: string
	active: boolean
}

interface ProductsPageProps {
	products: {
		data: Product[]
		links: PaginationLink[]
	}
	filters: {
		search: string
		sortColumn: string
		sortDirection: 'asc' | 'desc',
	}
}

export default function Products({ products, filters }: ProductsPageProps) {

    const { props } = usePage<{ flash?: { success?: string } }>();
    const [successMessage, setSuccessMessage] = useState<string | null>(props.flash?.success || null);

	const routeUrl = route('products.index');

	const [search, setSearch] = useState(filters.search);
	const [sortColumn, setSortColumn] = useState<string>(filters.sortColumn || 'name');
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>(filters.sortDirection ?? 'asc');
	const [page, setPage] = useState(1);

	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const [productToDelete, setProductToDelete] = useState<Product | null>(null)

	useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage(null);
            }, 10000);

            return () => clearTimeout(timer);
        }
    }, [successMessage]);
	
	const handleSort = (column: string) => {
		const direction = sortColumn === column && sortDirection === 'asc' ? 'desc' : 'asc';
	
		setSortColumn(column);
		setSortDirection(direction);
		
		router.get(routeUrl, {
			search: filters.search,
			sortColumn: column,
			sortDirection: direction,
		}, {
			preserveState: true,
			replace: true
		});
	};

	const formatDate = (dateStr: string) => {
		return new Date(dateStr).toLocaleDateString('pt-BR')
	}

	const confirmDelete = (product: Product) => {
		setProductToDelete(product)
		setShowDeleteModal(true)
	}

	useEffect(() => {
		const timeout = setTimeout(() => {
			if (search !== filters.search) {
				router.get(routeUrl, { ...filters, search }, { preserveState: true, replace: true })
			}
		}, 400)
	
		return () => clearTimeout(timeout)
	}, [search])
	
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key === 'Escape') {
				setShowDeleteModal(false)
				setProductToDelete(null)
			}
		}
	
		if (showDeleteModal) {
			document.addEventListener('keydown', handleKeyDown)
		} else {
			document.removeEventListener('keydown', handleKeyDown)
		}
	
		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [showDeleteModal])

	return (
		<AppLayout breadcrumbs={breadcrumbs}>
			<Head title="Produtos" />
			
			<div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

				{successMessage && (
                    <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                        {successMessage}
                    </div>
                )}

				<div className="flex items-center justify-between">
					<a href="/products/create">
						<Button>Novo Produto</Button>
					</a>

					<Input
						placeholder="Buscar por nome..."
						value={search}
						onChange={e => setSearch(e.target.value)}
						className="w-full md:w-1/3"
					/>
				</div>

				<Table>
					<TableHeader>
						<TableRow>
							<SortableTableHead
								title='Id'
								column='id'
								sortColumn={sortColumn}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortableTableHead
								title='Nome'
								column='name'
								sortColumn={sortColumn}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortableTableHead
								title='Preço'
								column='price'
								sortColumn={sortColumn}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<SortableTableHead
								title='Criado em'
								column='created_at'
								sortColumn={sortColumn}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
							<TableHead>Ações</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.data.map(product => (
							<TableRow key={product.id}>
								<TableCell>{product.id}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>R$ {product.price}</TableCell>
								<TableCell>{formatDate(product.created_at)}</TableCell>
								<TableCell className="space-x-2">
									<TableActionEditButton href={`/products/${product.id}/edit`} />
									<TableActionDeleteButton
										product={product}
										onConfirmDelete={confirmDelete} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				<Pagination
					links={products.links}
					onPageChange={(page, url) => {
						setPage(page);

						router.get(url, {
							search,
							sortColumn,
							sortDirection,
							page,
						}, {
							preserveState: true,
							replace: true,
						});
					}}
				/>
			</div>
			<ModalRemoveItem
				title="Confirmar a exclusão?"
				message={`Você tem certeza que quer excluir o produto "${productToDelete?.name}"?`}
				isOpen={showDeleteModal}
				onConfirm={() => {
					router.delete(`/products/${productToDelete?.id}`, {
						onFinish: () => {
							setShowDeleteModal(false);
							setProductToDelete(null);

							router.get(routeUrl, { 
								search,
								sortColumn,
								sortDirection,
								page,
							}, {
								preserveState: true,
								replace: true,
							});
						},
					});
				}}
				onCancel={() => {
					setShowDeleteModal(false);
					setProductToDelete(null);
				}}
			/>
		</AppLayout>
	);
}