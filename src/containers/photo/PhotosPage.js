import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import {
    invalidatePhotosPage,
    selectPhotosPage,
    fetchTopPhotosIfNeeded
} from "../../actions/photos";
import Photo from "../../components/photo/photo";

class PhotosPage extends Component {
    constructor(props) {
        super(props);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const {dispatch, page} = this.props;

        dispatch(selectPhotosPage(1));
        dispatch(invalidatePhotosPage(page));
        dispatch(fetchTopPhotosIfNeeded(page));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            const {dispatch, page} = nextProps;
            dispatch(invalidatePhotosPage(page));
            dispatch(fetchTopPhotosIfNeeded(page));
        }
    }

    handleNextPageClick(e) {
        e.preventDefault();
        const {page, photos} = this.props;
        if (photos.length > 0) {
            // go to next page only if more photos may be available
            this.props.dispatch(selectPhotosPage(page + 1));
        }
    }

    handlePreviousPageClick(e) {
        e.preventDefault();
        const page = this.props.page;
        if (page > 1) {
            this.props.dispatch(selectPhotosPage(page - 1));
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {dispatch, page} = this.props;
        dispatch(invalidatePhotosPage(page));
        dispatch(fetchTopPhotosIfNeeded(page));
    }

    render() {
        const {page, error, photos, isFetching} = this.props;
        const prevStyles = classNames("page-item", {disabled: page <= 1});
        const nextStyles = classNames("page-item", {
            disabled: photos.length === 0
        });

        return (
            <div className="container">

                <nav>
                    <ul className="pagination pagination-sm">
                        <li className={prevStyles}>
                            <a
                                className="page-link"
                                href=""
                                onClick={this.handlePreviousPageClick}
                            >
                                <span>Previous</span>
                            </a>
                        </li>
                        {!isFetching &&
                        <li className="page-item">
                            <a
                                className="page-link"
                                href=""
                                onClick={this.handleRefreshClick}
                            >
                                <span>Refresh page {page}</span>
                            </a>
                        </li>}
                        {isFetching &&
                        <li className="page-item">
                <span className="page-link">
                  <i className="fa fa-refresh fa-spin"/> Refreshing page {page}
                </span>
                        </li>}
                        <li className={nextStyles}>
                            <a
                                className="page-link"
                                href=""
                                onClick={this.handleNextPageClick}
                            >
                                <span>Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>

                {error &&
                <div className="alert alert-danger">
                    {error.message || "Unknown errors."}
                </div>}

                {!isFetching &&
                photos.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>}

                {photos.length > 0 &&
                <div className="row" style={{opacity: isFetching ? 0.5 : 1}}>
                    {photos.map(photo => (
                        <div key={photo.id} className="col-md-4">
                            <Photo key={photo.id} photo={photo}/>
                        </div>
                    ))}
                </div>}
            </div>
        );
    }
}

PhotosPage.propTypes = {
    page: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object
};

function mapStateToProps(state) {
    const {selectedPhotosPage, photosByPage} = state;
    const page = selectedPhotosPage || 1;

    if (!photosByPage || !photosByPage[page]) {
        return {
            page,
            isFetching: false,
            didInvalidate: false,
            totalCount: 0,
            photos: [],
            error: null
        };
    }

    return {
        page,
        error: photosByPage[page].error,
        isFetching: photosByPage[page].isFetching,
        didInvalidate: photosByPage[page].didInvalidate,
        totalCount: photosByPage[page].totalCount,
        photos: photosByPage[page].photos
    };
}

export default connect(mapStateToProps)(PhotosPage);
