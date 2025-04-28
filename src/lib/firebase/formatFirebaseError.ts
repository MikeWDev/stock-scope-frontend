export const formatFirebaseError = (errorCode: string): string => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in instead.";

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/weak-password":
      return "Password should be at least 6 characters long.";

    case "auth/user-not-found":
      return "No account found with this email.";

    case "auth/wrong-password":
      return "Incorrect password. Please try again.";

    case "auth/too-many-requests":
      return "Too many attempts. Please wait a while and try again.";

    case "auth/network-request-failed":
      return "Network error. Please check your connection.";

    default:
      return "Something went wrong. Please try again later.";
  }
};
