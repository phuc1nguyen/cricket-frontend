import Layout from '../../layouts/LayoutAdmin';
import { useState, useRef } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDisclosure } from '@chakra-ui/react';
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
  HiChevronDoubleRight,
} from 'react-icons/hi';
import { FaPlus } from 'react-icons/fa';
import MainDrawer from '../../components/Drawer/MainDrawer';
import RowActionButtons from '../../components/RowActions/RowActions';
import customers, { Customers } from '../../utils/datas/_customers';

const columnHelper = createColumnHelper<Customers>();
const columns = [
  columnHelper.accessor((row) => `${row.firstname} ${row.lastname}`, {
    header: 'fullname',
  }),
  columnHelper.accessor('username', {
    header: 'username',
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
  }),
  columnHelper.display({
    header: 'actions',
    cell: () => <RowActionButtons />,
  }),
];

const Customer = () => {
  const [data, setData] = useState<Customers[]>(() => [...customers]);
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [size, setSize] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <Layout>
      <MainDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} size={size} />

      <h1 className="font-bold text-xl text-gray-700">Danh sách khách hàng</h1>

      <div className="flex gap-4 bg-white px-4 py-4 my-6 rounded-md">
        <input
          type="search"
          name="search"
          id="search"
          className="block w-full border border-gray-200 bg-gray-100 px-4 py-2 rounded-md focus:bg-white focus:border-gray-200 focus:outline-none"
          placeholder="Search by username or email"
        />
        <button
          type="button"
          className="flex items-center bg-blue-500 px-6 py-2 font-bold text-gray-100 rounded-md"
          ref={btnRef}
          onClick={() => handleOpen('lg')}
        >
          <FaPlus className="mr-2" />
          THÊM
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full divide-y">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 rounded-b-md bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            type="button"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-50"
          >
            Next
          </button>
        </div>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </strong>
            </span>
            <select
              value={table.getState().pagination.pageSize}
              className="text-sm focus:outline-none cursor-pointer"
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[8, 16, 24].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-l-md text-gray-700 bg-white hover:bg-blue-50"
            >
              <span className="sr-only">First</span>
              <HiChevronDoubleLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-blue-50"
            >
              <span className="sr-only">Previous</span>
              <HiChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-blue-50"
            >
              <span className="sr-only">Next</span>
              <HiChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-white hover:bg-blue-50"
            >
              <span className="sr-only">Last</span>
              <HiChevronDoubleRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </Layout>
  );
};

export default Customer;