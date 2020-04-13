import React from "react";
import { gql } from "apollo-boost";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useMutation } from "@apollo/react-hooks";

const LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
        toggleLikeMovie(id: $id, isLiked: $isLiked) @client
    }
`;

const Container = styled.div`
    height: 350px;
    width: 100%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    border-radius: 5px;
    background-color: transparent;
`;

const Poster = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    height: 100%;
    width: 100%;
    border-radius: 5px;
`;

export default ({ id, bg, isLiked }) => {
    const [toggleMovie] = useMutation(LIKE_MOVIE, {
        variables: { id: parseInt(id), isLiked },
    });
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg}></Poster>
            </Link>
            <button onClick={toggleMovie}>{isLiked ? "Unlike" : "Like"}</button>
        </Container>
    );
};
