import React from 'react';
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { Card, CardBody } from "@nextui-org/card";
import { title, subtitle } from "@/components/primitives";
import { Activity, Heart, AlertCircle, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-8 md:py-10">
      <div className="inline-block max-w-3xl text-center justify-center">
        <span className={title()}>Heart Disease</span>
        <span className={title({ color: "violet" })}> Prediction Tool</span>
        <h2 className={subtitle({ class: "mt-4" })}>
          Advanced AI-powered analysis to assess your heart health risk factors
        </h2>
      </div>

      <div className="flex gap-4">
        <Link
          href="/predict"
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
            size: "lg"
          })}
        >
          Start Prediction
          <ArrowRight className="ml-2" size={20} />
        </Link>
        <Link
          href="/docs"
          className={buttonStyles({
            variant: "bordered",
            radius: "full",
            size: "lg"
          })}
        >
          Learn More
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 w-full max-w-4xl">
        <Card className="p-4">
          <CardBody className="text-center">
            <Activity className="mx-auto mb-4 text-primary" size={32} />
            <h3 className="text-xl font-semibold mb-2">Accurate Analysis</h3>
            <p className="text-default-500">
              Advanced machine learning models trained on extensive medical data
            </p>
          </CardBody>
        </Card>

        <Card className="p-4">
          <CardBody className="text-center">
            <Heart className="mx-auto mb-4 text-primary" size={32} />
            <h3 className="text-xl font-semibold mb-2">Health Insights</h3>
            <p className="text-default-500">
              Detailed risk factor analysis and personalized health recommendations
            </p>
          </CardBody>
        </Card>

        <Card className="p-4">
          <CardBody className="text-center">
            <AlertCircle className="mx-auto mb-4 text-primary" size={32} />
            <h3 className="text-xl font-semibold mb-2">Early Detection</h3>
            <p className="text-default-500">
              Identify potential heart health concerns before they become serious
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="mt-8 text-center text-small text-default-500 max-w-2xl">
        <p>
          This tool is designed for informational purposes only and should not replace 
          professional medical advice. Always consult with healthcare professionals 
          for medical decisions.
        </p>
      </div>
    </section>
  );
}