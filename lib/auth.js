import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './db';
import firebase from './firebase';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const authContext = createContext();

export default function AuthProvider({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    const handleUser = (rawUser) => {
        if (rawUser) {
            const user = formatUser(rawUser);
            const { token, ...userWithoutToken } = user;

            createUser(user.uid, userWithoutToken);
            setUser(user);
            Cookies.set('fast-feedback-auth', true, {
                expires: 1
            });

            return user;
        } else {
            router.push('/');
            setUser(false);
            Cookies.remove('fast-feedback-auth');

            return false;
        }
    };

    const signinWithGithub = () => {
        router.push('/dashboard');

        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GithubAuthProvider())
            .then((res) => {
                handleUser(res.user);
            });
    };

    const signinWithGoogle = () => {
        router.push('/dashboard');

        return firebase
            .auth()
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                handleUser(res.user);
            });
    };

    const signout = () => {
        return firebase
            .auth()
            .signOut()
            .then(() => {
                handleUser(false);
            });
    };

    useEffect(() => {
        const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);
        return () => unsubscribe();
    }, []);

    return {
        user,
        signinWithGithub,
        signinWithGoogle,
        signout
    };
}

const formatUser = (user) => {
    return {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        token: user.ya,
        provider: user.providerData[0].providerId,
        photoUrl: user.photoURL
    };
};
