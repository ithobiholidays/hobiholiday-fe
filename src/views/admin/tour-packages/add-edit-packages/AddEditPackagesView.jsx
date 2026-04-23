'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import CustomButton from '@/components/ui/CustomButton';
import CustomModal from '@/components/ui/CustomModal';
import CustomTable from '@/components/ui/CustomTable';
import SearchBar from '@/components/ui/SearchBar';
import { useGetData, usePostData } from '@/utils/api';
import { Switch, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import DeleteAlert from '@/components/ui/DeleteAlert';
import CloneAlert from '@/components/ui/CloneAlert';
import { MdDelete, MdOutlineEdit } from 'react-icons/md';
import Link from 'next/link';
import { useCustomToast } from '@/utils/toast';
import SwitchAlert from './component/SwitchAlert';
import SoldAlert from './component/SoldAlert';
import BulkActionBar from './component/BulkActionBar';
import BulkConfirmAlert from './component/BulkConfirmAlert';

const paths = [
  {
    title: 'Home',
    href: '/dashboard',
  },
  {
    title: 'Tour Packages',
    href: '/dashboard/tour-packages/add-edit-packages',
  },
  {
    title: 'Add Edit Packages',
    href: '/',
  },
];

const AddEditPackagesView = () => {
  const { postData, data, totalData, loading } = usePostData();
  const { getData: getCategories, data: dataCategories } = useGetData();
  const { postData: postBulk } = usePostData();
  const { showToast } = useCustomToast();

  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();

  const {
    isOpen: isOpenSwitch,
    onOpen: onOpenSwitch,
    onClose: onCloseSwitch,
  } = useDisclosure();

  const {
    isOpen: isOpenSold,
    onOpen: onOpenSold,
    onClose: onCloseSold,
  } = useDisclosure();

  const {
    isOpen: isOpenClone,
    onOpen: onOpenClone,
    onClose: onCloseClone,
  } = useDisclosure();

  const {
    isOpen: isOpenBulk,
    onOpen: onOpenBulk,
    onClose: onCloseBulk,
  } = useDisclosure();

  const cancelRef = useRef(null);
  const cancelRefSwitch = useRef(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [selectedItem, setSelectedItem] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [selectedItems, setSelectedItems] = useState([]);
  const [bulkAction, setBulkAction] = useState('');
  const [isBulkLoading, setIsBulkLoading] = useState(false);

  // Derived: cek apakah semua selected punya status yang sama
  const allSameStatus = selectedItems.length > 0 &&
    new Set(selectedItems.map((i) => i.isActive)).size === 1;
  const allSameSoldOut = selectedItems.length > 0 &&
    new Set(selectedItems.map((i) => i.isSoldOut)).size === 1;
  const isMixedStatus = selectedItems.length > 0 && !allSameStatus;
  const isMixedSoldOut = selectedItems.length > 0 && !allSameSoldOut;

  // Nilai status saat ini dari selected items (ambil dari item pertama)
  const currentIsActive = selectedItems[0]?.isActive;
  const currentIsSoldOut = selectedItems[0]?.isSoldOut;

  const handleSelectRow = (row) => {
    const newIds = new Set(selectedIds);
    const newItems = [...selectedItems];
    if (newIds.has(row.id)) {
      newIds.delete(row.id);
      const idx = newItems.findIndex((i) => i.id === row.id);
      if (idx !== -1) newItems.splice(idx, 1);
    } else {
      newIds.add(row.id);
      newItems.push({ id: row.id, isActive: row.isActive, isSoldOut: row.isSoldOut });
    }
    setSelectedIds(newIds);
    setSelectedItems(newItems);
  };

  const handleSelectAll = () => {
    if (!data) return;
    const allOnPageSelected = data.every((row) => selectedIds.has(row.id));
    if (allOnPageSelected) {
      // Deselect semua di halaman ini
      const newIds = new Set(selectedIds);
      const newItems = selectedItems.filter((i) => !data.find((d) => d.id === i.id));
      data.forEach((row) => newIds.delete(row.id));
      setSelectedIds(newIds);
      setSelectedItems(newItems);
    } else {
      // Select semua di halaman ini
      const newIds = new Set(selectedIds);
      const newItems = [...selectedItems];
      data.forEach((row) => {
        if (!newIds.has(row.id)) {
          newIds.add(row.id);
          newItems.push({ id: row.id, isActive: row.isActive, isSoldOut: row.isSoldOut });
        }
      });
      setSelectedIds(newIds);
      setSelectedItems(newItems);
    }
  };

  const handleBulkAction = (action) => {
    setBulkAction(action);
    onOpenBulk();
  };

  const handleBulkConfirm = async () => {
    try {
      setIsBulkLoading(true);
      const ids = Array.from(selectedIds);

      if (bulkAction === 'activate') {
        await postBulk('/product/bulk-status', { ids, status: true });
      } else if (bulkAction === 'archive') {
        await postBulk('/product/bulk-status', { ids, status: false });
      } else if (bulkAction === 'soldout') {
        await postBulk('/product/bulk-sold', { ids, status: true });
      } else if (bulkAction === 'available') {
        await postBulk('/product/bulk-sold', { ids, status: false });
      }

      showToast({ message: 'Bulk update successful!', type: 'success' });
      onCloseBulk();
      setSelectedIds(new Set());
      setSelectedItems([]);
      fetchData();
    } catch (error) {
      showToast({ message: 'Unexpected Error Happened', type: 'error' });
    } finally {
      setIsBulkLoading(false);
    }
  };

  const months = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];

  const years = ['2025', '2026', '2027', '2028'];

  const handleToggleSwitch = (row) => {
    onOpenSwitch();
    setSelectedItem(row);
  };

  const handleToggleSold = (row) => {
    onOpenSold();
    setSelectedItem(row);
  };

  const allOnPageSelected = data?.length > 0 && data.every((row) => selectedIds.has(row.id));
  const someOnPageSelected = data?.some((row) => selectedIds.has(row.id));

  const columns = [
    {
      key: 'checkbox',
      label: (
        <input
          type="checkbox"
          checked={allOnPageSelected || false}
          ref={(el) => {
            if (el) el.indeterminate = !allOnPageSelected && someOnPageSelected;
          }}
          onChange={handleSelectAll}
          className="w-4 h-4 cursor-pointer accent-blue-600"
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.has(row.id)}
          onChange={() => handleSelectRow(row)}
          className="w-4 h-4 cursor-pointer accent-blue-600"
        />
      ),
    },
    { key: 'title', label: 'Title' },
    {
      key: 'date',
      label: 'Date',
    },
    {
      key: 'startDate',
      label: 'Start Date',
      render: (row) => row?.startDate || '-',
    },
    {
      key: 'endDate',
      label: 'End Date',
      render: (row) => row?.endDate || '-',
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <>
          {' '}
          <Switch
            isChecked={row?.isActive}
            value={row?.isActive}
            onChange={(e) => {
              e.preventDefault(); // Prevents default toggling behavior
              handleToggleSwitch(row, e.target.checked);
            }}
          />{' '}
          {row?.isActive ? (
            <span className="ml-2">Active</span>
          ) : (
            <span className="ml-2">Archived</span>
          )}
        </>
      ),
    },
    {
      key: 'isSoldOut',
      label: 'Sold Out',
      render: (row) => (
        <>
          {' '}
          <Switch
            isChecked={row?.isSoldOut}
            value={row?.isSoldOut}
            onChange={(e) => {
              e.preventDefault(); // Prevents default toggling behavior
              handleToggleSold(row, e.target.checked);
            }}
          />{' '}
          {row?.isActive ? (
            <span className="ml-2">Sold Out {row?.isSoldOut}</span>
          ) : (
            <span className="ml-2">Active</span>
          )}
        </>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      render: (row) => (
        <div className="flex gap-2">
          <Link
            className="bg-[#1E91CF] hover:bg-[#1779a8] text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            href={`/dashboard/tour-packages/add-edit-packages/${row?.id}`}
          >
            <MdOutlineEdit />
            Edit
          </Link>
          <button
            className="bg-red-600/80 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-2 transition-colors"
            onClick={() => {
              setSelectedItem(row);
              onOpenDelete();
            }}
          >
            <MdDelete /> Delete
          </button>
          <button
            className="bg-[#8FBB6C] hover:bg-[#7aa35c] text-white px-2 py-1 rounded flex items-center transition-colors"
            onClick={() => {
              setSelectedItem(row);
              onOpenClone();
            }}
          >
            📋 Clone
          </button>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    try {
      await postData(`/product/alls?s=all&search=${searchValue}`, {
        p: page,
        limit: perPage,
        ...(filterMonth && { month: filterMonth }),
        ...(filterYear && { year: filterYear }),
        ...(filterCategory && { categoryId: filterCategory }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (query) => {
    setSearchValue(query);
    setPage(1);
  };

  useEffect(() => {
    getCategories('/category/all');
  }, []);

  useEffect(() => {
    fetchData();
  }, [page, searchValue, filterMonth, filterYear, filterCategory]);

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Add/Edit Packages</p>
        <Breadcrumbs paths={paths} />
      </div>

      <div className="flex justify-between items-center mt-8">
        <Link href={'/dashboard/tour-packages/add-edit-packages/create'}>
          <CustomButton>Add New Package</CustomButton>
        </Link>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <select
          value={filterCategory}
          onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">All Categories</option>
          {dataCategories?.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={filterMonth}
          onChange={(e) => { setFilterMonth(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">All Months</option>
          {months.map((m) => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <select
          value={filterYear}
          onChange={(e) => { setFilterYear(e.target.value); setPage(1); }}
          className="border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">All Years</option>
          {years.map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        {(filterCategory || filterMonth || filterYear) && (
          <button
            onClick={() => { setFilterCategory(''); setFilterMonth(''); setFilterYear(''); setPage(1); }}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Reset
          </button>
        )}
      </div>

      <CustomTable
        columns={columns}
        data={data || []}
        totalData={totalData}
        page={page}
        perPage={perPage}
        setPage={setPage}
        setPerPage={setPerPage}
        loading={loading}
      />

      {isOpenDelete && (
        <DeleteAlert
          isOpen={isOpenDelete}
          onClose={onCloseDelete}
          cancelRef={cancelRef}
          title="Packages"
          url={`/product/${selectedItem?.id}`}
          refetch={fetchData}
          setSelectedItem={setSelectedItem}
        />
      )}

      {isOpenSwitch && (
        <SwitchAlert
          isOpen={isOpenSwitch}
          onClose={onCloseSwitch}
          cancelRef={cancelRefSwitch}
          refetch={fetchData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {isOpenSold && (
        <SoldAlert
          isOpen={isOpenSold}
          onClose={onCloseSold}
          cancelRef={cancelRefSwitch}
          refetch={fetchData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      )}

      {isOpenClone && (
        <CloneAlert
          isOpen={isOpenClone}
          onClose={onCloseClone}
          cancelRef={cancelRef}
          title="Product"
          url="/product/clone"
          data={{ id: selectedItem?.id }}
          refetch={fetchData}
          setSelectedItem={setSelectedItem}
        />
      )}

      {isOpenBulk && (
        <BulkConfirmAlert
          isOpen={isOpenBulk}
          onClose={onCloseBulk}
          action={bulkAction}
          selectedCount={selectedIds.size}
          onConfirm={handleBulkConfirm}
          isLoading={isBulkLoading}
        />
      )}

      <BulkActionBar
        selectedCount={selectedIds.size}
        isMixedStatus={isMixedStatus}
        isMixedSoldOut={isMixedSoldOut}
        currentIsActive={currentIsActive}
        currentIsSoldOut={currentIsSoldOut}
        onAction={handleBulkAction}
        onClear={() => { setSelectedIds(new Set()); setSelectedItems([]); }}
      />
    </div>
  );
};

export default AddEditPackagesView;
