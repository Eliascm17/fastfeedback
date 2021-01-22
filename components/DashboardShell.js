import { useAuth } from '@/lib/auth';
import { Logo } from '@/styles/logo';
import {
    Avatar,
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Button,
    Flex,
    Heading,
    Link
} from '@chakra-ui/react';
import React from 'react';
import NextLink from 'next/link';
import AddSiteModal from './AddSiteModal';

const DashboardShell = ({ children }) => {
    const { user, signout } = useAuth();
    return (
        <Box backgroundColor="gray.100" h="100vh">
            <Flex
                backgroundColor="white"
                mb={16}
                w="full"
                borderTop="5px solid #0AF5F4"
            >
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    pt={4}
                    pb={4}
                    maxW="1250px"
                    margin="0 auto"
                    w="full"
                    px={8}
                >
                    <Flex align="center">
                        <NextLink href="/" passHref>
                            <Logo boxSize="24px" mr={8} />
                        </NextLink>
                        <NextLink href="/dashboard" passHref>
                            <Link mr={4}>Sites</Link>
                        </NextLink>
                        <NextLink href="/feedback" passHref>
                            <Link>Feedback</Link>
                        </NextLink>
                    </Flex>
                    <Flex justifyContent="center" alignItems="center">
                        {user && (
                            <>
                                <NextLink href="/account" passHref>
                                    <Button as="a" variant="ghost" mr={2}>
                                        Account
                                    </Button>
                                </NextLink>
                                <NextLink href="/" passHref>
                                    <Button
                                        as="a"
                                        onClick={(e) => {
                                            signout(e);
                                        }}
                                        variant="ghost"
                                        mr={2}
                                    >
                                        Log out
                                    </Button>
                                </NextLink>
                            </>
                        )}
                        <Avatar size="sm" src={user?.photoUrl} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex margin="0 auto" direction="column" maxW="1250px" px={8}>
                {children}
            </Flex>
        </Box>
    );
};

export default DashboardShell;
