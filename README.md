# Heart Disease Prediction Tool

An advanced web application that leverages machine learning to predict heart disease risk based on patient health metrics. This tool combines deep learning with K-Nearest Neighbors (KNN) algorithm to provide accurate risk assessments for healthcare professionals.

## Overview

The Heart Disease Prediction Tool addresses one of healthcare's most pressing challenges: early identification of heart disease risk. Cardiovascular diseases remain a leading cause of mortality worldwide, with WHO statistics indicating they account for approximately 30% of global deaths. This tool aims to support healthcare providers in risk assessment and early intervention.

## Features

- Real-time risk prediction using multiple machine learning models
- Interactive web interface built with Next.js and NextUI
- Comprehensive patient data input validation
- Detailed probability scores for risk assessment
- Responsive design for desktop and mobile devices
- Professional-grade visualization of results

## Technical Architecture

### Frontend Technologies
- Next.js 14 (React Framework)
- NextUI Component Library
- TypeScript
- Tailwind CSS

### Backend Technologies
- Python 3.9+
- FastAPI
- Scikit-learn
- XGBoost
- Pandas

### Machine Learning Models
- K-Nearest Neighbors (KNN)
  - Configuration: n_neighbors = 5
- Random Forest
  - Configuration: n_estimators = 20, criterion = 'entropy'
- XGBoost
  - Configuration: learning_rate = 0.1, max_depth = 15, n_estimators = 100

## Dataset Information

The model utilizes 13 key health indicators for prediction:

| Attribute | Description |
|-----------|-------------|
| age | Age in years |
| sex | Gender (0 = male; 1 = female) |
| cp | Chest pain type |
| trestbps | Resting blood pressure (mm Hg) |
| chol | Serum cholesterol (mg/dl) |
| fbs | Fasting blood sugar > 120 mg/dl |
| restecg | Resting electrocardiographic results |
| thalach | Maximum heart rate achieved |
| exang | Exercise induced angina |
| oldpeak | ST depression induced by exercise |
| slope | Slope of peak exercise ST segment |
| ca | Number of major vessels colored by flourosopy |
| thal | Thalassemia type |

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/heart-disease-V2.git
cd heart-disease-V2
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
pip install -r requirements.txt
```

4. Start the development server:
```bash
npm run dev
```

## API Documentation

The application exposes a REST API endpoint for predictions:

**Endpoint**: `/api/predict`
**Method**: POST
**Content-Type**: application/json

Example response:
```json
{
    "prediction": 0,
    "probability": {
        "negative": 0.991075670271507,
        "positive": 0.008924329728492992
    },
    "success": true,
    "timestamp": "2024-12-27T04:16:05.176254"
}
```

## Performance Metrics

Our model evaluation focuses on three key metrics:

- **Accuracy**: Overall prediction correctness
- **Precision**: Proportion of correct positive predictions
- **Recall**: Proportion of actual positives correctly identified

## Contributing

We welcome contributions to improve the Heart Disease Prediction Tool. Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- World Health Organization (WHO) for statistical data
- Journal of the American Medical Association (JAMA) for research references
- UCI Machine Learning Repository for the heart disease dataset

## Contact

For questions and support, please open an issue in the GitHub repository or contact the maintainers directly.

---

**Note**: This tool is intended to support, not replace, professional medical judgment. Always consult healthcare professionals for medical decisions.