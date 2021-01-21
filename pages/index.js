import Head from 'next/head';
import { Button, Text, Link, Flex, Box } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { Logo } from '@/styles/logo';
import { Github } from '@/styles/github';
import { Google } from '@/styles/google';

export default function Home() {
    const auth = useAuth();
    return (
        <Flex
            as="main"
            direction="column"
            align="center"
            justify="center"
            h="100vh"
            maxW="400px"
            margin="0 auto"
        >
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
            </Head>
            <Logo boxSize="64px" />
            <Flex>
                <Text mb={4} fontSize="lg" py={4}>
                    <Text as="span" fontWeight="bold" display="inline">
                        Fast Feedback
                    </Text>
                    {' was built as part of '}
                    <Link
                        href="https://react2025.com"
                        isExternal
                        textDecoration="underline"
                    >
                        React 2025
                    </Link>
                    {`. It's the easiest way to add comments or reviews to your static site. Try it out by leaving a comment below. After the comment is approved, it will display below.`}
                </Text>
            </Flex>
            {auth.user ? (
                <Button
                    as="a"
                    href="/dashboard"
                    backgroundColor="white"
                    color="gray.900"
                    variant="outline"
                    fontWeight="medium"
                    mt={4}
                    size="lg"
                    _hover={{ bg: 'gray.100' }}
                    _active={{
                        bg: 'gray.100',
                        transform: 'scale(0.95)'
                    }}
                >
                    View Dashboard
                </Button>
            ) : (
                <>
                    <Button
                        onClick={(e) => {
                            auth.signinWithGithub(e);
                        }}
                        leftIcon={<Github />}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        mt={4}
                        size="lg"
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
                        size="lg"
                        _hover={{ bg: 'gray.100' }}
                        _active={{
                            bg: 'gray.100',
                            transform: 'scale(0.95)'
                        }}
                    >
                        Sign In with Google
                    </Button>
                </>
            )}
        </Flex>
    );
}
