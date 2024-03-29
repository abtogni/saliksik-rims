import { updateResearchList, updateUser, updateResearch, updateUserList, updatePanelist, updateLogs, updatePresentationList } from "./store";


//user fetching
export async function fetchUser() {
  try {
    const response = await fetch("/api/checkUser");
    updateUser(await response.json());
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}

export async function getUserList() {
  try {
    const response = await fetch("/api/user/getUsers");
    updateUserList(await response.json());
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}


//research fetching
export async function fetchResearches(userID: string) {
  try {
    const response = await fetch(`/api/research/getResearches?userID=${userID}`);

    if (response.ok) {
      updateResearchList(await response.json());
    } else {
      console.error("Failed to fetch researches");
    }
  } catch (err) {
    console.error("Error fetching researches:", err);
  }
}

export async function getResearchInfo(researchID: any) {
  try {
    const response = await fetch(`/api/research/getResearchData?researchID=${researchID}`);
    if (response.ok) {
      updateResearch(await response.json());
    } else {
      console.error("Failed to find research.");
    }
  } catch (error) {
    console.error("Error fetching research:", error);
  }
}


//panelist fetching
export async function getPanelists(){
  try {
    const response = await fetch("/api/research/getPanelists");
    updatePanelist(await response.json());
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}

//logs fetching
export async function getLogs(userID: string){
  try {
    const response = await fetch(`/api/logs/getUserLogs?userID=${userID}`);
    updateLogs(await response.json());
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}

//presentation fetcher
export async function getPresentationList(){
  try {
    const response = await fetch(`/api/research/getPresentations`);
    updatePresentationList(await response.json());
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}

