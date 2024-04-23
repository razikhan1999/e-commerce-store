import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Pagination({ total, currentPage }) {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const { replace } = useRouter();

  const params = new URLSearchParams(searchParams);
  const perPage = 4;
  const totalPages = Math.ceil(total / perPage)

  const handlePerivious = () => {
    params.set('page', currentPage - 1);
    replace(`${pathname}?${params.toString()}`);
  }
  const handleNext = () => {
    params.set('page', currentPage + 1);
    replace(`${pathname}?${params.toString()}`);
  }


  return (
    <nav
      className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{((currentPage - 1) * perPage) + 1}</span> to <span className="font-medium">{Math.min(currentPage * perPage, total)}</span> of{' '}
          <span className="font-medium">{total}</span> results
        </p>
      </div>
      <div className="flex flex-1 justify-between sm:justify-end">
        <button
          className={`relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${currentPage <= 1 && 'cursor-not-allowed	'}`}
          onClick={handlePerivious}
          disabled={currentPage <= 1 ? true : false}
        >
          Previous
        </button>
        <button
          className={`relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0 ${currentPage >= totalPages && 'cursor-not-allowed	'}`}
          onClick={handleNext}
          disabled={currentPage >= totalPages ? true : false}
        >
          Next
        </button>
      </div>
    </nav>
  )
}
