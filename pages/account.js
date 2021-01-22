import DashboardShell from '@/components/DashboardShell';
import { useAuth } from '@/lib/auth';
import { createCheckoutSession, goToBillingPortal } from '@/lib/db';
import fetcher from '@/utils/fetcher';
import { Button, Box } from '@chakra-ui/react';
import useSWR from 'swr';

const Account = () => {
    const { user } = useAuth();
    const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);

    return (
        <DashboardShell>
            <Box>
                <Button
                    onClick={(e) => createCheckoutSession(user.uid)}
                    backgroundColor="gray.900"
                    color="white"
                    fontWeight="medium"
                    mt={4}
                    size="md"
                    _hover={{ bg: 'gray.700' }}
                    _active={{
                        bg: 'gray.800',
                        transform: 'scale(0.95)'
                    }}
                >
                    Upgrade to Starter
                </Button>
                <Button
                    onClick={(e) => goToBillingPortal()}
                    backgroundColor="gray.900"
                    color="white"
                    fontWeight="medium"
                    mt={4}
                    ml={4}
                    size="md"
                    _hover={{ bg: 'gray.700' }}
                    _active={{
                        bg: 'gray.800',
                        transform: 'scale(0.95)'
                    }}
                >
                    View Billing Portal
                </Button>
            </Box>
        </DashboardShell>
    );
};

export default Account;
