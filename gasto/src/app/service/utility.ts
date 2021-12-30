import { CurrentUser } from "./currentUser";

export class Utility {
    public static USER = 'user';

    public static getSessionUser() {
        return sessionStorage.getItem(this.USER);
    }

    public static setSessionUser(currentUser: CurrentUser) {
        sessionStorage.setItem(this.USER, JSON.stringify(currentUser));
    }

    public static updateCurrentUser(currentUser: CurrentUser, user: any) {
        currentUser.setDisplayName(user?.displayName).setEmail(user?.email).setEmailVerified(user?.emailVerified)
                   .setPhoneNumber(user?.phoneNumber).setPhotoURL(user?.photoURL).setUid(user?.uid);
        return currentUser;
    }
}