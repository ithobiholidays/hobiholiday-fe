'use client';

import Breadcrumbs from '@/components/Breadcrumbs';
import { useGetData } from '@/utils/api';
import React, { useEffect, useState } from 'react';
import { useCustomToast } from '@/utils/toast';

const paths = [
  { title: 'Home', href: '/dashboard' },
  { title: 'Cekat AI', href: '#' },
  { title: 'Category Endpoints', href: '/dashboard/cekat-ai/category-endpoints' },
];

const CategoryEndpointsView = () => {
  const { getData, data, loading } = useGetData();
  const { showToast } = useCustomToast();
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    getData('/product/category-endpoints');
  }, []);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast({ message: 'Endpoint disalin!', type: 'success' });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="flex gap-10 items-center">
        <p className="text-3xl font-medium">Category Endpoints</p>
        <Breadcrumbs paths={paths} />
      </div>

      <p className="text-gray-500 text-sm mt-2">
        Daftar endpoint per kategori untuk konsumsi Cekat AI.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {loading && (
          <p className="text-gray-400 text-sm">Memuat...</p>
        )}
        {data?.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between border border-gray-200 rounded-lg px-5 py-4 bg-white hover:border-[#1E91CF] transition-colors"
          >
            <div>
              <p className="font-semibold text-gray-800">{cat.name}</p>
              <p className="font-mono text-sm text-gray-500 mt-1">
                {cat.endpoint}
              </p>
            </div>
            <button
              onClick={() => handleCopy(cat.endpoint, cat.id)}
              className={`ml-4 px-4 py-2 rounded text-sm font-medium transition-colors whitespace-nowrap
                ${copiedId === cat.id
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 hover:bg-[#1E91CF] hover:text-white text-gray-600'
                }`}
            >
              {copiedId === cat.id ? '✓ Disalin' : '📋 Copy'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryEndpointsView;