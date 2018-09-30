import {callApi} from "../utils/apiUtils";

export const SELECT_PHOTOS_PAGE = "SELECT_PHOTOS_PAGE";
export const INVALIDATE_PHOTOS_PAGE = "INVALIDATE_PHOTOS_PAGE";

export const PHOTOS_REQUEST = "PHOTOS_REQUEST";
export const PHOTOS_SUCCESS = "PHOTOS_SUCCESS";
export const PHOTOS_FAILURE = "PHOTOS_FAILURE";

export function selectPhotosPage(page) {
    return {
        type: SELECT_PHOTOS_PAGE,
        page
    };
}

export function invalidatePhotosPage(page) {
    return {
        type: INVALIDATE_PHOTOS_PAGE,
        page
    };
}

function photosRequest(page) {
    return {
        type: PHOTOS_REQUEST,
        page
    };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function photosSuccess(page) {
    return function (payload) {
        return {
            type: PHOTOS_SUCCESS,
            page,
            photos: payload,
            totalCount: payload.length
        };
    };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function photosFailure(page) {
    return function (error) {
        return {
            type: PHOTOS_FAILURE,
            page,
            error
        };
    };
}

const API_ROOT = "https://jsonplaceholder.typicode.com";
const PHOTOS_PER_PAGE = 20;

function fetchTopPhotos(page) {

    let _start = (page - 1) * PHOTOS_PER_PAGE;

    let loc_array = document.location.href.split('/');
    let id = loc_array[loc_array.length-1];

    const url = API_ROOT + '/albums/' + id + '/photos?_limit=' + PHOTOS_PER_PAGE + '&_start=' + _start;
    return callApi(
        url,
        null,
        photosRequest(page),
        photosSuccess(page),
        photosFailure(page)
    );
}

function shouldFetchPhotos(state, page) {
    // Check cache first
    const photos = state.photosByPage[page];
    if (!photos) {
        // Not cached, should fetch
        return true;
    }

    if (photos.isFetching) {
        // Shouldn't fetch since fetching is running
        return false;
    }

    // Should fetch if cache was invalidate
    return photos.didInvalidate;
}

export function fetchTopPhotosIfNeeded(page) {
    return (dispatch, getState) => {
        if (shouldFetchPhotos(getState(), page)) {
            return dispatch(fetchTopPhotos(page));
        }
    };
}
