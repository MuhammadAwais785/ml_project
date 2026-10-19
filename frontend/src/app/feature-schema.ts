export type Feature = {name:string; label:string; kind:'number'|'category'; required:boolean; section:string; options?:string[] | null};
// OPTIONS ARE PROVISIONAL: align choices with the original encoders before real inference.
export const FEATURES: Feature[] = [
  {
    "name": "Age",
    "label": "Age",
    "kind": "number",
    "required": true,
    "section": "Demographics",
    "options": null
  },
  {
    "name": "Gender",
    "label": "Gender",
    "kind": "category",
    "required": true,
    "section": "Demographics",
    "options": [
      "Male",
      "Female"
    ]
  },
  {
    "name": "Smoking_History",
    "label": "Smoking History",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Alcohol_Consumption",
    "label": "Alcohol Consumption",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Obesity_BMI",
    "label": "Obesity BMI",
    "kind": "number",
    "required": true,
    "section": "Risk_Factors",
    "options": null
  },
  {
    "name": "Diabetes",
    "label": "Diabetes",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Inflammatory_Bowel_Disease",
    "label": "Inflammatory Bowel Disease",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Family_History",
    "label": "Family History",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Diet_Risk",
    "label": "Diet Risk",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "Low",
      "Moderate",
      "High"
    ]
  },
  {
    "name": "Physical_Activity",
    "label": "Physical Activity",
    "kind": "category",
    "required": true,
    "section": "Risk_Factors",
    "options": [
      "Low",
      "Moderate",
      "High"
    ]
  },
  {
    "name": "Abdominal Pain",
    "label": "Abdominal Pain",
    "kind": "category",
    "required": true,
    "section": "Symptoms",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Bleeding PR",
    "label": "Bleeding PR",
    "kind": "category",
    "required": true,
    "section": "Symptoms",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Weight Loss",
    "label": "Weight Loss",
    "kind": "category",
    "required": true,
    "section": "Symptoms",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Bowel Change",
    "label": "Bowel Change",
    "kind": "category",
    "required": true,
    "section": "Symptoms",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Tenesmus",
    "label": "Tenesmus",
    "kind": "category",
    "required": true,
    "section": "Symptoms",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Anemia related symptoms",
    "label": "Anemia related symptoms",
    "kind": "category",
    "required": true,
    "section": "Symptoms",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Abdominal Mass Palpable",
    "label": "Abdominal Mass Palpable",
    "kind": "category",
    "required": true,
    "section": "Physical_Exam",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "PR Exam Suspicious",
    "label": "PR Exam Suspicious",
    "kind": "category",
    "required": true,
    "section": "Physical_Exam",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Pallor",
    "label": "Pallor",
    "kind": "category",
    "required": true,
    "section": "Physical_Exam",
    "options": [
      "No",
      "Yes"
    ]
  },
  {
    "name": "Hemoglobin ",
    "label": "Hemoglobin",
    "kind": "number",
    "required": true,
    "section": "Lab_Tests",
    "options": null
  },
  {
    "name": "FIT/FOBT",
    "label": "FIT/FOBT",
    "kind": "category",
    "required": true,
    "section": "Lab_Tests",
    "options": [
      "Negative",
      "Positive"
    ]
  },
  {
    "name": "CEA_Level",
    "label": "CEA Level",
    "kind": "number",
    "required": true,
    "section": "Lab_Tests",
    "options": null
  },
  {
    "name": "Liver function Test",
    "label": "Liver function Test",
    "kind": "category",
    "required": true,
    "section": "Lab_Tests",
    "options": [
      "Normal",
      "Abnormal"
    ]
  },
  {
    "name": "serum Albumin",
    "label": "serum Albumin",
    "kind": "number",
    "required": true,
    "section": "Lab_Tests",
    "options": null
  }
];
