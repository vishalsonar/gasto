import { Utility } from "../service/utility";

export class i18n {

    private mapping: any;

    constructor() {
        this.mapping = {
            "1": {
                "en": "Login / SignUp",
                "hi": "लॉग इन / साइन अप करें"
            },
            "2": {
                "en": "Record",
                "hi": "अभिलेख"
            },
            "3": {
                "en": "User",
                "hi": "उपयोगकर्ता"
            },
            "4": {
                "en": "Statistics",
                "hi": "आंकड़े"
            },
            "5": {
                "en": "Statement",
                "hi": "कथन"
            },
            "6": {
                "en": "Report",
                "hi": "प्रतिवेदन"
            },
            "7": {
                "en": "User Details",
                "hi": "उपयोगकर्ता विवरण"
            },
            "8": {
                "en": "Add Category",
                "hi": "श्रेणी जोड़ना"
            },
            "9": {
                "en": "Logout",
                "hi": "लॉग आउट"
            },
            "10": {
                "en": "Amount",
                "hi": "राशि"
            },
            "11": {
                "en": "Category",
                "hi": "श्रेणी"
            },
            "12": {
                "en": "Select Category",
                "hi": "श्रेणी का चयन करें"
            },
            "13": {
                "en": "click",
                "hi": "क्लिक"
            },
            "14": {
                "en": "here",
                "hi": "यहां"
            },
            "15": {
                "en": "to add category",
                "hi": "श्रेणी जोड़ने के लिए"
            },
            "16": {
                "en": "Submit",
                "hi": "प्रस्तुत करें"
            },
            "17": {
                "en": "Reset",
                "hi": "रीसेट"
            },
            "18": {
                "en": "Loading",
                "hi": "लोड हो रहा है"
            },
            "19": {
                "en": "No Data Found",
                "hi": "कोई डेटा उपलब्ध नहीं"
            },
            "20": {
                "en": "Count",
                "hi": "गिनती"
            },
            "21": {
                "en": "Start Date",
                "hi": "आरंभ तिथि"
            },
            "22": {
                "en": "End Date",
                "hi": "अंतिम तिथि"
            },
            "23": {
                "en": "DateTime",
                "hi": "दिनांक समय"
            },
            "24": {
                "en": "Location",
                "hi": "स्थान"
            },
            "25": {
                "en": "Date Amount Report",
                "hi": "दिनांक राशि रिपोर्ट"
            },
            "26": {
                "en": "Category Amount Report",
                "hi": "श्रेणी राशि रिपोर्ट"
            },
            "27": {
                "en": "Not Available",
                "hi": "उपलब्ध नहीं है"
            },
            "28": {
                "en": "Email Verified Successfully",
                "hi": "ईमेल सफलतापूर्वक सत्यापित"
            },
            "29": {
                "en": "Email Verification Failed",
                "hi": "ईमेल सत्यापन विफल"
            },
            "30": {
                "en": "Name",
                "hi": "नाम"
            },
            "31": {
                "en": "Search",
                "hi": "खोजे"
            },
            "32": {
                "en": "Remove",
                "hi": "निकले"
            },
            "33": {
                "en": "Server Error, Please Try again later",
                "hi": "सर्वर समस्या, कृपया बाद में पुन: प्रयास करें"
            },
            "34": {
                "en": "Logged in Successfully",
                "hi": "सफलतापूर्वक लॉग इन हो चुका है"
            },
            "35": {
                "en": "Failed to login, Please Try again later",
                "hi": "लॉगिन करने में विफल, कृपया बाद में पुनः प्रयास करें"
            },
            "36": {
                "en": "Amount must not be empty",
                "hi": "अवैध राशि"
            },
            "37": {
                "en": "Please select category",
                "hi": "कृपया श्रेणी चुनें"
            },
            "38": {
                "en": "Amount must be a number e.g.: 12.21",
                "hi": "राशि एक संख्या होनी चाहिए जैसे: 12.21"
            },
            "39": {
                "en": "Record inserted Successfully",
                "hi": "रिकॉर्ड सफलतापूर्वक सहेजा गया"
            },
            "40": {
                "en": "Error while inserting Record, Please try again later",
                "hi": "रिकॉर्ड सहेजते समय समस्या, कृपया बाद में पुन: प्रयास करें"
            },
            "41": {
                "en": "Please select date",
                "hi": "कृपया तिथि चुनें"
            },
            "42": {
                "en": "Please select Start Date",
                "hi": "कृपया आरंभ तिथि चुनें"
            },
            "43": {
                "en": "Please select End Date",
                "hi": "कृपया अंतिम तिथि चुनें"
            },
            "44": {
                "en": "End Date must be older than Start Date",
                "hi": "अंतिम तिथि आरंभ तिथि से पुरानी होनी चाहिए"
            },
            "45": {
                "en": "Category name must not be empty",
                "hi": "श्रेणी का नाम खाली नहीं होना चाहिए"
            },
            "46": {
                "en": "Category name inserted Successfully",
                "hi": "श्रेणी का नाम सफलतापूर्वक सहेजा गया"
            },
            "47": {
                "en": "Error while inserting Category name, Please try again later",
                "hi": "श्रेणी का नाम डालने में समस्या, कृपया बाद में पुन: प्रयास करें"
            },
            "48": {
                "en": "Category name must contain only Alphabet",
                "hi": "श्रेणी के नाम में केवल वर्णमाला होनी चाहिए"
            },
            "49": {
                "en": "Category name already present, Please try different name",
                "hi": "श्रेणी का नाम पहले से मौजूद है, कृपया अलग नाम आज़माएं"
            },
            "50": {
                "en": "Category name removed Successfully",
                "hi": "श्रेणी का नाम सफलतापूर्वक निकाला गया"
            },
            "51": {
                "en": "Error while removing Category name, Please try again later",
                "hi": "श्रेणी का नाम हटाते समय समस्या, कृपया बाद में पुनः प्रयास करें"
            },
            "52": {
                "en": "Error while loading statistics data",
                "hi": "सांख्यिकी डेटा लोड करते समय समस्या"
            }
        }
    }

    public getText(id: string) {
        return this.mapping[id][Utility.getLanguage()];
    }
}