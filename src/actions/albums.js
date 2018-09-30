import {callApi} from "../utils/apiUtils";

export const SELECT_ALBUMS_PAGE = "SELECT_ALBUMS_PAGE";
export const INVALIDATE_ALBUMS_PAGE = "INVALIDATE_ALBUMS_PAGE";

export const ALBUMS_REQUEST = "ALBUMS_REQUEST";
export const ALBUMS_SUCCESS = "ALBUMS_SUCCESS";
export const ALBUMS_FAILURE = "ALBUMS_FAILURE";

export function selectAlbumsPage(page) {
    return {
        type: SELECT_ALBUMS_PAGE,
        page
    };
}

export function invalidateAlbumsPage(page) {
    return {
        type: INVALIDATE_ALBUMS_PAGE,
        page
    };
}

function albumsRequest(page) {
    return {
        type: ALBUMS_REQUEST,
        page
    };
}

// This is a curried function that takes page as argument,
// and expects payload as argument to be passed upon API call success.
function albumsSuccess(page) {
    return function (payload) {

        return {
            type: ALBUMS_SUCCESS,
            page,
            albums: payload,
            totalCount: payload.length
        };
    };
}

// This is a curried function that takes page as argument,
// and expects error as argument to be passed upon API call failure.
function albumsFailure(page) {
    return function (error) {
        return {
            type: ALBUMS_FAILURE,
            page,
            error
        };
    };
}

const API_ROOT = "https://jsonplaceholder.typicode.com";
const ALBUMS_PER_PAGE = 20;

function fetchTopAlbums(page) {

    let _start = (page - 1) * ALBUMS_PER_PAGE;

    const url = API_ROOT + '/albums?_limit=' + ALBUMS_PER_PAGE + '&_start=' + _start;
    return callApi(
        url,
        null,
        albumsRequest(page),
        albumsSuccess(page),
        albumsFailure(page)
    );
}

function shouldFetchAlbums(state, page) {
    // Check cache first
    const albums = state.albumsByPage[page];
    if (!albums) {
        // Not cached, should fetch
        return true;
    }

    if (albums.isFetching) {
        // Shouldn't fetch since fetching is running
        return false;
    }

    // Should fetch if cache was invalidate
    return albums.didInvalidate;
}

export function fetchTopAlbumsIfNeeded(page) {
    return (dispatch, getState) => {
        if (shouldFetchAlbums(getState(), page)) {
            return dispatch(fetchTopAlbums(page));
        }
    };
}
