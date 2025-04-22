<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::query();
        
        $search = '';
        if ($request->has('search') && $request->filled('search'))
        {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $sortColumn = 'name';
        $sortDirection = 'asc';
        if ($request->has('sortColumn') && $request->filled('sortColumn'))
        {
            $sortColumn = $request->input('sortColumn');
            if ($request->has('sortDirection') && $request->filled('sortDirection'))
            {
                $sortDirection = $request->input('sortDirection');
            }

        }
        
        $query->orderBy($sortColumn, $sortDirection);
        $products = $query->paginate(50)->withQueryString();
    
        return Inertia::render('products/index', [
            'products' => $products,
            'filters' => compact('search', 'sortColumn', 'sortDirection'),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);
        Product::create($data);
        return redirect()->route('products.index')->with('success', 'Produto criado com sucesso!');
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/edit', [
            'product' => $product
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);
        $product->update($data);
        return redirect()->route('products.index')->with('success', 'Produto atualizado com sucesso!');
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return redirect()->route('products.index');
    }
}
