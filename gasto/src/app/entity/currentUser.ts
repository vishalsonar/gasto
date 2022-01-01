export class CurrentUser {

    private displayName?: string;
    private email?: string;
    private emailVerified?: boolean;
    private phoneNumber?: string;
    private photoURL?: string;
    private uid?: string;

    public getDisplayName() {
        return this.displayName;
    }

    public getEmail() {
        return this.email;
    }

    public getEmailVerified() {
        return this.emailVerified;
    }

    public getPhoneNumber() {
        return this.phoneNumber;
    }

    public getPhotoURL() {
        return this.photoURL;
    }

    public getUID() {
        return this.uid;
    }

    public setDisplayName(name: any) {
        if (name) {
            this.displayName = name;
        }
        return this;
    }

    public setEmail(email: any) {
        if (email) {
            this.email = email;
        }
        return this;
    }

    public setEmailVerified(emailVerified: any) {
        if (emailVerified) {
            this.emailVerified = emailVerified;
        }
        return this;
    }

    public setPhoneNumber(phoneNumber: any) {
        if (phoneNumber) {
            this.phoneNumber = phoneNumber;
        }
        return this;
    }

    public setPhotoURL(photoURL: any) {
        if (photoURL) {
            this.photoURL = photoURL;
        }
        return this;
    }

    public setUid(uid: any) {
        if (uid) {
            this.uid = uid;
        }
        return this;
    }

    public getDislpayEmailVerifiedAsIcon() {
        let result = 'Email Verification: <i class="';
        if (this.emailVerified) {
            result += 'check circle icon';
        } else {
            result += 'close icon icon';
        }
        return result + '"></i>';
    }

    public getDisplayImage() {
        let result = '../../assets/img/kristy.png';
        if (this.photoURL) {
            result = this.photoURL;
        }
        return result;
    }
}