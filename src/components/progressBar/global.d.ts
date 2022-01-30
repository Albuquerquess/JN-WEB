/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react/prefer-stateless-function */
// eslint-disable-next-line max-classes-per-file
declare module 'react-step-progress-bar' {
  interface ProgressBarProps {
    percent?: number;
    filledBackground?: any;
    height?: string | number;
    stepPositions?: number;
  }

  interface StepProps {
    transition?: any;
    position?: any;
  }
  class ProgressBar extends React.Component<ProgressBarProps, any> { }
  class Step extends React.Component<StepProps, any> { }
}

