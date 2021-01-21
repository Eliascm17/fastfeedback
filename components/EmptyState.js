import AddSiteModal from '@/components/AddSiteModal';
import { Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const EmptyState = () => (
    <Flex
        width="100%"
        backgroundColor="white"
        borderRadius="8px"
        p={16}
        justify="center"
        align="center"
        direction="column"
    >
        <Heading size="lg" mb={2}>
            You Haven't added any sites
        </Heading>
        <Text mb={4}>Let's get started</Text>
        <AddSiteModal>Add Your First Site</AddSiteModal>
    </Flex>
);

export default EmptyState;
