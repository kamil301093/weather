import styled from "styled-components";

const Item = styled.div`
        background:#f0f0f0;
        border-bottom: 1px solid #fff;
        color:#383838;
        cursor:pointer;
        font-size:12px;
        line-height:28px;
        margin:0 auto;
        position:absolute;
        text-align:left;
        text-indent:10px;
        width:100%;
        &:hover {
                background:#fff;
        }
`;

export default Item;