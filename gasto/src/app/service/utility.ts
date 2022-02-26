import { CurrentUser } from "../entity/currentUser";
import * as CryptoJS from 'crypto-js';

export class Utility {

    private static USER = 'user';
    private static USER_ID: any = '';
    private static IS_REFRESH = 'isRefresh';
    private static CURRENT_USER = new CurrentUser();

    public static setSessionRefresh(state: boolean) {
        sessionStorage.setItem(this.IS_REFRESH, String(state));
    }

    public static getSessionRefresh() {
        const state = sessionStorage.getItem(this.IS_REFRESH);
        if (state) {
            return Boolean(state);
        }
        return false;
    }

    public static getSessionUser() {
        return sessionStorage.getItem(this.USER);
    }

    public static setSessionUser(currentUser: CurrentUser) {
        sessionStorage.setItem(this.USER, JSON.stringify(currentUser));
    }

    public static getCurrentUser() {
        if (this.CURRENT_USER.getUID()) {
            return this.CURRENT_USER;
        }
        let currentUser = new CurrentUser();
        const sessionUser = Utility.getSessionUser();
        if (sessionUser) {
            const user = JSON.parse(sessionUser);
            currentUser = Utility.updateCurrentUser(currentUser, user);
        }
        return currentUser;
    }

    public static getUID() {
        if (this.CURRENT_USER.getUID()) {
            this.USER_ID = this.CURRENT_USER.getUID();
        } else {
            this.USER_ID = this.getCurrentUser().getUID();
        }
        return this.USER_ID;
    }

    public static updateCurrentUser(currentUser: CurrentUser, user: any) {
        currentUser.setDisplayName(user?.displayName).setEmail(user?.email).setEmailVerified(user?.emailVerified)
                   .setPhoneNumber(user?.phoneNumber).setPhotoURL(user?.photoURL).setUid(user?.uid);
        return currentUser;
    }

    public static encrypt(message: string) {
        const key = CryptoJS.enc.Utf8.parse(this.getUID());
        return CryptoJS.AES.encrypt(message, key, {
            keySize: 16,
            iv: key,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
    }

    public static decrypt(message: string) {
        const key = CryptoJS.enc.Utf8.parse(this.getUID());
        return CryptoJS.AES.decrypt(message, key, {
            keySize: 16,
            iv: key,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }

    public static isNumeric(message: string): boolean {
       return !Number.isNaN(Number(message));
    }

    public static isAlphabetic(message: string): boolean {
        return /^[A-Za-z ]+$/.test(message);
    }
}