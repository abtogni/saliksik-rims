import { writable } from "svelte/store";

export const userData = writable({
    _id: '',
    email: '',
    userType: '',
    firstName: '',
    middleName: '',
    lastName: '',
    suffix: '',
    avatar: '',
    researchCount: 0,
});

export const updateUser = (newUserData: any) => {
    userData.set({ ...userData, ...newUserData });
  };

const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
export const isAuthenticated = writable(storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false);