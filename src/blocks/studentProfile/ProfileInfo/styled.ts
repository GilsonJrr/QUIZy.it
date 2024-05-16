import styled from "styled-components";

//Icons
import { BsCalendarDateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhoneSquare } from "react-icons/fa";

type Props = {};

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: relative;
  width: 100%;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;

export const Title = styled.h1`
  font-size: 1.4rem;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Label = styled.h2`
  font-size: 1.1rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Text = styled.h2`
  font-size: 1.1rem;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const Paragraph = styled.p`
  font-size: 0.9rem;
  max-height: 6em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  font-weight: 400;
`;

export const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  padding: 15px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.main.default};
  border-bottom: 1px solid ${({ theme }) => theme.colors.main.default};
`;

export const TagBackGround = styled.div`
  background-color: ${({ theme }) => theme.colors.main.default};
  border-radius: 5px;
  padding: 8px;
  display: flex;
`;

export const InfoTagContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const AboutContainer = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const BirthDate = styled(BsCalendarDateFill)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;

export const Email = styled(MdEmail)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;

export const Phone = styled(FaPhoneSquare)`
  color: ${({ theme }) => theme.colors.background.tertiary};
`;
