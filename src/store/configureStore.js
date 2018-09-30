import {createStore, applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import {createLogger} from "redux-logger";
import auth from "../reducers/auth";
import {selectedAlbumsPage, albumsByPage} from "../reducers/albums";
import {selectedPhotosPage, photosByPage} from "../reducers/photos";

const logger = createLogger();
const rootReducer = combineReducers({
    auth,
    selectedPhotosPage,
    photosByPage,
    selectedAlbumsPage,
    albumsByPage
});

const initialState = {};

export default function configureStore() {
    let store;

    if (module.hot) {
        store = createStore(
            rootReducer,
            initialState,
            compose(
                applyMiddleware(thunkMiddleware, logger),
                window.devToolsExtension ? window.devToolsExtension() : f => f
            )
        );
    } else {
        store = createStore(
            rootReducer,
            initialState,
            compose(applyMiddleware(thunkMiddleware), f => f)
        );
    }

    return store;
}
