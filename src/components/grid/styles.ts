import styled from 'styled-components';

interface IStyleGridProps {
  gridTemplateColumn?: string;
  gridTemplateRows?: string;
  gapColumn?: string;
  gapRow?: string;
  margin?: string;
}

export const Container = styled.div<IStyleGridProps>`
  display: grid;
  grid-template-columns: ${props => props.gridTemplateColumn || '1fr'};
  grid-template-rows: ${props => props.gridTemplateRows || 'auto'};
  grid-column-gap: ${props => props.gapColumn || 'auto'};
  grid-row-gap: ${props => props.gapRow || 'auto'};
  margin: ${props => props.margin || 'auto'};
`;
