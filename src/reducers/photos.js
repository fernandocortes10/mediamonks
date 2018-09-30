import {
    SELECT_PHOTOS_PAGE,
    INVALIDATE_PHOTOS_PAGE,
    PHOTOS_REQUEST,
    PHOTOS_SUCCESS,
    PHOTOS_FAILURE
} from "../actions/photos";

export function selectedPhotosPage(state = 1, action) {
    switch (action.type) {
        case SELECT_PHOTOS_PAGE:
            return action.page;
        default:
            return state;
    }
}

function photos(state = {
                    isFetching: false,
                    didInvalidate: false,
                    totalCount: 0,
                    photos: [],
                    error: null
                },
                action) {
    switch (action.type) {
        case INVALIDATE_PHOTOS_PAGE:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case PHOTOS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case PHOTOS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                totalCount: action.totalCount,
                photos: action.photos,
                error: null
            });
        case PHOTOS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                error: action.error
            });
        default:
            return state;
    }
}

export function photosByPage(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_PHOTOS_PAGE:
        case PHOTOS_REQUEST:
        case PHOTOS_SUCCESS:
        case PHOTOS_FAILURE:
            return Object.assign({}, state, {
                [action.page]: photos(state[action.page], action)
            });
        default:
            return state;
    }
}
