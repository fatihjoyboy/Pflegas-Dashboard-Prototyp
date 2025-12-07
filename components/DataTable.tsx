import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { TableColumn } from '../types';

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  sortConfig?: { key: keyof T; direction: 'asc' | 'desc' } | null;
  onSort?: (key: keyof T) => void;
  onRowClick?: (item: T) => void;
}

const DataTable = <T extends { id: string }>({ columns, data, sortConfig, onSort, onRowClick }: DataTableProps<T>) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.accessorKey)}
                  scope="col"
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider ${
                    col.sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
                  }`}
                  onClick={() => col.sortable && onSort && onSort(col.accessorKey)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && sortConfig?.key === col.accessorKey && (
                      sortConfig.direction === 'asc' ? <ArrowUp className="w-4 h-4 text-primary" /> : <ArrowDown className="w-4 h-4 text-primary" />
                    )}
                    {col.sortable && sortConfig?.key !== col.accessorKey && (
                      <ArrowUpDown className="w-4 h-4 text-gray-300" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.length > 0 ? (
              data.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick && onRowClick(item)}
                  className={`
                    transition-colors 
                    ${onRowClick ? 'cursor-pointer hover:bg-primary/5' : 'hover:bg-gray-50'}
                  `}
                >
                  {columns.map((col) => (
                    <td key={`${item.id}-${String(col.accessorKey)}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {col.cell ? col.cell(item[col.accessorKey], item) : String(item[col.accessorKey])}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                  Keine Einträge gefunden.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;