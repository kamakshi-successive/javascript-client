import styled, { css } from 'styled-components';

const Div = styled.div`
    padding: 10px;
    border: 1px solid black;
    width: 71%;
    `;

const Input = styled.input`
    width:98%;
    padding: 10px;
    ${(props) => props.value === '101'
        && css`
        border: 1px solid red;
        color: black;
        `};
    ${(props) => props.value === 'Accessible'
    && css`
    border: 1px solid orange;
    color : black;
    `}
`;

const Error = styled.p`
    color: red;
    `;

export { Div, Input, Error };
