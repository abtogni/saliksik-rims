import { updateResearchList, updateUser, updateResearch } from "./store";

export async function fetchUser() {
  try {
    const response = await fetch("/api/checkUser");
    updateUser(await response.json());
  } catch (e) {
    console.error("Error fetching user:", e);
  }
}

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


