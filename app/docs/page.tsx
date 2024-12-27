"use client";

import React from 'react';
import { Card, CardHeader, CardBody, Table, Divider, TableBody, TableCell, TableColumn, TableHeader, TableRow, Chip } from "@nextui-org/react";
import { title } from "@/components/primitives";

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-center mb-12">
          <div className="space-y-2 text-center">
            <h1 className={`${title()} text-4xl`}>Heart Disease</h1>
            <span className={title({ color: "violet" })}> Prediction Tool</span>
            <p className="text-default-600">Documentation and Technical Specifications</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="col-span-1 md:col-span-2 border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500">
              <h2 className="text-2xl font-bold text-white">Project Overview</h2>
            </CardHeader>
            <CardBody>
              <p className="text-default-600 leading-relaxed">
                This project implements a deep learning model with KNN to predict heart disease risk 
                based on patient risk factors. The model utilizes the comprehensive "Heart Disease Dataset" 
                from Kaggle for training and validation.
              </p>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500">
              <h2 className="text-2xl font-bold text-white">Key Problems</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {[
                {
                  title: "Leading Cause of Death",
                  description: "Coronary heart disease remains one of the leading causes of death worldwide.",
                  color: "text-pink-500"
                },
                {
                  title: "Risk Awareness Gap",
                  description: "Limited awareness of critical risk factors among the general population.",
                  color: "text-purple-500"
                },
                {
                  title: "Technology Integration",
                  description: "Underutilization of data-driven prediction technologies in healthcare.",
                  color: "text-blue-500"
                }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <h3 className={`text-lg font-semibold ${item.color}`}>
                    {item.title}
                  </h3>
                  <p className="text-default-600">{item.description}</p>
                  {index < 2 && <Divider className="my-4"/>}
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500">
              <h2 className="text-2xl font-bold text-white">Statistical Support</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              <div>
                <Chip color="primary" className="mb-2">WHO Statistics</Chip>
                <p className="text-default-600">
                  Cardiovascular diseases account for approximately 30% of global deaths, with 
                  Indonesian hypertension prevalence at 34.1% for ages ≥18 (Riskesdas 2018).
                </p>
              </div>
              <Divider/>
              <div>
                <Chip color="secondary" className="mb-2">JAMA Research</Chip>
                <p className="text-default-600">
                  Over 70% of heart disease risk is attributed to lifestyle factors according to 
                  the Journal of the American Medical Association.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card className="col-span-1 md:col-span-2 border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-teal-500">
              <h2 className="text-2xl font-bold text-white">Dataset Attributes</h2>
            </CardHeader>
            <CardBody>
              <Table 
                aria-label="Dataset attributes"
                classNames={{
                  th: "bg-default-100",
                  td: "py-4"
                }}
              >
                <TableHeader>
                  <TableColumn className="font-bold">ATTRIBUTE</TableColumn>
                  <TableColumn className="font-bold">DESCRIPTION</TableColumn>
                </TableHeader>
                <TableBody>
                  {[
                    ["age", "Age in years"],
                    ["sex", "Gender (0 = male; 1 = female)"],
                    ["cp", "Chest pain type"],
                    ["trestbps", "Resting blood pressure (in mm Hg)"],
                    ["chol", "Serum cholesterol in mg/dl"],
                    ["fbs", "Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)"],
                    ["restecg", "Resting electrocardiographic results"],
                    ["thalach", "Maximum heart rate achieved during exercise"],
                    ["exang", "Exercise induced angina (1 = yes; 0 = no)"],
                    ["oldpeak", "ST depression induced by exercise relative to rest"],
                    ["slope", "Slope of peak exercise ST segment"],
                    ["ca", "Number of major vessels (0-3) colored by flourosopy"],
                    ["thal", "3 = normal; 6 = fixed defect; 7 = reversible defect"]
                  ].map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row[0]}</TableCell>
                      <TableCell>{row[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-green-500">
              <h2 className="text-2xl font-bold text-white">Model Configuration</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {[
                {
                  model: "K-Nearest Neighbors (KNN)",
                  config: "n_neighbors = 5",
                  color: "text-teal-500"
                },
                {
                  model: "Random Forest",
                  config: "n_estimators = 20, criterion = 'entropy'",
                  color: "text-green-500"
                },
                {
                  model: "XGBoost",
                  config: "learning_rate = 0.1, max_depth = 15, n_estimators = 100",
                  color: "text-emerald-500"
                }
              ].map((item, index) => (
                <div key={index} className="p-4 rounded-lg bg-default-100">
                  <h3 className={`text-lg font-semibold mb-2 ${item.color}`}>
                    {item.model}
                  </h3>
                  <p className="text-default-600">{item.config}</p>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card className="border-none shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500">
              <h2 className="text-2xl font-bold text-white">Performance Metrics</h2>
            </CardHeader>
            <CardBody className="space-y-6">
              {[
                {
                  metric: "Accuracy",
                  description: "Measures the percentage of correct predictions",
                  color: "bg-green-500"
                },
                {
                  metric: "Precision",
                  description: "Measures the proportion of correct positive predictions",
                  color: "bg-emerald-500"
                },
                {
                  metric: "Recall",
                  description: "Measures the proportion of actual positives correctly predicted",
                  color: "bg-teal-500"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={`${item.color} w-2 h-2 mt-2 rounded-full`} />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{item.metric}</h3>
                    <p className="text-default-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}