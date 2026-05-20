'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import CustomTable from '@/components/ui/CustomTable';
import SearchBar from '@/components/ui/SearchBar';
import { useGetData, usePostData, useUpdateData } from '@/utils/api';
import { Switch } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useCustomToast } from '@/utils/toast';



const paths = [
    { title: 'Home', href: '/dashboard' },
    { title: 'Tour Packages', href: '/dashboard/tour-packages/add-edit-packages' },
    { title: 'Product Code', href: '/dashboard/tour-packages/product-code' },
];

const months = [
    { value: '1', label: 'January' }, { value: '2', label: 'February' },
    { value: '3', label: 'March' }, { value: '4', label: 'April' },
    { value: '5', label: 'May' }, { value: '6', label: 'June' },
    { value: '7', label: 'July' }, { value: '8', label: 'August' },
    { value: '9', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' },
];

const years = ['2025', '2026', '2027', '2028'];

const ProductCodeMappingView = () => {
    const { postData, data, totalData, loading } = usePostData();
    const { postData: generateCodes, loading: generateLoading } = usePostData();
    const { getData: getCategories, data: dataCategories } = useGetData();
    const { updateData } = useUpdateData();
    const { showToast } = useCustomToast();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchValue, setSearchValue] = useState('');
    const [filterMonth, setFilterMonth] = useState('');
    const [filterYear, setFilterYear] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterActive, setFilterActive] = useState('true');
    const [filterSoldOut, setFilterSoldOut] = useState('false');
    const [filterHasCode, setFilterHasCode] = useState('');
    const [filterInputted, setFilterInputted] = useState('');

    useEffect(() => {
        getCategories('/category/all');
    }, []);

    useEffect(() => {
        fetchData();
    }, [page, searchValue, filterMonth, filterYear, filterCategory, filterActive, filterSoldOut, filterHasCode, filterInputted]);

    const fetchData = async () => {
        try {
            await postData('/product/mapping', {
                p: page,
                limit: perPage,
                ...(searchValue && { search: searchValue }),
                ...(filterMonth && { month: filterMonth }),
                ...(filterYear && { year: filterYear }),
                ...(filterCategory && { categoryId: filterCategory }),
                ...(filterActive !== '' && { isActive: filterActive === 'true' }),
                ...(filterSoldOut !== '' && { isSoldOut: filterSoldOut === 'true' }),
                ...(filterHasCode !== '' && { hasCode: filterHasCode === 'true' }),
                ...(filterInputted !== '' && { isInputted: filterInputted === 'true' }),
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (query) => {
        setSearchValue(query);
        setPage(1);
    };

    const handleToggleInputted = async (row) => {
        try {
            await updateData('/product/inputted', { id: row.id, status: !row.isInputted });
            showToast({ message: 'Status spreadsheet diperbarui!', type: 'success' });
            fetchData();
        } catch {
            showToast({ message: 'Gagal update status', type: 'error' });
        }
    };

    const handleGenerateAll = async () => {
        try {
            const res = await generateCodes('/product/generate-all-codes', {});
            showToast({ message: res?.message, type: 'success' });
            fetchData();
        } catch {
            showToast({ message: 'Gagal generate codes', type: 'error' });
        }
    };

    const hasActiveFilter =
        filterMonth || filterYear ||
        filterActive !== 'true' || filterSoldOut !== 'false' ||
        filterHasCode || filterInputted;

    const columns = [
        {
            key: 'product_code',
            label: 'Product Code',
            render: (row) =>
                row.product_code ? (
                    <span className="font-mono font-semibold text-blue-600">{row.product_code}</span>
                ) : (
                    <span className="text-gray-400 italic text-sm">Belum ada</span>
                ),
        },
        { key: 'title', label: 'Nama Produk' },
        {
            key: 'endpoint',
            label: 'Endpoint',
            render: (row) => (
                <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded whitespace-nowrap">
                    GET /product/{row.id}
                </span>
            ),
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
                <span className={`px-2 py-1 rounded text-xs font-medium ${row.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {row.isActive ? 'Aktif' : 'Arsip'}
                </span>
            ),
        },
        {
            key: 'isSoldOut',
            label: 'Availability',
            render: (row) => (
                <span className={`px-2 py-1 rounded text-xs font-medium ${row.isSoldOut ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                    {row.isSoldOut ? 'Sold Out' : 'Available'}
                </span>
            ),
        },
        {
            key: 'isInputted',
            label: 'Spreadsheet',
            render: (row) => (
                <div className="flex items-center gap-2">
                    <Switch
                        isChecked={row.isInputted}
                        onChange={() => handleToggleInputted(row)}
                    />
                    <span className={`text-sm ${row.isInputted ? 'text-green-600' : 'text-gray-400'}`}>
                        {row.isInputted ? 'Inputted' : 'Pending'}
                    </span>
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="flex gap-10 items-center">
                <p className="text-3xl font-medium">Product Code Mapping</p>
                <Breadcrumbs paths={paths} />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mt-6">
            <button
                onClick={() => { setFilterCategory(''); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
                ${filterCategory === ''
                    ? 'bg-[#1E91CF] text-white border-[#1E91CF]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#1E91CF] hover:text-[#1E91CF]'
                }`}
            >
                Semua
            </button>
            {dataCategories?.map((cat) => (
                <button
                key={cat.id}
                onClick={() => { setFilterCategory(cat.id); setPage(1); }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
                    ${filterCategory === cat.id
                    ? 'bg-[#1E91CF] text-white border-[#1E91CF]'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-[#1E91CF] hover:text-[#1E91CF]'
                    }`}
                >
                {cat.name}
                </button>
            ))}
            </div>

            <div className="flex justify-between items-center mt-8">
                <SearchBar onSearch={handleSearch} />
                <button
                    onClick={handleGenerateAll}
                    disabled={generateLoading}
                    className="bg-[#1E91CF] hover:bg-[#1779a8] disabled:opacity-50 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
                >
                    {generateLoading ? 'Generating...' : '⚡ Generate All Missing Codes'}
                </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-3">
                <select value={filterActive} onChange={(e) => { setFilterActive(e.target.value); setPage(1); }} className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Semua Status</option>
                    <option value="true">Aktif</option>
                    <option value="false">Arsip</option>
                </select>

                <select value={filterSoldOut} onChange={(e) => { setFilterSoldOut(e.target.value); setPage(1); }} className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Semua Availability</option>
                    <option value="false">Available</option>
                    <option value="true">Sold Out</option>
                </select>

                <select value={filterHasCode} onChange={(e) => { setFilterHasCode(e.target.value); setPage(1); }} className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Semua Kode</option>
                    <option value="true">Sudah Ada Kode</option>
                    <option value="false">Belum Ada Kode</option>
                </select>

                <select value={filterInputted} onChange={(e) => { setFilterInputted(e.target.value); setPage(1); }} className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Semua Spreadsheet</option>
                    <option value="true">Sudah Diinput</option>
                    <option value="false">Belum Diinput</option>
                </select>

                <select value={filterMonth} onChange={(e) => { setFilterMonth(e.target.value); setPage(1); }} className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Semua Bulan</option>
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>

                <select value={filterYear} onChange={(e) => { setFilterYear(e.target.value); setPage(1); }} className="border border-gray-300 rounded px-2 py-1 text-sm">
                    <option value="">Semua Tahun</option>
                    {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>

                {hasActiveFilter && (
                    <button
                        onClick={() => {
                            setFilterActive('true'); setFilterSoldOut('false');
                            setFilterHasCode(''); setFilterInputted('');
                            setFilterCategory(''); setFilterMonth('');
                            setFilterYear(''); setPage(1);
                        }}
                        className="text-sm text-red-500 hover:text-red-700"
                    >
                        Reset Filter
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
        </div>
    );
};

export default ProductCodeMappingView;