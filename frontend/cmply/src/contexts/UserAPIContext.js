import { createContext, useState } from "react";

export const useUserAPIContext = () => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [userLikes, setUserLikes] = useState([]);


    return {
        username,
        setUsername,
        userId,
        setUserId,
        userPosts,
        setUserPosts,
        userLikes,
        setUserLikes
    }

}
const UserAPIContext = createContext({
    username: "",
    setUsername: () => {},
    userId: 0,
    setUserId: () => {},
    userPosts: [],
    setUserPosts: () => {},
    userLikes: [],
    setUserLikes: () => {},
})

export default UserAPIContext;