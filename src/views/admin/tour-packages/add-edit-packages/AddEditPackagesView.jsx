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
import { MdDelete, MdEdit, MdOutlineEdit } from 'react-icons/md';
import Link from 'next/link';
import { useCustomToast } from '@/utils/toast';
import SwitchAlert from './component/SwitchAlert';
import SoldAlert from './component/SoldAlert';

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

  const cancelRef = useRef(null);
  const cancelRefSwitch = useRef(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [selectedItem, setSelectedItem] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleToggleSwitch = (row) => {
    onOpenSwitch();
    setSelectedItem(row);
  };

  const handleToggleSold = (row) => {
    onOpenSold();
    setSelectedItem(row);
  };

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'date',
      label: 'Date',
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
    fetchData();
  }, [page, searchValue]);

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
    </div>
  );
};

export default AddEditPackagesView;
