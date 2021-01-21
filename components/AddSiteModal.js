import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
    Button,
    useToast
} from '@chakra-ui/react';
import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';

function AddSiteModal({ children }) {
    const initialRef = useRef();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const auth = useAuth();
    const { handleSubmit, register } = useForm();

    const onCreateSite = ({ name, url }) => {
        const newSite = {
            author: auth.user.uid,
            createdAt: new Date().toISOString(),
            name,
            url
        };

        const { id } = createSite(newSite);

        toast({
            title: 'Success!',
            description: "We've added your site.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });

        // This mutate function is so that when you click the
        // create button it called that endpoint to grab the latest site
        // that you just created. Updating cache
        mutate(
            ['/api/sites', auth.user.token],
            async (data) => ({
                sites: [...data.sites, { id, ...newSite }]
            }),
            false
        );
        onClose();
    };
    return (
        <>
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                {children}
            </Button>
            <Modal
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
                    <ModalHeader fontWeight="bold">Add Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder="My site"
                                name="name"
                                ref={register({ required: 'Required' })}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Link</FormLabel>
                            <Input
                                placeholder="https://website.com"
                                name="url"
                                ref={register({ required: 'Required' })}
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} fontWeight="medium" mr={3}>
                            Cancel
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Create
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default AddSiteModal;
