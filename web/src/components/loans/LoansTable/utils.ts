import { CategorizedPayment } from '../../../utils/paymentStatus';
import { SortState, SortDirection } from './types';

export function sortData<T>(
  data: T[],
  sortState: SortState,
  accessor: (row: T) => unknown
): T[] {
  if (!sortState.field || !sortState.direction) {
    return data;
  }

  return [...data].sort((a, b) => {
    const aValue = accessor(a);
    const bValue = accessor(b);

    // Handle null/undefined values
    if (aValue === null || aValue === undefined || aValue === '') return 1;
    if (bValue === null || bValue === undefined || bValue === '') return -1;

    // String comparison
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase());
      return sortState.direction === 'asc' ? comparison : -comparison;
    }

    // Number comparison
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortState.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });
}

export function paginateData<T>(
  data: T[],
  page: number,
  pageSize: number
): { paginatedData: T[]; totalPages: number; startIndex: number; endIndex: number } {
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    paginatedData,
    totalPages,
    startIndex,
    endIndex,
  };
}

export function getPageNumbers(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
  const pages: (number | 'ellipsis')[] = [];
  const maxVisible = 5;

  if (totalPages <= maxVisible) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('ellipsis');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push('ellipsis');
      pages.push(totalPages);
    }
  }

  return pages;
}

export function toggleSort(
  currentSort: SortState,
  field: string
): SortState {
  if (currentSort.field === field) {
    if (currentSort.direction === 'asc') {
      return { field, direction: 'desc' };
    } else if (currentSort.direction === 'desc') {
      return { field: null, direction: null };
    } else {
      return { field, direction: 'asc' };
    }
  }
  return { field, direction: 'asc' };
}

