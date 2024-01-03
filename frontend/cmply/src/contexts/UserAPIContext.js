import { createContext, useState } from "react";

export const useUserAPIContext = () => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(0);


    return {
        username,
        setUsername,
        userId,
        setUserId,
    }

}
const UserAPIContext = createContext({
    username: "",
    setUsername: () => {},
    userId: 0,
    setUserId: () => {},
})

export default UserAPIContext;