import {writable} from "svelte/store";

export const user = writable({
    _id: '',
    userID: '',
    email: '',
    userType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    avatar: '',
    researchCount: 0,
});

export const isAuthenticated = writable(false);