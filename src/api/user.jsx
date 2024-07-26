import axiosClient from "./axiosClient"

export const getCurrentUserInfo = async () => {
    return await axiosClient.get("/auth/current-user")
}

export const changeCurrentUserProfile = async (updateProfileInfo) => {
    console.log(updateProfileInfo);
    return await axiosClient.put("/profile/current-user-change",updateProfileInfo)
} 