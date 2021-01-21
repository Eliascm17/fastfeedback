import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

import Feedback from '@/components/Feeback';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';

export async function getStaticProps(context) {
    const siteId = context.params.siteId;
    const { feedback } = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
        params: { siteId: site.id.toString() }
    }));

    return {
        paths,
        fallback: false
    };
}

const SiteFeedback = ({ initialFeedback }) => {
    const auth = useAuth();
    const router = useRouter();
    const inputEl = useRef(null);
    const [allFeedback, setAllFeedback] = useState(initialFeedback);

    const onAddComment = (e) => {
        e.preventDefault();

        const newFeedback = {
            author: auth.user.name,
            authorId: auth.user.uid,
            siteId: router.query.siteId,
            text: inputEl.current.value,
            createdAt: new Date().toISOString(),
            provider: auth.user.provider,
            status: 'active'
        };

        setAllFeedback([newFeedback, ...allFeedback]);
        createFeedback(newFeedback);
    };
    return (
        <Box
            display="flex"
            flexDirection="column"
            width="full"
            maxWidth="700px"
            margin="0 auto"
        >
            <Box as="form" onSubmit={onAddComment}>
                <FormControl my={8}>
                    <FormLabel htmlFor="comment">Comment</FormLabel>
                    <Input ref={inputEl} type="comment" id="comment" />
                    <Button fontWeight="medium" type="submit" mt={2}>
                        Add Comment
                    </Button>
                </FormControl>
            </Box>
            {allFeedback.map((feedback) => (
                <Feedback key={feedback.id} {...feedback} />
            ))}
        </Box>
    );
};

export default SiteFeedback;
