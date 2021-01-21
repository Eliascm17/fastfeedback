import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Flex,
    Heading
} from '@chakra-ui/react';
import React from 'react';
import AddSiteModal from './AddSiteModal';
import SiteTableSkeleton from './SiteTableSkeleton';

const SiteTableHeader = () => (
    <>
        <Breadcrumb>
            <BreadcrumbItem>
                <BreadcrumbLink>Sites</BreadcrumbLink>
            </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
            <Heading mb={8}>My Sites</Heading>
            <AddSiteModal>+ Add Site</AddSiteModal>
        </Flex>
    </>
);

export default SiteTableHeader;
