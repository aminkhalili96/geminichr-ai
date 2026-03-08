import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

// Simulated 5-year history for our demo patient, Encik Ahmad
export async function seedDemoPatient() {
    const patientRef = await addDoc(collection(db, "patients"), {
        name: "Ahmad bin Daud",
        dob: "1968-05-14",
        icNumber: "680514-10-5321",
        gender: "Male"
    });

    const historyRef = collection(db, "patients", patientRef.id, "visits");

    // Array of past visits
    const visits = [
        {
            date: "2021-02-10",
            vitals: { bloodPressure: "135/85", heartRate: 78, temperature: 36.6 },
            diagnoses: ["Pre-hypertension"],
            medications: [],
            notes: "C/O occasional headache. Advised to reduce salt intake (kurangkan masin). B/P borderline high.",
        },
        {
            date: "2022-06-15",
            vitals: { bloodPressure: "142/90", heartRate: 82, temperature: 36.7 },
            diagnoses: ["Hypertension Stage 1"],
            medications: ["Amlodipine 5mg OD"],
            notes: "Started on Amlodipine. Pt complains of leg swelling (bengkak kaki sikit). Next appt in 3 months.",
        },
        {
            date: "2023-11-05",
            vitals: { bloodPressure: "138/88", heartRate: 80, temperature: 36.5 },
            diagnoses: ["Hypertension Stage 1", "Hyperlipidemia"],
            medications: ["Amlodipine 5mg OD", "Atorvastatin 20mg ON"],
            notes: "B/P improved. Fasting lipid profile shows high LDL (4.2 mmol/L). Started statin.",
        },
        {
            date: "2024-08-20",
            vitals: { bloodPressure: "145/92", heartRate: 85, temperature: 36.8 },
            diagnoses: ["Hypertension Stage 2", "Hyperlipidemia"],
            medications: ["Amlodipine 10mg OD", "Atorvastatin 20mg ON"],
            notes: "Pt defaulted followup for 6 months. B/P uncontrolled. Increased Amlodipine dose.",
        }
    ];

    for (const visit of visits) {
        await addDoc(historyRef, {
            ...visit,
            createdAt: serverTimestamp()
        });
    }

    return { patientId: patientRef.id, name: "Ahmad bin Daud", status: "Seeded 4 longitudinal visits." };
}
