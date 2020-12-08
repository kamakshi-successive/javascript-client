import styled, { css } from 'styled-components';

const Div = styled.div`
    padding: 10px;
    border: 1px solid black;
    width: 71%;
    `;
const Input = styled.input`
    width:98%;
    padding: 10px;
    border: 2px blue
    ${(props) => props.error
        && css`
        border: 1px solid red;
        color: black;
        `};
        `;

const Error = styled.p`
    color: red;
    `;

export { Div, Input, Error };
