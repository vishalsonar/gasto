import { i18n } from "../i18n/i18n";

export class Message {

    public static i18n = new i18n();
    public static server_error = Message.i18n.getText("33");
    public static no_data_found = Message.i18n.getText("19");

    public static login_success = Message.i18n.getText("34");
    public static login_faliure = Message.i18n.getText("35");

    public static record_empty_amount = Message.i18n.getText("36");
    public static record_empty_category = Message.i18n.getText("37");
    public static record_invalid_amount = Message.i18n.getText("38");
    public static record_insert_success = Message.i18n.getText("39");
    public static record_insert_failure = Message.i18n.getText("40");

    public static statement_invalid_date = Message.i18n.getText("41");
    public static statement_invalid_start_date = Message.i18n.getText("42");
    public static statement_invalid_end_date = Message.i18n.getText("43");
    public static statement_end_greater_start_date = Message.i18n.getText("44");

    public static category_empty_name = Message.i18n.getText("45");
    public static category_insert_success = Message.i18n.getText("46");
    public static category_insert_failure = Message.i18n.getText("47");
    public static category_invalid_name = Message.i18n.getText("48");
    public static category_name_already_present = Message.i18n.getText("49");
    public static category_remove_success = Message.i18n.getText("50");
    public static category_remove_failure = Message.i18n.getText("51");

    public static statistics_load_failure = Message.i18n.getText("52");
}