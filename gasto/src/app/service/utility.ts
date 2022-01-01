import { CurrentUser } from "../entity/currentUser";
import * as CryptoJS from 'crypto-js';
import { Record } from "../entity/record";

export class Utility {

    public static PIN = '';
    public static USER = 'user';

    public static getSessionUser() {
        return sessionStorage.getItem(this.USER);
    }

    public static setSessionUser(currentUser: CurrentUser) {
        sessionStorage.setItem(this.USER, JSON.stringify(currentUser));
    }

    public static getUID() {
        let uid = null;
        const sessionUser = Utility.getSessionUser();
        if (sessionUser) {
            const user = JSON.parse(sessionUser);
            uid = Utility.updateCurrentUser(new CurrentUser(), user).getUID();
        }
        return uid;
    }

    public static updateCurrentUser(currentUser: CurrentUser, user: any) {
        currentUser.setDisplayName(user?.displayName).setEmail(user?.email).setEmailVerified(user?.emailVerified)
                   .setPhoneNumber(user?.phoneNumber).setPhotoURL(user?.photoURL).setUid(user?.uid);
        return currentUser;
    }

    public static encrypt(message: string) {
        return CryptoJS.AES.encrypt(message, this.PIN).toString();
    }

    public static decrypt(message: string) {
        return CryptoJS.AES.decrypt(message, this.PIN).toString();
    }

    public static validateNumber(message: string) {
       return !Number.isNaN(Number(message));
    }
}