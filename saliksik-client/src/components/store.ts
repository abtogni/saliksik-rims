//Imports
import { writable } from "svelte/store";


//Research List
const storedResearches = localStorage.getItem('researches');
const storedResearchData = storedResearches ? JSON.parse(storedResearches) : [];
export const researches = writable<any[]>(storedResearchData);

researches.subscribe((value) => {
  localStorage.setItem('researches', JSON.stringify(value));
});

export const updateResearchList = (newResearches: any[]) => {
  researches.set(newResearches);
};


// User Data
const storedUserData = localStorage.getItem('userData');
const UserModel = storedUserData ? JSON.parse(storedUserData) : {
  _id: '',
  email: '',
  userType: '',
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  avatar: '',
  researchCount: 0,
  createdAt: ''
};

export const userData = writable(UserModel);

userData.subscribe((value) => {
  localStorage.setItem('userData', JSON.stringify(value));
});

export const updateUser = (newUserData: any) => {
  userData.update((prevUserData) => ({ ...prevUserData, ...newUserData }));
};

const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
export const isAuthenticated = writable(storedIsAuthenticated ? JSON.parse(storedIsAuthenticated) : false);

isAuthenticated.subscribe((value) => {
  localStorage.setItem('isAuthenticated', JSON.stringify(value));
});


//Current Research
const currentResearchStored = localStorage.getItem('selectedResearchInfo');
const ResearchModel = currentResearchStored ? JSON.parse(currentResearchStored) : {
  _id: '',
  researchTitle: '',
  researchLeaders:[],
  researchStatus: '',
  conceptNote: {
    implementingDept: '',
    coopAgency: '',
    siteImplementation: '',
    projectDuration: '',
    totalCost: 0,
    fundingSource: '',
    description: '',
    significance: '',
    objectives: '',
    methodology: '',
    technologyRoadmap: '',
    expectedOutput: '',
    workPlan: '',
    proposalStatus: '', 
  },
  updatedAt: '',
  createdAt: '',
};

export const selectedResearchInfo = writable(ResearchModel);


selectedResearchInfo.subscribe((value) => {
  localStorage.setItem('selectedResearchInfo', JSON.stringify(value));
});

export const updateResearch = (selectedResearch: any) => {
  selectedResearchInfo.update((oldResearch) => ({ ...oldResearch, ...selectedResearch}));
};
