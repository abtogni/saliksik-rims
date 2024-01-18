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


//User List

const storedUsers = localStorage.getItem('userList');
const storedUserList = storedUsers ? JSON.parse(storedUsers) : [];
export const userList = writable<typeof UserModel[]>(storedUserList);

userList.subscribe((value) => {
  localStorage.setItem('userList', JSON.stringify(value));
});

export const updateUserList = (UserList: any[]) => {
  userList.set(UserList.map((user) => ({
    _id: user._id,
    email: user.email,
    userType: user.userType,
    firstName: user.firstName,
    middleName: user.middleName,
    lastName: user.lastName,
    suffix: user.suffix,
    avatar: user.firstName.charAt(0) + user.lastName.charAt(0),
    researchCount: user.researchCount,
    createdAt: user.createdAt
  })));
};