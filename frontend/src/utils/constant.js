export const HOST = 'http://localhost:3000';

export const AUTH_ROUTE = '/api/auth';

export const SIGNUP_ROUTE = `${AUTH_ROUTE}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const GET_USER_INFO = `${AUTH_ROUTE}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTE}/update-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/add-profileImage`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTE}/remove-profileImage`;
export const LOGOUT_USER = `${AUTH_ROUTE}/logout`;

export const CONTACTS_ROUTES = '/api/contacts';
export const SEARCH_CONTACT_ROUTES = `${CONTACTS_ROUTES}/search`;
