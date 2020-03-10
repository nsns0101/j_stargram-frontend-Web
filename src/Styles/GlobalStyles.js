import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

//props는 부모 컴포넌트가 자식 컴포넌트에게 주는 값 (부모 자식 관계를 보고 싶으면 App.js를 참고)
export default createGlobalStyle`
    ${reset}
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    *{
        box-sizing:boder-box;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
`;
