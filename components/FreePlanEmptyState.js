import { Box, Button, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import DashboardShell from './DashboardShell';

const FreePlanEmptyState = () => (
    <DashboardShell>
        <Box width="100%" backgroundColor="white" borderRadius="8px" p={8}>
            <Heading size="md">Get Feedback on your site Instantly</Heading>
            <Text>Start today, and grow with us 🌱</Text>
            <Button>Upgrade to Starter</Button>
        </Box>
    </DashboardShell>
);

export default FreePlanEmptyState;
