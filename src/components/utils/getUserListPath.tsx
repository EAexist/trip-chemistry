import { userId } from "../../interface/User";

export default function getUserListPath (userIdList : userId[]) {
    return userIdList.join(',');
}