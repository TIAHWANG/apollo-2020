import React from "react";
import { useParams } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import styled from "styled-components";
import Suggestion from "../components/Suggestion";

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            title
            medium_cover_image
            language
            rating
            description_intro
        }
        suggestions(id: $id) {
            id
            medium_cover_image
        }
    }
`;

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
        -45deg,
        #f8b195,
        #f67280,
        #c06c84,
        #6c5b7b
    );
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`;

const Column = styled.div`
    width: 30%;
    margin-right: 50px;
`;

const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
    font-weight: 700;
`;

const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;

const Description = styled.p`
    font-size: 20px;
`;

const Poster = styled.div`
    background-image: url(${(props) => props.bg});
    background-size: cover;
    background-position: center center;
    width: 25%;
    height: 60%;
    background-color: transparent;
`;

const Suggestions = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    width: 20%;
`;

export default () => {
    let { id } = useParams();
    id = parseInt(id);
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id },
    });
    console.log(data);
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : data.movie.title}</Title>
                <Subtitle>
                    {data?.movie?.language} {data?.movie?.rating}
                </Subtitle>
                <Description>{data?.movie?.description_intro}</Description>
                <Suggestions>
                    {data?.suggestions?.map((s) => (
                        <Suggestion
                            key={s.id}
                            id={s.id}
                            bg={s.medium_cover_image}
                        />
                    ))}
                </Suggestions>
            </Column>
            <Poster bg={data?.movie?.medium_cover_image}></Poster>
        </Container>
    );
};
