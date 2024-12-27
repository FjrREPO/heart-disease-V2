"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Input, Button, Select, SelectItem } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { z } from "zod";
import { ResultsDisplay } from './_components/ResultDisplay';

const formSchema = z.object({
  age: z.number().int().min(18).max(100),
  sex: z.enum(["0", "1"]),
  cp: z.enum(["0", "1", "2", "3"]),
  trestbps: z.number().int().min(90).max(200),
  chol: z.number().int().min(120).max(570),
  fbs: z.enum(["0", "1"]),
  restecg: z.enum(["0", "1", "2"]),
  thalach: z.number().int().min(60).max(220),
  exang: z.enum(["0", "1"]),
  oldpeak: z.number().min(0).max(5).step(0.1),
  slope: z.enum(["0", "1", "2"]),
  ca: z.enum(["0", "1", "2", "3"]),
  thal: z.enum(["0", "1", "2"])
});

const predictionSchema = z.object({
  prediction: z.number(),
  probability: z.object({
    negative: z.number().min(0).max(1),
    positive: z.number().min(0).max(1) 
  }),
  success: z.boolean(),
  timestamp: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format"
  })
});

type FormData = z.infer<typeof formSchema>;

type PredictionResult = z.infer<typeof predictionSchema>;

const initialFormData: FormData = {
  age: "" as unknown as number,
  sex: "0",
  cp: "0",
  trestbps: "" as unknown as number,
  chol: "" as unknown as number,
  fbs: "0",
  restecg: "0",
  thalach: "" as unknown as number,
  exang: "0",
  oldpeak: "" as unknown as number,
  slope: "0",
  ca: "0",
  thal: "0"
};

