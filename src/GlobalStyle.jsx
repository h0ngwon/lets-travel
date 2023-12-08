import { createGlobalStyle } from 'styled-components';
import SCDream3 from './fonts/SCDream3.otf';
import SCDream5 from './fonts/SCDream5.otf';
import Avigea from './fonts/Avigea.otf';
export const GlobalStyle = createGlobalStyle`

*{
    box-sizing: border-box;
}

@font-face {
    font-family: "SCDream3";
    src: local('SCDream3');
    font-style: normal;
    src: url(${SCDream3}) format('opentype');
}

@font-face {
    font-family: "SCDream5";
    src: local('SCDream5');
    font-style: normal;
    src: url(${SCDream5}) format('opentype');
}

@font-face {
    font-family: "Avigea";
    src: local('Avigea');
    font-style: normal;
    src: url(${Avigea}) format('opentype');
}
`;
