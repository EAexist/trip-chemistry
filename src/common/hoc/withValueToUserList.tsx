import { ComponentType } from "@react-spring/web";
import { SubTestName, TestIndex, TestName } from "../reducer/testResponseReducer";
import { useValueToUserList } from "../reducer/userListReducer";
import { UserId } from "../types/interfaces";

interface withValueToUserListProps{
    value: number;
    userIdList: UserId[];
};
const withValueToUserList = <T extends withValueToUserListProps>(WrappedComponent: ComponentType<T>) =>
    ( testName: TestName ) =>
    ( subTestName: SubTestName ) =>
    ( props: Omit<T, keyof withValueToUserListProps> ) => {
    console.log('withValueToUserList');
    return(
        Object.entries( useValueToUserList( { testName: testName, subTestName: subTestName} )).map(([value, userIdList]) => (
            <WrappedComponent {...{ key: value.toString(), value: value, userIdList : userIdList}} {...props as T}/>
        ))
    )
}

export default withValueToUserList;
export type { withValueToUserListProps }