export default function PredictPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      const processedData = {
        ...formData,
        age: Number(formData.age),
        trestbps: Number(formData.trestbps),
        chol: Number(formData.chol),
        thalach: Number(formData.thalach),
        oldpeak: Number(formData.oldpeak)
      };

      formSchema.parse(processedData);
      setValidationErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const errors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as string;
          errors[field] = error.message;
        });
        setValidationErrors(errors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const payload = {
      ...formData,
      age: Number(formData.age),
      trestbps: Number(formData.trestbps),
      chol: Number(formData.chol),
      thalach: Number(formData.thalach),
      oldpeak: Number(formData.oldpeak)
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        throw new Error(data.message || 'Prediction failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setResult(null);
    setError(null);
    setValidationErrors({});
  };

  const getInputError = (fieldName: keyof FormData) => validationErrors[fieldName];

  return (
    <div className="min-h-screen">
      <div className="max-w-[800px] mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className={`${title()} text-3xl mb-4`}>Heart Disease Risk Prediction</h1>
          <p className="text-default-600">Enter patient data to predict heart disease risk</p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500">
            <h2 className="text-2xl font-bold text-white">Patient Information Form</h2>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Age"
                  type="number"
                  value={formData.age.toString()}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  isInvalid={!!validationErrors.age}
                  errorMessage={getInputError('age')}
                  required
                />
                <Select
                  label="Sex"
                  value={formData.sex}
                  onChange={(e) => handleInputChange('sex', e.target.value)}
                  isInvalid={!!validationErrors.sex}
                  errorMessage={getInputError('sex')}
                  required
                >
                  <SelectItem key="0" value="0">Male</SelectItem>
                  <SelectItem key="1" value="1">Female</SelectItem>
                </Select>
                <Input
                  label="Resting Blood Pressure (trestbps)"
                  type="number"
                  value={formData.trestbps.toString()}
                  onChange={(e) => handleInputChange('trestbps', e.target.value)}
                  isInvalid={!!validationErrors.trestbps}
                  errorMessage={getInputError('trestbps')}
                  required
                />
                <Input
                  label="Cholesterol (chol)"
                  type="number"
                  value={formData.chol.toString()}
                  onChange={(e) => handleInputChange('chol', e.target.value)}
                  isInvalid={!!validationErrors.chol}
                  errorMessage={getInputError('chol')}
                  required
                />
                <Select
                  label="Fasting Blood Sugar > 120 mg/dl (fbs)"
                  value={formData.fbs}
                  onChange={(e) => handleInputChange('fbs', e.target.value)}
                  isInvalid={!!validationErrors.fbs}
                  errorMessage={getInputError('fbs')}
                  required
                >
                  <SelectItem key="0" value="0">No</SelectItem>
                  <SelectItem key="1" value="1">Yes</SelectItem>
                </Select>
                <Select
                  label="Resting ECG (restecg)"
                  value={formData.restecg}
                  onChange={(e) => handleInputChange('restecg', e.target.value)}
                  isInvalid={!!validationErrors.restecg}
                  errorMessage={getInputError('restecg')}
                  required
                >
                  <SelectItem key="0" value="0">Normal</SelectItem>
                  <SelectItem key="1" value="1">Having ST-T wave abnormality</SelectItem>
                  <SelectItem key="2" value="2">Showing probable or definite left ventricular hypertrophy</SelectItem>
                </Select>
                <Input
                  label="Maximum Heart Rate Achieved (thalach)"
                  type="number"
                  value={formData.thalach.toString()}
                  onChange={(e) => handleInputChange('thalach', e.target.value)}
                  isInvalid={!!validationErrors.thalach}
                  errorMessage={getInputError('thalach')}
                  required
                />
                <Select
                  label="Exercise Induced Angina (exang)"
                  value={formData.exang}
                  onChange={(e) => handleInputChange('exang', e.target.value)}
                  isInvalid={!!validationErrors.exang}
                  errorMessage={getInputError('exang')}
                  required
                >
                  <SelectItem key="0" value="0">No</SelectItem>
                  <SelectItem key="1" value="1">Yes</SelectItem>
                </Select>
                <Input
                  label="ST Depression Induced by Exercise (oldpeak)"
                  type="number"
                  step="0.1"
                  value={formData.oldpeak.toString()}
                  onChange={(e) => handleInputChange('oldpeak', e.target.value)}
                  isInvalid={!!validationErrors.oldpeak}
                  errorMessage={getInputError('oldpeak')}
                  required
                />
                <Select
                  label="Slope of the Peak Exercise ST Segment (slope)"
                  value={formData.slope}
                  onChange={(e) => handleInputChange('slope', e.target.value)}
                  isInvalid={!!validationErrors.slope}
                  errorMessage={getInputError('slope')}
                  required
                >
                  <SelectItem key="0" value="0">Upsloping</SelectItem>
                  <SelectItem key="1" value="1">Flat</SelectItem>
                  <SelectItem key="2" value="2">Downsloping</SelectItem>
                </Select>
                <Select
                  label="Number of Major Vessels Colored (ca)"
                  value={formData.ca}
                  onChange={(e) => handleInputChange('ca', e.target.value)}
                  isInvalid={!!validationErrors.ca}
                  errorMessage={getInputError('ca')}
                  required
                >
                  <SelectItem key="0" value="0">0</SelectItem>
                  <SelectItem key="1" value="1">1</SelectItem>
                  <SelectItem key="2" value="2">2</SelectItem>
                  <SelectItem key="3" value="3">3</SelectItem>
                </Select>
                <Select
                  label="Thalassemia (thal)"
                  value={formData.thal}
                  onChange={(e) => handleInputChange('thal', e.target.value)}
                  isInvalid={!!validationErrors.thal}
                  errorMessage={getInputError('thal')}
                  required
                >
                  <SelectItem key="0" value="0">Normal</SelectItem>
                  <SelectItem key="1" value="1">Fixed Defect</SelectItem>
                  <SelectItem key="2" value="2">Reversible Defect</SelectItem>
                </Select>
              </div>

              {error && (
                <div className="p-4 mb-4 text-red-500 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}

              {result && (
                <ResultsDisplay
                  prediction={result.prediction}
                  probability={result.probability}
                />
              )}

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  color="default"
                  variant="flat"
                  onClick={handleReset}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  isLoading={loading}
                >
                  {loading ? 'Predicting...' : 'Predict Risk'}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}