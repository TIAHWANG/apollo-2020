import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 100px;
    width: 80px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    overflow: hidden;
    margin-top: 10px;
    position: relative;
    bottom: -100px;
`;

const Poster = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    height: 100%;
`;

export default ({ id, bg }) => (
    <Container>
        <Link to={`/${id}`}>
            <Poster bg={bg}></Poster>
        </Link>
    </Container>
);
