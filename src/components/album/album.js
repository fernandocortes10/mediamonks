import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import './album.css';

const Album = ({album}) => {

    const {id, title} = album;

    return (
        <div className="card card-album">
            <div className="card-header">
                <h6>Id: {id}</h6>
                <Link className="nav-link nav-link-album" to={`/photos/${id}`}>Photos</Link>
            </div>

            <div style={{textAlign: "center"}}>
                <img src='http://icons.iconarchive.com/icons/iconsmind/outline/256/Photo-Album-2-icon.png' width="150"
                     height="150" alt="avatar"/>
            </div>
            <div className="card-footer">
                <h5>{title}</h5>
            </div>
        </div>
    );
};

Album.propTypes = {
    album: PropTypes.shape({}).isRequired
};

export default Album;
