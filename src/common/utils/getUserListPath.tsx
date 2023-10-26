import { userId } from "../types/User";

export default function getUserListPath (userIdList : userId[]) {
    return userIdList.join(',');
}