import styled from 'styled-components';

export const SidebarItem = styled.span`
  .sidebar {
    &::after {
      width: 0.9rem;
      height: 0.9rem;
      align-items: center;
      justify-content: center;
      top: -5px;
      right: -10px;
      color: white;
      border: 1px solid transparent;
      border-radius: 100%;
      font-size: 10px;
      position: absolute;
    }

    &__sent {
      position: relative;
      &::after {
        content: '${(props) => props.sentCount}';
        display: ${(props) => (props.sentCount !== 0 ? 'flex' : 'none')};
        background-color: #bb00da;
      }
    }
    &__inbox {
      position: relative;
      &::after {
        content: '${(props) => props.inboxCount}';
        display: ${(props) => (props.inboxCount !== 0 ? 'flex' : 'none')};
        background-color: #ff0033;
      }
    }
    &__drafts {
      position: relative;
      &::after {
        content: '${(props) => props.draftCount}';
        display: ${(props) => (props.draftCount !== 0 ? 'flex' : 'none')};
        background-color: #bb2566;
      }
    }
  }
`;
