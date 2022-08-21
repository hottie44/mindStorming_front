import styled from "styled-components";

const fontSizes = {

};

const colors = {
    Primary: "#73D6AC",
    Secondary: "#EEFCF6",
    Line: "#DBDBDB",
    Icon_default: "#6D7A79",
    Text: "#343736",
};

const ShadowBox = styled.div`
    box-shadow: 0px 5px 10px 5px #0000001A;
`;

const UI = styled.div`
    z-index: 1000;
`;

const theme = {
    fontSizes,
    colors,
    ShadowBox,
    UI
};

export default theme;