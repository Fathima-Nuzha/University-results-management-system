import React from 'react';

interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  keyExtractor: (row: T) => string;
  className?: string;
}

function Table<T>({
  columns,
  data,
  onRowClick,
  keyExtractor,
  className = '',
}: TableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, i) => (
              <th
                key={i}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                onClick={() => onRowClick && onRowClick(row)}
                className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
              >
                {columns.map((column, i) => (
                  <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {typeof column.accessor === 'function'
                      ? column.accessor(row)
                      : row[column.accessor] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;