'use client';

import React from 'react';

const BulkActionBar = ({
  selectedCount,
  isMixedStatus,
  isMixedSoldOut,
  currentIsActive,
  currentIsSoldOut,
  onAction,
  onClear,
}) => {
  if (selectedCount === 0) return null;

  const isMixed = isMixedStatus || isMixedSoldOut;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-fit">
      <div className="bg-gray-900 text-white rounded-xl shadow-2xl px-5 py-3 flex flex-col gap-2 min-w-[420px]">
        <div className="flex items-center justify-between gap-6">
          <span className="text-sm font-medium whitespace-nowrap">
            ☑ <span className="text-blue-400 font-bold">{selectedCount}</span> package{selectedCount > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onClear}
            className="text-gray-400 hover:text-white text-xs transition-colors whitespace-nowrap"
          >
            ✕ Clear
          </button>
        </div>

        {isMixed ? (
          <div className="bg-yellow-500/20 border border-yellow-500/40 rounded-lg px-3 py-2 text-yellow-300 text-xs">
            ⚠️ Selected packages have different statuses. Please select items with the same status to bulk update.
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-wrap">
            {currentIsActive ? (
              <button
                onClick={() => onAction('archive')}
                className="bg-gray-500 hover:bg-gray-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                Archive
              </button>
            ) : (
              <button
                onClick={() => onAction('activate')}
                className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
              >
                Set Active
              </button>
            )}

            {currentIsActive && (
              <>
                {currentIsSoldOut ? (
                  <button
                    onClick={() => onAction('available')}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Set Available
                  </button>
                ) : (
                  <button
                    onClick={() => onAction('soldout')}
                    className="bg-orange-500 hover:bg-orange-600 text-white text-xs px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Set Sold Out
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BulkActionBar;
