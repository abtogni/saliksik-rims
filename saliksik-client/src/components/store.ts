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

export const researchData = writable({
  _id: '',
  researchTitle: '',
  researchLeaders:[],
  researchMembers: [],
  researchAgency: '',
  researchStatus: '',
  createdAt: '',
});



export const updateUser = (newUserData: any) => {
    userData.set({ ...userData, ...newUserData });
  };

export const updateResearch = (newResearchData: any) => {
  researchData.set({ ...researchData, ...newResearchData });
}



const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
export const isAuthenticated = writable(storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false);