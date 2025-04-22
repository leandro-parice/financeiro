import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import ProductForm from './form';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Produtos',
        href: '/products',
    },
    {
        title: 'Criar produto',
        href: '',
    },
];

type ProductFormData = {
    name: string;
    price: string;
    description?: string;
};

export default function ProductCreate() {
    const { data, setData, post, processing, errors } = useForm<ProductFormData>({
        name: '',
        price: '',
        description: '',
    });

    const handleSubmit = () => {
        post(route('products.store'))
    }

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