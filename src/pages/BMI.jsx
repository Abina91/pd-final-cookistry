import { useState } from "react";
import "../styles/bmi.css"; // Optional: add your styling
import Layout from "../components/Layout";

const BMI = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');
  const [tips, setTips] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    
    if (!weight || !height) {
      alert("Please enter both weight and height.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = weight / (heightInMeters * heightInMeters);
    setBmi(bmiValue.toFixed(2));

    // Based on BMI value, determine status and tips
    if (bmiValue < 18.5) {
      setStatus("Underweight");
      setTips("Eat more calories with nutrient-rich foods: nuts, dried fruits, whole grains, and dairy products.");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setStatus("Normal weight");
      setTips("Great! Maintain your weight with a balanced diet: vegetables, fruits, lean proteins, and healthy fats.");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setStatus("Overweight");
      setTips("Focus on portion control and regular exercise. Include fiber-rich foods like oats, vegetables, and beans.");
    } else {
      setStatus("Obese");
      setTips("Consult a dietitian. Prefer low-calorie, high-fiber foods like leafy greens, lean meat, and avoid sugary foods.");
    }
  };

  return (
    <Layout>
        <div className="bmi-container">
      <h2>BMI Calculator</h2>
      <form onSubmit={calculateBMI} className="bmi-form">
        <div className="input-field">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            placeholder="Enter your weight"
          />
        </div>
        <div className="input-field">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
            placeholder="Enter your height"
          />
        </div>
        <button type="submit" className="bmi-btn">Calculate BMI</button>
      </form>

      {bmi && (
        <div className="bmi-result">
          <h3>Your BMI: {bmi}</h3>
          <h4>Status: {status}</h4>
          <p>{tips}</p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default BMI;
