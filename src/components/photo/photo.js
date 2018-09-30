import React from "react";
import PropTypes from "prop-types";

import './photo.css';

const Photo = ({photo}) => {

    const {thumbnailUrl, title, url, id} = photo;

    return (
        <div className="card card-photo">
            <div className="card-header">
                <h6>Id: {id}</h6>
                <a href={url} target="_blank" rel="noopener noreferrer">Ampliar</a>
            </div>

            <div style={{textAlign: "center"}}>
                <img src={thumbnailUrl} width="150" height="150" alt="avatar"/>
            </div>
            <div className="card-footer">
                <h5>{title}</h5>
            </div>
        </div>
    );
};

Photo.propTypes = {
    photo: PropTypes.shape({}).isRequired
};

export default Photo;
