import { updateResearch, updateUser } from "./store";

export async function fetchUser() {
    try {
      const response = await fetch("/api/checkUser");
      const user = await response.json();
      updateUser({
        _id: user.user._id,
        userType: user.user.userType,
        firstName: user.user.firstName,
        lastName: user.user.lastName,
        avatar: user.user.firstName.charAt(0) + user.user.lastName.charAt(0),
        researches: user.user.researches,
      });
    } catch (e) {
      $goto("/");
    }
  }

  export async function fetchResearches(userID: string) {
    try {
      const response = await fetch(`/api/research/getResearches?userID=${userID}`);

      if (response.ok) {
        updateResearch(await response.json());
      } else {
        console.error("Failed to fetch researches");
      }
    } catch (err) {
      console.error("Error fetching researches:", err);
    }
  }