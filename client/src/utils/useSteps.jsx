import { useState } from "react";

export const useSteps = ({ initialStep, totalSteps }) => {
  const [activeStep, setActiveStep] = useState(initialStep || 0);

  const nextStep = () => {
    if (!isLastStep()) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep !== 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const reset = () => {
    setActiveStep(initialStep || 0);
  };

  const isLastStep = () => {
    return activeStep === totalSteps - 1;
  };

  return { nextStep, prevStep, reset, activeStep, isLastStep };
};
