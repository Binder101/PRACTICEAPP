import { selector } from "recoil";
import { userState } from "../atoms/user";

export const isLoadingState = selector({
    key : "isLoadingState",
    get : ({get}) => {
        const user = get(userState);
        return user.isLoading ? user.isLoading : '';
    }
});

export const userStateValue = selector({
    key : "useStateSelector",
    get : ({get}) => {
        const user = get(userState)
        return user.value ? user.value : '';
    }
})