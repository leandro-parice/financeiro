import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import ProductForm from './form';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: string;
    created_at: string;
    updated_at: string;
}

interface ProductEditPageProps {
    product: Product;
}

type ProductFormData = {
    name: string;
    price: string;
    description?: string;
};

export default function ProductEdit({ product }: ProductEditPageProps) {
    const { data, setData, put, processing, errors } = useForm<ProductFormData>({
        name: product.name,
        price: product.price,
        description: product.description || '',
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Produtos',
            href: '/products',
        },
        {
            title: `Editar o produto ${product.name}`,
            href: '',
        },
    ];

    const handleSubmit = () => {
        put(route('products.update', product.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Produtos" />
            <ProductForm
                data={data}
                setData={setData}
                onSubmit={handleSubmit}
                processing={processing}
                errors={errors}
            />
        </AppLayout>
    );
}