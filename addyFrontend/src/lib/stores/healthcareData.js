// healthcareData.js

export const healthcareServices = {
    services: [
      // {
      //   id: 1,
      //   availability: true,
      //   name: "Emergency",
      //   description: "Get instant emergency help from our doctors",
      //   image: "gs://addyfitness-db121.appspot.com/emergency.gif",
      //   price: "1",
      //   consultationType: "Video/Audio Call",
      //   duration: "30 minutes",
      //   availableHours: "24/7",
      //   keyFeatures: [
      //     "Immediate doctor connection",
      //     "Priority queue handling",
      //     "Emergency prescriptions if needed",
      //     "Follow-up included"
      //   ],
      //   includes: [
      //     "24/7 doctor availability",
      //     "Digital prescription",
      //     "Medicine recommendations",
      //     "Emergency referrals if needed"
      //   ],
      //   doctorSpecialization: "Emergency Medicine",
      //   responseTime: "Within 5 minutes"
      // },
      {
        id: 2,
        name: "General Physician",
        availability: true,
        description: "Consult about any problem",
        image: "gs://addyfitness-db121.appspot.com/generalPhysician.gif",
        price: "1",
        consultationType: "Video Consultation",
        duration: "45 minutes",
        availableHours: "9 AM - 9 PM",
        keyFeatures: [
          "Comprehensive health assessment",
          "Detailed medical history review",
          "Preventive health advice",
          "Follow-up consultation"
        ],
        includes: [
          "Video consultation",
          "Digital prescription",
          "Diet recommendations",
          "3 days of free follow-up"
        ],
        doctorSpecialization: "Internal Medicine",
        responseTime: "Same day appointment"
      },
      {
        id: 3,
        name: "Medicine Specialist",
        availability: false,
        description: "Consult specific related disorder",
        image: "gs://addyfitness-db121.appspot.com/medicineSpecialist.gif",
        price: "699",
        consultationType: "Video Consultation",
        duration: "45 minutes",
        availableHours: "10 AM - 7 PM",
        keyFeatures: [
          "Specialized medical consultation",
          "In-depth disorder analysis",
          "Treatment planning",
          "Regular monitoring"
        ],
        includes: [
          "Specialist consultation",
          "Treatment plan",
          "Digital prescription",
          "7 days of follow-up support"
        ],
        doctorSpecialization: "Internal Medicine Specialist",
        responseTime: "Within 24 hours"
      },
      {
        id: 4,
        name: "Gynaecologist",
        availability: true,
        description: "Consult gynic related issues confidentially",
        image: "gs://addyfitness-db121.appspot.com/gynocologist 1.gif",
        price: "699",
        consultationType: "Private Video Consultation",
        duration: "45 minutes",
        availableHours: "10 AM - 8 PM",
        keyFeatures: [
          "Women's health consultation",
          "Pregnancy care",
          "Reproductive health",
          "Confidential support"
        ],
        includes: [
          "Private consultation",
          "Personalized care plan",
          "Digital prescription",
          "5 days of follow-up care"
        ],
        doctorSpecialization: "Obstetrics & Gynecology",
        responseTime: "Within 24 hours"
      },
      {
        id: 5,
        name: "Endocrinologist",
        availability: true,
        description: "Get your diabetes and thyroid treatment at home",
        image: "gs://addyfitness-db121.appspot.com/thyroid 3.gif",
        price: "699",
        consultationType: "Video Consultation",
        duration: "45 minutes",
        availableHours: "9 AM - 6 PM",
        keyFeatures: [
          "Hormone disorder treatment",
          "Diabetes management",
          "Thyroid care",
          "Metabolic disorder consultation"
        ],
        includes: [
          "Specialist consultation",
          "Treatment planning",
          "Diet recommendations",
          "Regular monitoring plan"
        ],
        doctorSpecialization: "Endocrinology",
        responseTime: "Within 48 hours"
      },
      {
        id: 6,
        name: "Mental Health",
        availability: true,
        description: "Get a friend to help you",
        image: "gs://addyfitness-db121.appspot.com/counsellor 1.gif",
        price: "699",
        consultationType: "Private Video/Audio Session",
        duration: "60 minutes",
        availableHours: "8 AM - 10 PM",
        keyFeatures: [
          "Confidential counseling",
          "Stress management",
          "Depression & anxiety support",
          "Personal development"
        ],
        includes: [
          "Private therapy session",
          "Personalized coping strategies",
          "Progress tracking",
          "Self-help resources"
        ],
        doctorSpecialization: "Clinical Psychology",
        responseTime: "Within 24 hours"
      },
      {
        id: 7,
        name: "Gastroenterologist",
        availability: false,
        description: "Gut Health is the key to overall health.",
        image: "gs://addyfitness-db121.appspot.com/counsellor 1.gif",
        price: "699",
        consultationType: "Private Video/Audio Session",
        duration: "60 minutes",
        availableHours: "8 AM - 10 PM",
        keyFeatures: [
          "Confidential counseling",
          "Stress management",
          "Depression & anxiety support",
          "Personal development"
        ],
        includes: [
          "Private therapy session",
          "Personalized coping strategies",
          "Progress tracking",
          "Self-help resources"
        ],
        doctorSpecialization: "Clinical Psychology",
        responseTime: "Within 24 hours"
      },
      {
        id: 8,
        name: "General Surgeon",
        availability: true,
        description: "You're in great hands.",
        image: "gs://addyfitness-db121.appspot.com/counsellor 1.gif",
        price: "699",
        consultationType: "Private Video/Audio Session",
        duration: "60 minutes",
        availableHours: "8 AM - 10 PM",
        keyFeatures: [
          "Confidential counseling",
          "Stress management",
          "Depression & anxiety support",
          "Personal development"
        ],
        includes: [
          "Private therapy session",
          "Personalized coping strategies",
          "Progress tracking",
          "Self-help resources"
        ],
        doctorSpecialization: "Clinical Psychology",
        responseTime: "Within 24 hours"
      }
    ],
  };
  
  export default healthcareServices;