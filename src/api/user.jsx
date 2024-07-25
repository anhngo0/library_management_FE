import axiosClient from "./axiosClient"

export const getCurrentUserInfo = async () => {
    return await axiosClient.get("/auth/current-user")
}