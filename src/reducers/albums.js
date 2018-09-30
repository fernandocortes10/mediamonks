import {
    SELECT_ALBUMS_PAGE,
    INVALIDATE_ALBUMS_PAGE,
    ALBUMS_REQUEST,
    ALBUMS_SUCCESS,
    ALBUMS_FAILURE
} from "../actions/albums";

export function selectedAlbumsPage(state = 1, action) {
    switch (action.type) {
        case SELECT_ALBUMS_PAGE:
            return action.page;
        default:
            return state;
    }
}

function albums(state = {
                    isFetching: false,
                    didInvalidate: false,
                    totalCount: 0,
                    albums: [],
                    error: null
                },
                action) {
    switch (action.type) {
        case INVALIDATE_ALBUMS_PAGE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case ALBUMS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case ALBUMS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                totalCount: action.totalCount,
                albums: action.albums,
                error: null
            });
        case ALBUMS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                error: action.error
            });
        default:
            return state;
    }
}

export function albumsByPage(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_ALBUMS_PAGE:
        case ALBUMS_REQUEST:
        case ALBUMS_SUCCESS:
        case ALBUMS_FAILURE:
            return Object.assign({}, state, {
                [action.page]: albums(state[action.page], action)
            });
        default:
            return state;
    }
}
