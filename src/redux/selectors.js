export const selectContacts = state => state.contacts.items;
export const selectFilter = state => state.filter;
export const selectUserData = state => state.auth.userData;
export const selectToken = state => state.auth.token;
export const selectIsSignedIn = state => state.auth.isSignedIn;
export const selectUserIsLoading = state => state.auth.isLoading;
export const selectUserError = state => state.auth.error;
