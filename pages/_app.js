import '@/styles/globals.css';
import AuthProvider from '@/lib/auth';
import { ThemeProvider, CSSReset } from '@chakra-ui/react';
import theme from '@/styles/theme';
import { Global, css } from '@emotion/react';

const GlobalStyle = ({ children }) => {
    return (
        <>
            <CSSReset />
            <Global
                styles={css`
                    html {
                        min-width: 360px;
                        scroll-behavior: smooth;
                        background-color: #edf2f7;
                    }

                    #__next {
                        display: flex;
                        flex-direction: column;
                        min-height: 100vh;
                    }
                `}
            />
            {children}
        </>
    );
};

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <GlobalStyle />
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
}

export default MyApp;
