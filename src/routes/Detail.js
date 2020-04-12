import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            medium_cover_image
            description_intro
        }
    }
`;

const Loading = styled.div`
    font-size: 18px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
`;

export default () => {
    let { id } = useParams();
    id = parseInt(id);
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id },
    });
    if (loading) {
        return <Loading>Loading...</Loading>;
    }
    if (data && data.movie) {
        return data.movie.title;
    }
    return "Detail";
};
