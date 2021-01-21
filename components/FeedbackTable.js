import React from 'react';
import { Box, Code, Switch, IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Table, Td, Th, Tr } from './Table';
import RemoveButton from './RemoveButton';

const FeedbackTable = ({ allFeedback }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {allFeedback.map((feedback) => (
                    <Box as="tr" key={feedback.id}>
                        <Td fontWeight="medium">{feedback.author}</Td>
                        <Td>{feedback.text}</Td>
                        <Td>
                            <Code>{'/'}</Code>
                        </Td>
                        <Td>
                            <Switch
                                colorScheme="green"
                                defaultIsChecked={feedback.status === 'active'}
                            />
                        </Td>
                        <Td>
                            <RemoveButton feedbackId={feedback.id} />
                        </Td>
                    </Box>
                ))}
            </tbody>
        </Table>
    );
};

export default FeedbackTable;
