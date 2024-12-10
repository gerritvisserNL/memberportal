import getProfilesService from "../services/profiles/getProfilesService.js";
import getProfileByIdService from "../services/profiles/getProfileByIdService.js";
import updateProfileByIdService from "../services/profiles/updateProfileByIdService.js";
import deleteProfileByIdService from "../services/profiles/deleteProfileByIdService.js";

// Get all profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await getProfilesService();
    res.status(200).json(profiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ error: "Failed to fetch profiles" });
  }
};

// Get a profile by user ID
export const getProfileById = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await getProfileByIdService(parseInt(userId, 10));
    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update a profile by user ID
export const updateProfileById = async (req, res) => {
  const { userId } = req.params;
  const { bio, avatar, address, phoneNumber } = req.body;

  try {
    const updatedProfile = await updateProfileByIdService(
      parseInt(userId, 10),
      {
        bio,
        avatar,
        address,
        phoneNumber,
      }
    );
    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    if (error.message.includes("P2025")) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Delete a profile by user ID
export const deleteProfileById = async (req, res) => {
  const { userId } = req.params;

  try {
    await deleteProfileByIdService(parseInt(userId, 10));
    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error("Error deleting profile:", error);
    if (error.message.includes("P2025")) {
      return res.status(404).json({ error: "Profile not found" });
    }
    res.status(500).json({ error: "Failed to delete profile" });
  }
};
