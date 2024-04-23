"use client"
import { useState } from 'react'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/Filters'
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Pagination from '@/components/pagination';



export default function Page({ searchParams }) {

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [allProducts, setAllProducts] = useState([]);


  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  return (
    <>
      <Suspense>
        <Navbar products={allProducts} />
      </Suspense>
      <ProductFilters selectedCategories={selectedCategories} selectedPriceRanges={selectedPriceRanges} setSelectedCategories={setSelectedCategories} setSelectedPriceRanges={setSelectedPriceRanges} sortBy={sortBy} setSortBy={setSortBy} />
      <Suspense key={query + currentPage}>
        <ProductCard selectedCategories={selectedCategories} selectedPriceRanges={selectedPriceRanges} sortBy={sortBy} setAllProducts={setAllProducts} query={query} currentPage={currentPage} />
      </Suspense>
    </>
  )
}
