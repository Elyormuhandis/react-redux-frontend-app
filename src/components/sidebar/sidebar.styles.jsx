import styled from "styled-components";


export const SidebarItem = styled.span`
.sidebar__inbox{
        position: relative;
        &::after{
            content:'${props => props.inboxCount}';
            display: ${props => (props.inboxCount!==0 ? "flex" : "none")};
            width: 0.9rem;
            height: 0.9rem;
            align-items: center;
            justify-content: center;
            top: -5px;
            right: -10px;
            background-color: red;
            color: white;
            border:1px solid transparent;
            border-radius: 100%;
            font-size: 10px;
            position: absolute;
        }
    }
`
