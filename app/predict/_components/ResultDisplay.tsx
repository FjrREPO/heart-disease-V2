import { Card, CardHeader, CardBody, Progress, Chip } from "@nextui-org/react";

interface Probability {
  negative: number;
  positive: number;
}

interface ResultsDisplayProps {
  prediction: number;
  probability: Probability;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ prediction, probability }) => {
  const negativePercentage = (probability.negative * 100).toFixed(1);
  const positivePercentage = (probability.positive * 100).toFixed(1);

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md mb-3">Risk Assessment Result</p>
          <div className="flex items-center gap-2">
            <Chip
              className="text-md"
              color={prediction === 0 ? "success" : "danger"}
              variant="shadow"
            >
              {prediction === 0 ? "Low Risk" : "High Risk"}
            </Chip>
            <p className="text-small text-default-500">
              {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-small text-success">Low Risk Probability</p>
              <p className="text-small text-success">{negativePercentage}%</p>
            </div>
            <Progress
              color="success"
              value={parseFloat(negativePercentage)}
              className="h-3"
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <p className="text-small text-danger">High Risk Probability</p>
              <p className="text-small text-danger">{positivePercentage}%</p>
            </div>
            <Progress
              color="danger"
              value={parseFloat(positivePercentage)}
              className="h-3"
            />
          </div>

          <div className="p-4 bg-default-50 rounded-lg">
            <p className="text-small text-default-600">
              {prediction === 0
                ? `Based on the provided data, there is a ${negativePercentage}% probability that the patient is at low risk for heart disease.`
                : `Based on the provided data, there is a ${positivePercentage}% probability that the patient is at high risk for heart disease.`
              }
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};