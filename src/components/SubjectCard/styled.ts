import styled from "styled-components";

type Props = {};

export const More = styled.div`
  display: none;
  flex-direction: column;
  top: 100%;
  left: 0;
  z-index: 1000;
  width: 100%;
`;

export const Image = styled.img`
  height: 80%;
  width: 100%;
  object-fit: cover;
  border-radius: 3px 3px 0 0;
  cursor: pointer;
`;

export const AllInfoContainer = styled.div`
  height: 20%;
  padding: 0 8px;
  background-color: #f8f8f8;
  border-radius: 0 0 6px 6px;
`;

export const Title = styled.h1`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 1.6rem;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const SubTitle = styled.h1`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 0.8rem;
  color: blue;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const ExtraInfoText = styled.h3`
  margin: 0;
  text-transform: uppercase;
  font-size: 0.6rem;
  font-family: Arial, Helvetica, sans-serif;
`;

export const ExtraInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const ExtraInfoInner = styled.div`
  display: flex;
  align-items: center;
`;

export const ActionButtons = styled.div`
  margin: 8px 0;
  cursor: pointer;
`;

export const Container = styled.div<Props>`
  display: flex;
  border: 2px solid #000000;
  border-radius: 6px;
  height: 200px;
  flex-direction: column;
  transition: 0.3s ease-in-out all;

  &:hover {
    ${More} {
      display: flex;
    }
    ${Image} {
      height: 50%;
    }
    ${AllInfoContainer} {
      height: 50%;
    }
    ${Title} {
      font-size: 1.3rem;
    }
  }
`;
