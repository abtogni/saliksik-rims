import { writable } from "svelte/store";

// Retrieve the stored user data from localStorage
const storedUserData = localStorage.getItem('userData');
const initialUserData = storedUserData ? JSON.parse(storedUserData) : {
  _id: '',
  email: '',
  userType: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  avatar: '',
  researchCount: 0,
};

export const userData = writable(initialUserData);

// Update the stored user data in localStorage
userData.subscribe((value) => {
  localStorage.setItem('userData', JSON.stringify(value));
});

export const updateUser = (newUserData: any) => {
  userData.update((prevUserData) => ({ ...prevUserData, ...newUserData }));
};

const storedResearchData = localStorage.getItem('researchData');
const initialResearchData = storedResearchData ? JSON.parse(storedResearchData) : [];
export const researchData = writable<any[]>(initialResearchData);

// Update the stored research data in localStorage
researchData.subscribe((value) => {
  localStorage.setItem('researchData', JSON.stringify(value));
});

export const updateResearch = (newResearchData: any[]) => {
  researchData.set(newResearchData);
};

const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
export const isAuthenticated = writable(storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false);

// Update the stored isAuthenticated value in localStorage
isAuthenticated.subscribe((value) => {
  localStorage.setItem('isAuthenticated', JSON.stringify(value));
});
