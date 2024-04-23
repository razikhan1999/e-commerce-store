import { useEffect, useState } from "react"
import DialogModal from "../Dialogs"
import Pagination from "../pagination";


export default function ProductCard({ selectedCategories, selectedPriceRanges, sortBy, setAllProducts, query, currentPage }) {

    const [open, setOpen] = useState(false)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState();
    const [pagination, setPagiantion] = useState(false);
 

    const search = query;


    async function fetchProducts(query, categories, priceRanges, sort, page) {
        setLoading(true);
        try {
            let url = 'api/products';
            let queryParams = [];

            if (query) {
                queryParams.push(`query=${query}`);
                queryParams.push(`currentPage=${page}`);
            }
            if (categories.length > 0) {
                queryParams.push(`categories=${categories.join(',')}`);
            }
            if (priceRanges.length > 0) {
                queryParams.push(`priceRanges=${priceRanges.join(',')}`);
            }
            if (sort) {
                queryParams.push(`sort=${sort}`);

            }
            if (queryParams.length > 0) {
                url += '?' + queryParams.join('&');
            }
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const { data, count } = await response.json();
            if (!queryParams.length > 0) {

                setAllProducts(data);

            } else {
                setPagiantion(true);
            }
            console.log("data",data);
            setProducts(data);
            setTotal(count);
            setLoading(false);

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    useEffect(() => {
        fetchProducts(search, selectedCategories, selectedPriceRanges, sortBy, currentPage)
    }, [search, selectedCategories, selectedPriceRanges, sortBy, currentPage])

    if (loading) {

        return <div className="flex justify-center items-center h-screen">
            Loading...
        </div>
    }

    return (
        <>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex justify-end">

                        {/* <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setOpen(!open)}
                    >
                        Add new Product
                        <PlusCircleIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                    </button> */}
                    </div>
                    <DialogModal open={open} setOpen={setOpen} fetchProducts={fetchProducts} />
                    <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">


                        {products.map((product) => (
                            <div key={product.id}>
                                <div className="relative">
                                    <div className="relative h-72 w-full overflow-hidden rounded-lg">
                                        <img
                                            src={`/uploads/${product.image}`}
                                            alt={product.image}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="relative mt-4">
                                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                                    </div>
                                    <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                                        <div
                                            aria-hidden="true"
                                            className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                                        />
                                        <p className="relative text-lg font-semibold text-white">${product.price}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <a
                                        href='#'
                                        className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
                                    >
                                        Add to bag<span className="sr-only">, {product.name}</span>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                    {pagination && <Pagination total={total} currentPage={currentPage} />}
                </div>
            </div>
        </>
    )
}
