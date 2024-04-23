import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import SelectBox from '../FormElements/SelectBox'

export default function DialogModal({ open, setOpen, fetchProducts }) {
    const productNameRef = useRef()
    const priceRef = useRef()
    const [selectedCategory, setSelectedCategory] = useState()
    const [createObjectUrl, setCreateObjectUrl] = useState(null);
    const [icon, setIcon] = useState(null);


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const img = event.target.files[0];
            setIcon(img);
            setCreateObjectUrl(URL.createObjectURL(img));
        }
    };

    const handleAddProduct = async () => {

        const productName = productNameRef.current.value;
        const price = priceRef.current.value;
        const category = selectedCategory.id;

        // Create a FormData object to handle file uploads
        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('file', icon);


        try {
            const response = await fetch('api/products', { // Replace 'api/endpoint' with your actual API endpoint
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            fetchProducts(null, [], [], "");
            setOpen(!open)

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            // Handle error, e.g., show an error message
        }
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className='mb-2'>
                                        <label htmlFor="product_name" className="block text-sm font-medium leading-6 text-gray-900">
                                            Name
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="product_name"
                                                id="product_name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Bat"
                                                ref={productNameRef}
                                            />
                                        </div>
                                    </div>
                                    <div className='mb-2'>
                                        <SelectBox selected={selectedCategory} setSelected={setSelectedCategory} />
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price
                                        </label>
                                        <div className="relative mt-2 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                <span className="text-gray-500 sm:text-sm">$</span>
                                            </div>
                                            <input
                                                type="number"
                                                name="price"
                                                id="price"
                                                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="0.00"
                                                aria-describedby="price-currency"
                                                ref={priceRef}
                                            />
                                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                                <span className="text-gray-500 sm:text-sm" id="price-currency">
                                                    USD
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mb-2'>
                                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={onImageChange}
                                            />
                                        </div>
                                        <div>
                                            {icon ? (
                                                <img
                                                    alt="preview image"
                                                    src={createObjectUrl}
                                                    width={75}
                                                    height={75}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        onClick={handleAddProduct}
                                    >
                                        Add Product
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
