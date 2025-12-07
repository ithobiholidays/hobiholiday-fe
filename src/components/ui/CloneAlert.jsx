import { usePostData } from '@/utils/api';
import { useCustomToast } from '@/utils/toast';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const CloneAlert = ({
  isOpen,
  onClose,
  cancelRef,
  title,
  data,
  url,
  refetch,
  setSelectedItem,
}) => {
  const { postData } = usePostData();
  const { showToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleClone = async () => {
    try {
      setIsLoading(true);
      await postData(url, data);
      showToast({ message: `Succesfully clone ${title}`, type: 'success' });
      onClose();
      refetch();
    } catch (error) {
      showToast({ message: `Unexpected Error Happened`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      setSelectedItem('');
    };
  }, []);

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      size={{ sm: 'xl', md: '2xl', lg: '3xl' }}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg">Clone {title}</AlertDialogHeader>
          <hr />
          <AlertDialogBody>Are you sure you want to clone it?</AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ref={cancelRef}
              onClick={onClose}
              variant={'ghost'}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleClone}
              ml={3}
              size="sm"
              isLoading={isLoading}
            >
              Clone
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default CloneAlert;
