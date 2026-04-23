'use client';

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { useRef } from 'react';

const ACTION_LABELS = {
  activate: { label: 'Set Active', color: 'green' },
  archive: { label: 'Archive', color: 'gray' },
  soldout: { label: 'Set Sold Out', color: 'orange' },
  available: { label: 'Set Available', color: 'blue' },
};

const BulkConfirmAlert = ({
  isOpen,
  onClose,
  action,
  selectedCount,
  onConfirm,
  isLoading,
}) => {
  const cancelRef = useRef(null);
  const actionMeta = ACTION_LABELS[action] || {};

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ sm: 'xl', md: '2xl', lg: '3xl' }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg">Bulk Update Packages</AlertDialogHeader>
          <hr />
          <AlertDialogBody className="py-4">
            Are you sure you want to{' '}
            <span className="font-semibold">"{actionMeta.label}"</span> for{' '}
            <span className="font-semibold text-blue-600">{selectedCount} package{selectedCount > 1 ? 's' : ''}</span>?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              variant="ghost"
              size="sm"
              isDisabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              colorScheme={actionMeta.color}
              onClick={onConfirm}
              ml={3}
              size="sm"
              isLoading={isLoading}
            >
              Confirm
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default BulkConfirmAlert;
