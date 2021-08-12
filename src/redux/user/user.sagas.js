import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { signInSuccess, signInFailure, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

function* getSnapShotFromUserAuth(userAuth, additionalData) {
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const snapshot = yield userRef.get();

        yield put(signInSuccess({ id: snapshot.id, ...snapshot.data() }));
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signInWithEmail({payload: { email, password }}) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapShotFromUserAuth(user);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;

        yield getSnapShotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFailure(error));
    }
}

function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }
}

function* signUp({ payload: { email, password, confirmPassword, displayName }}) {
    try {
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            yield put(signUpFailure("Passwords don't match"));
            return;
        }

        const { user } = yield auth.createUserWithEmailAndPassword(email, password);

        yield put(signUpSuccess({user, additionalData: { displayName }}));
    } catch (error) {
        yield put(signUpFailure(error));
    }
}

function* signInAfterSignUp({ payload: { user, additionalData } }) {
    yield getSnapShotFromUserAuth(user, additionalData);
}

function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

function* onSignUpStart() {
    yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

function* onSignUpSuccess() {
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignOutStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onCheckUserSession)
    ]);
}
