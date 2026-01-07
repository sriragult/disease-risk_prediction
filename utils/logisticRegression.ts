
import { VitalsData, PredictionResult } from "../types";

/**
 * We simulate a Logistic Regression model here.
 * Logit = b0 + b1*Age + b2*Systolic + b3*Diastolic + b4*Glucose
 * P(Risk) = 1 / (1 + e^-Logit)
 */

// Weights are synthetic but clinically inspired (Systolic and Diastolic both contribute to risk)
const WEIGHTS = {
  bias: -13.5, 
  age: 0.05,
  systolicBP: 0.03,
  diastolicBP: 0.02,
  glucose: 0.035
};

export const predictRisk = (data: VitalsData): PredictionResult => {
  const logit = 
    WEIGHTS.bias + 
    (WEIGHTS.age * data.age) + 
    (WEIGHTS.systolicBP * data.systolicBP) + 
    (WEIGHTS.diastolicBP * data.diastolicBP) + 
    (WEIGHTS.glucose * data.glucose);
  
  const probability = 1 / (1 + Math.exp(-logit));
  const isAtRisk = probability >= 0.5;

  return {
    probability,
    isAtRisk,
    score: logit
  };
};

// Generate synthetic data for visualization boundaries
export const getBoundaryData = () => {
  const points = [];
  for (let sbp = 80; sbp <= 200; sbp += 10) {
    for (let gl = 60; gl <= 250; gl += 15) {
      // Assuming a standard diastolic relationship for the boundary plot (roughly 2/3 of systolic)
      const pred = predictRisk({ age: 50, systolicBP: sbp, diastolicBP: sbp * 0.67, glucose: gl });
      points.push({
        sbp,
        glucose: gl,
        risk: pred.isAtRisk ? 1 : 0,
        probability: pred.probability
      });
    }
  }
  return points;
};
