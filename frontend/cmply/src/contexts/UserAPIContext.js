import { createContext, useState } from "react";

export const useUserAPIContext = () => {
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(0);
    const [isSuperUser, setIsSuperUser] = useState(false);

    return {
        username,
        setUsername,
        userId,
        setUserId,
        isSuperUser,
        setIsSuperUser,
    };
};
const UserAPIContext = createContext({
    username: "",
    setUsername: () => {},
    userId: -1,
    setUserId: () => {},
    isSuperUser: false,
    setIsSuperUser: () => {},
});

export default UserAPIContext;
