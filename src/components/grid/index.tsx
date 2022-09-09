import React from 'react';

import { Container } from './styles';

interface IGridProps {
  gridTemplateColumn: string | undefined;
  gridTemplateRows: string | undefined;
  gapColumn: string | undefined;
  gapRow: string | undefined;
  margin: string;
}

const Grid: React.FC<IGridProps> = ({
  gridTemplateColumn,
  gridTemplateRows,
  gapColumn,
  gapRow,
  children,
  margin,
}) => {
  return (
    <Container
      gridTemplateColumn={gridTemplateColumn}
      gridTemplateRows={gridTemplateRows}
      gapColumn={gapColumn}
      gapRow={gapRow}
      margin={margin}
      id="grid-container"
    >
      {children}
    </Container>
  );
};

export default Grid;
