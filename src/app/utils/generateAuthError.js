
export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Email or password is incorrect";
        case "EMAIL_EXIST":
            return "User already exist";
        default:
            return "Too many attempts. Try it later";
    }
}
