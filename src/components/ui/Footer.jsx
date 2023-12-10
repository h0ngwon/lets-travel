import { styled } from 'styled-components';

function Footer() {
    return (
        <FooterContainer>
            <h4>© 2023. 여행하자. All rights reserved.</h4>
        </FooterContainer>
    );
}

const FooterContainer = styled.div`
    width: 100vw;
    background-color: #71d5c9;
    color: white;
    padding: 30px 0;
    display: flex;
    gap: 50px;
    justify-content: center;
`;

export default Footer;
