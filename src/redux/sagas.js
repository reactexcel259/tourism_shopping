import constants from "./constants";
import { takeLatest, takeEvery, all } from "redux-saga/effects";
import {
  loginRequest,
  signupRequest,
  getUserDataRequest,
  //   isAlreadyLoggedIn,
  logout,
    updateUserRequest,
    updatePasswordRequest,
  socialLoginRequest,
  contactUsRequest,
  forgotRequest,
  googleLoginRequest,
} from "./auth/action";
import {
  //   getMonthlyEventsRequest,
  getCategoriesRequest,
  getEventsByCategoryRequest,
  addReviewRequest,
  addInterestRequest,
  getLocationsRequest,
  getEventByIdRequest,
  addEventRequest,
  //   likeCommentRequest,
  //   unlikeCommentRequest,
  //   getInterestedEventsRequest,
  //   searchEventsRequest,
  getFeaturedEventsRequest,
  getUserPostByIdRequest,
  updateEventRequest,
  deleteEventRequest,
  getInterestRequest,
  getArtistsRequest,
  artistInterestRequest,
} from "./event/action";

function* watchActions() {
  yield takeLatest(constants.LOGIN_REQUEST, loginRequest);
  yield takeLatest(constants.SIGNUP_REQUEST, signupRequest);
  yield takeLatest(constants.SOCIAL_LOGIN_REQUEST, socialLoginRequest);
  yield takeLatest(constants.GET_USER_DATA_REQUEST, getUserDataRequest);
    yield takeLatest(constants.UPDATE_USER_REQUEST, updateUserRequest);
    yield takeLatest(constants.UPDATE_PASSWORD_REQUEST, updatePasswordRequest);
  //   yield takeLatest(
  //     constants.GET_MONTHLY_EVENTS_REQUEST,
  //     getMonthlyEventsRequest
  //   );
  yield takeLatest(constants.GET_CATEGORIES_REQUEST, getCategoriesRequest);
  yield takeLatest(
    constants.GET_EVENTS_BY_CATEGORY_REQUEST,
    getEventsByCategoryRequest
  );
  yield takeLatest(constants.GET_EVENT_BY_ID_REQUEST, getEventByIdRequest);
  //   yield takeLatest(constants.IS_ALREADY_LOGGED_IN, isAlreadyLoggedIn);
  yield takeLatest(constants.LOGOUT, logout);
  //   yield takeLatest(constants.ADD_COMMENT_REQUEST, addCommentRequest);
  //   yield takeLatest(constants.LIKE_COMMENT_REQUEST, likeCommentRequest);
  //   yield takeLatest(constants.UNLIKE_COMMENT_REQUEST, unlikeCommentRequest);
  yield takeLatest(constants.GET_LOCATIONS_REQUEST, getLocationsRequest);
  //   yield takeLatest(
  //     constants.GET_INTERESTED_EVENTS_REQUEST,
  //     getInterestedEventsRequest
  //   );
  yield takeLatest(
    constants.GET_FEATURED_EVENTS_REQUEST,
    getFeaturedEventsRequest
  );
  //   yield takeLatest(constants.SEARCH_EVENTS_REQUEST, searchEventsRequest);
  yield takeLatest(constants.ADD_INTEREST_REQUEST, addInterestRequest);
  yield takeLatest(constants.CONTACT_US_REQUEST, contactUsRequest);
  yield takeLatest(constants.ADD_REVIEW_REQUEST, addReviewRequest);

  yield takeLatest(constants.SUBMIT_EVENT_REQUEST, addEventRequest);
  yield takeLatest(constants.FORGOT_REQUEST,forgotRequest);
  yield takeLatest(constants.GET_USER_POST_BY_ID_REQUEST,getUserPostByIdRequest);
  yield takeLatest(constants.UPDATE_EVENT_REQUEST,updateEventRequest);
  yield takeLatest(constants.DELETE_EVENT_REQUEST,deleteEventRequest);
  yield takeLatest(constants.GET_INTEREST_REQUEST,getInterestRequest);
  yield takeLatest(constants.GET_ARTISTS_REQUEST,getArtistsRequest);
  yield takeLatest(constants.ARTIST_INTEREST_REQUEST,artistInterestRequest);
  yield takeLatest(constants.GOOGLE_LOGIN_REQUEST,googleLoginRequest);


}

export default function* rootSaga() {
  yield all([watchActions()]);
}
