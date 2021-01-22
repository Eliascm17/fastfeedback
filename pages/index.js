import Head from 'next/head';
import { Button, Text, Link, Flex, HStack, Box, Stack } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import Feedback from '@/components/Feedback';
import FeedbackLink from '@/components/FeedbackLink';
import { Logo } from '@/styles/logo';
import { Github } from '@/styles/github';
import { Google } from '@/styles/google';

const SITE_ID = '7sOnnheG3ePktwqTFcBP';

export async function getStaticProps(context) {
    const { feedback } = await getAllFeedback(SITE_ID);

    return {
        props: {
            allFeedback: feedback
        },
        revalidate: 1
    };
}

export default function Home({ allFeedback }) {
    const auth = useAuth();
    return (
        <>
            <Box bg="gray.200" py={16}>
                <Flex as="main" direction="column" maxW="700px" margin="0 auto">
                    <Head>
                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                if (document.cookie && document.cookie.includes('fast-feedback-auth')) {
                                    window.location.href = "/dashboard"
                                }
                            `
                            }}
                        />
                        <title>Fast Feedback</title>
                    </Head>
                    <Logo boxSize="48px" />
                    <Text mb={4} fontSize="lg" py={4}>
                        <Text as="span" fontWeight="bold" display="inline">
                            Fast Feedback
                        </Text>
                        {' is being built as part of '}
                        <Link
                            href="https://react2025.com"
                            isExternal
                            textDecoration="underline"
                        >
                            React 2025
                        </Link>
                        {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
                    </Text>
                    {auth.user ? (
                        <Button
                            as="a"
                            href="/dashboard"
                            backgroundColor="gray.900"
                            color="white"
                            fontWeight="medium"
                            mt={4}
                            maxW="200px"
                            _hover={{ bg: 'gray.700' }}
                            _active={{
                                bg: 'gray.800',
                                transform: 'scale(0.95)'
                            }}
                        >
                            View Dashboard
                        </Button>
                    ) : (
                        <Flex>
                            <Button
                                onClick={(e) => {
                                    auth.signinWithGithub(e);
                                }}
                                leftIcon={<Github />}
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
                                Sign In with Github
                            </Button>
                            <Button
                                onClick={(e) => {
                                    auth.signinWithGoogle(e);
                                }}
                                leftIcon={<Google />}
                                backgroundColor="white"
                                color="gray.900"
                                variant="outline"
                                fontWeight="medium"
                                mt={4}
                                ml={4}
                                size="md"
                                _hover={{ bg: 'gray.100' }}
                                _active={{
                                    bg: 'gray.100',
                                    transform: 'scale(0.95)'
                                }}
                            >
                                Sign In with Google
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                width="full"
                maxWidth="700px"
                margin="0 auto"
                mt={8}
            >
                <FeedbackLink siteId={SITE_ID} />
                {allFeedback.map((feedback) => (
                    <Feedback key={feedback.id} {...feedback} />
                ))}
            </Box>
        </>
    );
}
