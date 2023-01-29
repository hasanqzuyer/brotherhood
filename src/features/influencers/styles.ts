import styled from '@emotion/styled';
import { Theme } from '@mui/material';
import { Stack } from 'components/system';

export const InfluencersPageMain = styled(Stack)`
  width: 100%;
`;

export const InfluencersPageCharts = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
        display: flex;
        gap: ${theme.spacing(5)};
        width: 100%;
    `}
`;

export const InfluencersPageFilter = styled(Stack)<{ theme?: Theme }>`
  ${({ theme }) => `
        border-radius: 4px;
        border: 1px solid ${theme.palette.common.black}20;
        padding: ${theme.spacing(5)};
    `}
`;

export const InfluencersPageFilterActions = styled(Stack)<{
  theme?: Theme;
}>`
  justify-content: flex-end;
  & > * {
    min-width: 100px;
  }
`;

export const InfluencersPageActions = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InfluencersPageButtons = styled.div<{ theme?: Theme }>`
  ${({ theme }) => `
  display: flex;
  align-items: center;
  gap: ${theme.spacing(3)};
  `}
`;
