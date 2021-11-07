import { USER_STATUS } from "../constants/user"

export const getFriendsTestData = () => {
    let list = []

    for(let i = 0; i < 20; i++) {
        list.push({
            id: i,
            name: `friend ${i}`,
            status: USER_STATUS.ONLINE
        })
    }

    return list
}