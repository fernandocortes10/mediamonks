import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import classNames from "classnames";

import {
    invalidateAlbumsPage,
    selectAlbumsPage,
    fetchTopAlbumsIfNeeded
} from "../../actions/albums";
import Album from "../../components/album/album";

class AlbumsPage extends Component {
    constructor(props) {
        super(props);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
        this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);

    }

    componentDidMount() {
        const {dispatch, page} = this.props;
        dispatch(fetchTopAlbumsIfNeeded(page));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.page !== this.props.page) {
            const {dispatch, page} = nextProps;
            dispatch(fetchTopAlbumsIfNeeded(page));
        }
    }

    handleNextPageClick(e) {
        e.preventDefault();
        const {page, albums} = this.props;
        if (albums.length > 0) {
            // go to next page only if more albums may be available
            this.props.dispatch(selectAlbumsPage(page + 1));
        }
    }

    handlePreviousPageClick(e) {
        e.preventDefault();
        const page = this.props.page;
        if (page > 1) {
            this.props.dispatch(selectAlbumsPage(page - 1));
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {dispatch, page} = this.props;
        dispatch(invalidateAlbumsPage(page));
        dispatch(fetchTopAlbumsIfNeeded(page));
    }

    render() {
        const {page, error, albums, isFetching} = this.props;
        const prevStyles = classNames("page-item", {disabled: page <= 1});
        const nextStyles = classNames("page-item", {
            disabled: albums.length === 0
        });

        console.log("wwwwwwwwwwww", albums);

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
                albums.length === 0 &&
                <div className="alert alert-warning">Oops, nothing to show.</div>}

                {albums.length > 0 &&
                <div className="row" style={{opacity: isFetching ? 0.5 : 1}}>
                    {albums.map(album => (
                        <div key={album.id} className="col-md-4">
                            <Album key={albums.id} album={album}/>
                        </div>
                    ))}
                </div>}
            </div>
        );
    }
}

AlbumsPage.propTypes = {
    page: PropTypes.number.isRequired,
    albums: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    error: PropTypes.object
};

function mapStateToProps(state) {
    const {selectedAlbumsPage, albumsByPage} = state;
    const page = selectedAlbumsPage || 1;

    if (!albumsByPage || !albumsByPage[page]) {
        return {
            page,
            isFetching: false,
            didInvalidate: false,
            totalCount: 0,
            albums: [],
            error: null
        };
    }

    return {
        page,
        error: albumsByPage[page].error,
        isFetching: albumsByPage[page].isFetching,
        didInvalidate: albumsByPage[page].didInvalidate,
        totalCount: albumsByPage[page].totalCount,
        albums: albumsByPage[page].albums
    };
}

export default connect(mapStateToProps)(AlbumsPage);
