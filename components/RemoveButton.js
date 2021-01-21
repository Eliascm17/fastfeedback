import { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    IconButton,
    Button
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

import { deleteFeedback } from '@/lib/db';
import { useAuth } from '@/lib/auth';

const RemoveButton = ({ feedbackId }) => {
    const [isOpen, setIsOpen] = useState(false);
    const onClose = () => setIsOpen(false);
    const cancelRef = useRef();

    const auth = useAuth();

    const onDelete = () => {
        deleteFeedback(feedbackId);
        mutate(
            ['/api/feedback', auth.user.token],
            async (data) => {
                return {
                    feedback: data.feedback.filter(
                        (feedback) => feedback.id !== feedbackId
                    )
                };
            },
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton
                aria-label="Delete Feedback"
                icon={<DeleteIcon />}
                variant="ghost"
                onClick={() => setIsOpen(true)}
            />

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default RemoveButton;
