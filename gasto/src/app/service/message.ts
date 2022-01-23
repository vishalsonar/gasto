export class Message {

    public static server_error = "Server Error, Please Try again later";
    public static no_data_found = "No data found";

    public static login_success = "Logged in Successfully";
    public static login_faliure = "Failed to login, Please Try again later";

    public static record_empty_amount = "Amount must not be empty";
    public static record_invalid_amount = "Amount must be a number e.g.: 12.21";
    public static record_insert_success = "Record inserted Successfully";
    public static record_insert_failure = "Error while inserting Record, Please try again later";

    public static statement_invalid_date = "Please select date";
    public static statement_invalid_to_date = "Please select To Date";
    public static statement_invalid_from_date = "Please select From Date";
    public static statement_from_greater_to_date = "From Date must be older than To Date";

    public static category_empty_name = "Category name must not be empty";
    public static category_insert_success = "Category name inserted Successfully";
    public static category_insert_failure = "Error while inserting Category name, Please try again later";
    public static category_invalid_name = "Category name must contain only Alphabet";
    public static category_name_already_present = "Category name already present, Please try different name";
    public static category_remove_success = "Category name removed Successfully";
    public static category_remove_failure = "Error while removing Category name, Please try again later";

    public static statistics_load_failure = "Error while loading statistics data";
}