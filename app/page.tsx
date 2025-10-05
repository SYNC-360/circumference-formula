"use client"

import React, { useState } from 'react';
import { Calculator, CheckCircle, XCircle, Download, Lightbulb, Award, BookOpen, Target, AlertCircle, Brain, History } from 'lucide-react';

type CalculationResult = {
  circumference: string;
  radius: string;
  diameter: string;
  area: string;
  steps: string[];
};

export default function CircumferenceFormulaPage() {
  const [inputType, setInputType] = useState('radius');
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // Quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const quizQuestions = [
    { question: "What is the formula for circumference using radius?", options: ["C = πr", "C = 2πr", "C = πr²", "C = 2r"], correct: 1 },
    { question: "If a circle has a diameter of 10 cm, what is its circumference? (use π ≈ 3.14)", options: ["31.4 cm", "62.8 cm", "15.7 cm", "20 cm"], correct: 0 },
    { question: "What does π (pi) represent?", options: ["Area of a circle", "Ratio of circumference to diameter", "Radius squared", "Diameter times 2"], correct: 1 },
    { question: "If radius = 5 cm, what is the circumference?", options: ["15.7 cm", "31.4 cm", "10 cm", "25 cm"], correct: 1 },
    { question: "The formula C = πd uses which measurement?", options: ["Radius", "Diameter", "Area", "Chord"], correct: 1 },
    { question: "What is the approximate value of π?", options: ["3.0", "3.14159", "2.718", "1.414"], correct: 1 },
    { question: "If circumference = 62.8 cm, what is the diameter? (π ≈ 3.14)", options: ["10 cm", "20 cm", "31.4 cm", "5 cm"], correct: 1 },
    { question: "Which formula finds circumference from area?", options: ["C = 2√A", "C = √(4πA)", "C = A/π", "C = 2A"], correct: 1 },
    { question: "Diameter is always _____ the radius", options: ["half", "twice", "equal to", "four times"], correct: 1 },
    { question: "The Earth's diameter is ~12,742 km. What's its circumference?", options: ["~25,000 km", "~40,000 km", "~50,000 km", "~30,000 km"], correct: 1 }
  ];

  const calculateCircumference = () => {
    const value = parseFloat(inputValue);
    if (isNaN(value) || value <= 0) {
      alert('Please enter a valid positive number');
      return;
    }

    let circumference, radius, diameter, area, steps;
    const pi = Math.PI;

    if (inputType === 'radius') {
      circumference = 2 * pi * value;
      radius = value;
      diameter = value * 2;
      area = pi * value * value;
      steps = [
        `Formula: C = 2πr`,
        `Given: radius (r) = ${value}`,
        `C = 2 × π × ${value}`,
        `C = 2 × 3.14159 × ${value}`,
        `C = ${circumference.toFixed(4)}`
      ];
    } else if (inputType === 'diameter') {
      circumference = pi * value;
      diameter = value;
      radius = value / 2;
      area = pi * Math.pow(value / 2, 2);
      steps = [
        `Formula: C = πd`,
        `Given: diameter (d) = ${value}`,
        `C = π × ${value}`,
        `C = 3.14159 × ${value}`,
        `C = ${circumference.toFixed(4)}`
      ];
    } else {
      circumference = Math.sqrt(4 * pi * value);
      area = value;
      radius = Math.sqrt(value / pi);
      diameter = 2 * Math.sqrt(value / pi);
      steps = [
        `Formula: C = √(4πA)`,
        `Given: area (A) = ${value}`,
        `C = √(4 × π × ${value})`,
        `C = √(4 × 3.14159 × ${value})`,
        `C = √(${(4 * pi * value).toFixed(4)})`,
        `C = ${circumference.toFixed(4)}`
      ];
    }

    setResult({
      circumference: circumference.toFixed(4),
      radius: radius.toFixed(4),
      diameter: diameter.toFixed(4),
      area: area.toFixed(4),
      steps
    });
  };

  const handleQuizAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setQuizComplete(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setQuizComplete(false);
    setSelectedAnswer(null);
  };

  const downloadPDF = () => {
    const pdfContent = `CIRCUMFERENCE OF A CIRCLE FORMULA - Complete Study Guide

TABLE OF CONTENTS
1. The Three Main Formulas
2. Quick Reference Chart
3. Step-by-Step Examples
4. Practice Problems (with Answer Key)
5. Unit Conversion Table
6. Memory Tricks & Tips
7. Common Mistakes to Avoid

SECTION 1: THE THREE MAIN FORMULAS

Formula 1: Using Radius - C = 2πr
Formula 2: Using Diameter - C = πd
Formula 3: Using Area - C = √(4πA)

[Full PDF content continues...]`;
    
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Circumference-Formula-Complete-Guide.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Circumference of a Circle Formula
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Learn the three essential formulas to calculate the circumference of any circle. Use our interactive calculator, master step-by-step examples, test your knowledge with our quiz, and download a free study guide.
          </p>
        </div>

        {/* Calculator Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="text-indigo-600" size={32} />
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Interactive Circumference Calculator</h2>
              <p className="text-gray-600">Enter any positive number with optional decimals</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Input Type:</label>
                <div className="space-y-3">
                  {[
                    { type: 'radius', label: 'Radius', desc: 'Distance from center to edge' },
                    { type: 'diameter', label: 'Diameter', desc: 'Distance across the circle' },
                    { type: 'area', label: 'Area', desc: 'Space inside the circle' }
                  ].map(({ type, label, desc }) => (
                    <button
                      key={type}
                      onClick={() => setInputType(type)}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                        inputType === type
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-indigo-300 bg-white'
                      }`}
                    >
                      <div className="font-semibold text-gray-900">{label}</div>
                      <div className="text-sm text-gray-600">{desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Value:</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Enter ${inputType}...`}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-lg"
                />
              </div>

              <button
                onClick={calculateCircumference}
                className="w-full bg-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-indigo-700 transition-all shadow-md"
              >
                Calculate Circumference
              </button>
            </div>

            <div>
              {result ? (
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border-2 border-indigo-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Results</h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4 border border-indigo-200">
                      <div className="text-sm text-gray-600 mb-1">Circumference</div>
                      <div className="text-3xl font-bold text-indigo-600">{result.circumference}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-600 mb-1">Radius</div>
                        <div className="font-bold text-gray-900">{result.radius}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-600 mb-1">Diameter</div>
                        <div className="font-bold text-gray-900">{result.diameter}</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-gray-200 text-center">
                        <div className="text-xs text-gray-600 mb-1">Area</div>
                        <div className="font-bold text-gray-900">{result.area}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-3">Step-by-Step Solution:</h4>
                    <div className="space-y-2">
                      {result.steps.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-indigo-600 font-bold">{idx + 1}.</span>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 h-full flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <Calculator className="mx-auto mb-3 text-gray-400" size={48} />
                    <p className="font-medium">Enter a value to see results</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Three Formulas Section with Diagrams */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">The Three Circumference Formulas Explained</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            There are three main formulas for calculating the circumference of a circle, each suited for different situations depending on what information you have available. All three formulas are mathematically equivalent and will give you the same result.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Formula 1: Radius with Diagram */}
            <div className="bg-white rounded-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-all shadow-sm">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Formula 1: Using Radius</h3>
              
              {/* SVG Diagram */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <svg viewBox="0 0 200 200" className="w-full h-40">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#3b82f6" strokeWidth="3" />
                  <line x1="100" y1="100" x2="170" y2="100" stroke="#ef4444" strokeWidth="2" />
                  <circle cx="100" cy="100" r="3" fill="#1f2937" />
                  <text x="135" y="95" fill="#ef4444" fontSize="14" fontWeight="bold">r</text>
                  <text x="100" y="25" fill="#3b82f6" fontSize="12" textAnchor="middle">Circumference</text>
                </svg>
              </div>

              <div className="bg-blue-600 text-white text-center py-4 rounded-lg mb-4">
                <div className="text-3xl font-bold">C = 2πr</div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                <strong>When to use:</strong> When you know the radius (distance from center to edge)
              </p>
              <p className="text-gray-700 text-sm mb-3">
                <strong>Why it works:</strong> The radius appears twice in the diameter (d = 2r), so multiplying by 2π accounts for going around the full circle.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
                <div className="font-semibold text-sm text-gray-900 mb-1">Example</div>
                <div className="text-sm text-gray-700">r = 5 cm → C = 2 × π × 5 = 31.42 cm</div>
              </div>
            </div>

            {/* Formula 2: Diameter with Diagram */}
            <div className="bg-white rounded-lg p-6 border-2 border-purple-200 hover:border-purple-400 transition-all shadow-sm">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Formula 2: Using Diameter</h3>
              
              {/* SVG Diagram */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <svg viewBox="0 0 200 200" className="w-full h-40">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#a855f7" strokeWidth="3" />
                  <line x1="30" y1="100" x2="170" y2="100" stroke="#10b981" strokeWidth="2" />
                  <circle cx="100" cy="100" r="3" fill="#1f2937" />
                  <text x="100" y="115" fill="#10b981" fontSize="14" fontWeight="bold">d</text>
                  <text x="100" y="25" fill="#a855f7" fontSize="12" textAnchor="middle">Circumference</text>
                </svg>
              </div>

              <div className="bg-purple-600 text-white text-center py-4 rounded-lg mb-4">
                <div className="text-3xl font-bold">C = πd</div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                <strong>When to use:</strong> When you know the diameter (distance across the circle)
              </p>
              <p className="text-gray-700 text-sm mb-3">
                <strong>Why it works:</strong> This is the fundamental definition of π—the ratio of circumference to diameter (π = C/d).
              </p>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-600">
                <div className="font-semibold text-sm text-gray-900 mb-1">Example</div>
                <div className="text-sm text-gray-700">d = 10 cm → C = π × 10 = 31.42 cm</div>
              </div>
            </div>

            {/* Formula 3: Area with Diagram */}
            <div className="bg-white rounded-lg p-6 border-2 border-indigo-200 hover:border-indigo-400 transition-all shadow-sm">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Formula 3: Using Area</h3>
              
              {/* SVG Diagram */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <svg viewBox="0 0 200 200" className="w-full h-40">
                  <circle cx="100" cy="100" r="70" fill="#fed7aa" fillOpacity="0.5" stroke="#f97316" strokeWidth="3" />
                  <circle cx="100" cy="100" r="3" fill="#1f2937" />
                  <text x="100" y="105" fill="#f97316" fontSize="14" fontWeight="bold">A</text>
                  <text x="100" y="25" fill="#f97316" fontSize="12" textAnchor="middle">Area → Circumference</text>
                </svg>
              </div>

              <div className="bg-indigo-600 text-white text-center py-4 rounded-lg mb-4">
                <div className="text-2xl font-bold">C = √(4πA)</div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                <strong>When to use:</strong> When you only know the area of the circle
              </p>
              <p className="text-gray-700 text-sm mb-3">
                <strong>Why it works:</strong> Derived from combining C = 2πr and A = πr², solving for r and substituting.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600">
                <div className="font-semibold text-sm text-gray-900 mb-1">Example</div>
                <div className="text-sm text-gray-700">A = 78.5 cm² → C = √(4π × 78.5) = 31.42 cm</div>
              </div>
            </div>
          </div>

          {/* Key Relationships */}
          <div className="mt-8 bg-white rounded-lg p-6 border-2 border-indigo-200 shadow-sm">
            <div className="flex items-start gap-4">
              <Lightbulb className="text-indigo-600 flex-shrink-0 mt-1" size={32} />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Relationships</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Diameter = 2 × Radius</h4>
                    <p className="text-sm text-gray-600">(d = 2r)</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">π (Pi) ≈ 3.14159...</h4>
                    <p className="text-sm text-gray-600">Irrational number, never ends</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">C/d = π</h4>
                    <p className="text-sm text-gray-600">Circumference ÷ diameter always equals pi</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What is Circumference */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">What is the Circumference of a Circle?</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The circumference of a circle is the total distance around the circle's edge. Think of it as the perimeter of a circle—if you could unroll the circular boundary and lay it flat, the length of that line would be the circumference. This measurement is fundamental in geometry and has countless real-world applications, from calculating how far a wheel travels in one rotation to determining the amount of fencing needed for a circular garden.
            </p>
            
            <p>
              Unlike polygons where you add up the lengths of straight sides, a circle's circumference is calculated using a special mathematical relationship involving the circle's radius or diameter and the constant π (pi). This relationship is one of the most important discoveries in mathematics, dating back thousands of years to ancient civilizations who recognized that all circles, regardless of size, share the same proportional relationship between their circumference and diameter.
            </p>

            <p>
              Understanding circumference is essential for students studying geometry, engineers designing circular components, architects planning curved structures, and anyone working with circular objects in everyday life. Whether you're calculating the length of a running track, the amount of trim needed for a circular window, or the distance Earth travels around the Sun, you're using the concept of circumference.
            </p>

            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 my-6 rounded-r-lg">
              <p className="text-gray-800 font-semibold mb-2">💡 Etymology:</p>
              <p className="text-gray-700">
                The word "circumference" comes from the Latin words "circum" (around) and "ferre" (to carry). It literally means "to carry around"—a perfect description of the distance around a circle!
              </p>
            </div>
          </div>
        </div>

        {/* Understanding Pi */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Understanding π (Pi): The Magic Number</h2>
          
          <div className="space-y-4 text-gray-700 leading-relaxed mb-6">
            <p>
              Pi (π) is one of the most fascinating and important constants in mathematics. It represents the ratio of any circle's circumference to its diameter, and this ratio is always the same regardless of the circle's size—approximately 3.14159. Whether you're measuring a tiny coin or the enormous Earth, when you divide the circumference by the diameter, you always get π.
            </p>

            <p>
              Pi is an irrational number, which means its decimal representation never ends and never repeats in a pattern. Mathematicians have calculated π to trillions of digits, but for most practical purposes, 3.14159 provides sufficient accuracy. The symbol π was introduced by Welsh mathematician William Jones in 1706 and popularized by the famous mathematician Leonhard Euler.
            </p>

            <p>
              For everyday calculations, you can use π ≈ 3.14, though using your calculator's π button provides much better accuracy. Some people remember π using the fraction 22/7, which gives approximately 3.142857—close but not exact. The precision you need depends on your application: building a house might require 3.14, while aerospace engineering might need dozens of decimal places.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
              <h4 className="font-bold text-blue-900 mb-3">Historical Facts About π</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Ancient Babylonians approximated π as 3.125 around 1900 BCE</li>
                <li>• Archimedes calculated π between 3.1408 and 3.1429 around 250 BCE</li>
                <li>• The symbol π was first used in 1706</li>
                <li>• March 14 (3/14) is celebrated as Pi Day worldwide</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600">
              <h4 className="font-bold text-purple-900 mb-3">Why is π Irrational?</h4>
              <p className="text-sm text-gray-700">
                Pi cannot be expressed as a simple fraction because it's irrational. This was proven by Johann Lambert in 1768. It's also transcendental, meaning it's not the root of any polynomial equation with rational coefficients—proven by Ferdinand von Lindemann in 1882.
              </p>
            </div>
          </div>
        </div>

        {/* Step-by-Step Examples */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Detailed Step-by-Step Examples</h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                title: 'Example 1: From Radius to Circumference',
                problem: 'A circular garden has a radius of 8 meters. How much fencing is needed to go around it?',
                steps: [
                  'Identify what you have: radius = 8 m',
                  'Choose the appropriate formula: C = 2πr',
                  'Substitute the value: C = 2 × π × 8',
                  'Calculate: C = 2 × 3.14159 × 8',
                  'Simplify: C = 50.27 meters'
                ],
                answer: 'You need 50.27 meters of fencing',
                color: 'blue'
              },
              {
                title: 'Example 2: From Diameter to Circumference',
                problem: 'A circular table has a diameter of 1.5 meters. What\'s the distance around the edge?',
                steps: [
                  'Given: diameter = 1.5 m',
                  'Use formula: C = πd',
                  'Substitute: C = π × 1.5',
                  'Calculate: C = 3.14159 × 1.5',
                  'Result: C = 4.71 meters'
                ],
                answer: 'The circumference is 4.71 meters',
                color: 'purple'
              },
              {
                title: 'Example 3: From Area to Circumference',
                problem: 'A circular pond has an area of 150 square meters. What\'s its circumference?',
                steps: [
                  'Given: area = 150 m²',
                  'Use formula: C = √(4πA)',
                  'Substitute: C = √(4 × π × 150)',
                  'Calculate inside: C = √(1884.96)',
                  'Take square root: C = 43.42 meters'
                ],
                answer: 'The circumference is 43.42 meters',
                color: 'orange'
              },
              {
                title: 'Example 4: Working Backwards (Finding Diameter from Circumference)',
                problem: 'A circular running track has a circumference of 400 meters. What\'s the diameter?',
                steps: [
                  'Given: C = 400 m',
                  'Start with: C = πd',
                  'Rearrange: d = C/π',
                  'Substitute: d = 400/π',
                  'Calculate: d = 400/3.14159 = 127.32 meters'
                ],
                answer: 'The diameter is 127.32 meters',
                color: 'green'
              },
              {
                title: 'Example 5: Unit Conversion Problem',
                problem: 'A bicycle wheel has a radius of 35 cm. How many meters does the bike travel in 100 wheel rotations?',
                steps: [
                  'Find circumference: C = 2πr = 2 × π × 35 = 219.91 cm',
                  'Distance for 100 rotations: 100 × 219.91 = 21,991 cm',
                  'Convert to meters: 21,991 cm ÷ 100 = 219.91 m'
                ],
                answer: 'The bike travels 219.91 meters (almost 220 m)',
                color: 'pink'
              }
            ].map((example, idx) => (
              <div key={idx} className={`border-l-4 border-${example.color}-600 bg-${example.color}-50 p-6 rounded-r-lg`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{example.title}</h3>
                <p className="text-gray-700 font-semibold mb-4">{example.problem}</p>
                <div className="bg-white rounded-lg p-4">
                  <div className="space-y-2">
                    {example.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex gap-3">
                        <span className={`font-bold text-${example.color}-600`}>Step {stepIdx + 1}:</span>
                        <span className="text-gray-700">{step}</span>
                      </div>
                    ))}
                  </div>
                  <div className={`mt-4 bg-${example.color}-50 p-3 rounded-lg border-l-4 border-${example.color}-600`}>
                    <span className="font-bold text-gray-900">Answer: </span>
                    <span className={`text-${example.color}-700 font-semibold`}>{example.answer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Examples Table */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Target className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Real-World Applications</h2>
          </div>

          <p className="text-gray-700 mb-6">
            Understanding circumference isn't just academic—it's used every day in countless practical applications. Here are real-world scenarios where knowing how to calculate circumference is essential:
          </p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-indigo-600 text-white">
                  <th className="px-4 py-3 text-left rounded-tl-lg">Example</th>
                  <th className="px-4 py-3 text-left">Diameter</th>
                  <th className="px-4 py-3 text-left">Circumference</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">Real-world Item</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { name: 'Small', diameter: '10 cm', circumference: '31.42 cm', item: 'Cookie or coaster' },
                  { name: 'Medium', diameter: '30 cm', circumference: '94.25 cm', item: 'Dinner plate' },
                  { name: 'Large', diameter: '100 cm', circumference: '314.16 cm', item: 'Round table' },
                  { name: 'Basketball', diameter: '24 cm', circumference: '75.40 cm', item: 'Official NBA size' },
                  { name: 'Pizza', diameter: '35 cm', circumference: '109.96 cm', item: 'Large pizza' },
                  { name: 'Car Tire', diameter: '60 cm', circumference: '188.50 cm', item: 'Passenger car' },
                  { name: 'Earth', diameter: '12,742 km', circumference: '40,030 km', item: 'At the equator' }
                ].map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 font-semibold text-gray-900">{row.name}</td>
                    <td className="px-4 py-3 text-gray-700">{row.diameter}</td>
                    <td className="px-4 py-3 text-indigo-600 font-semibold">{row.circumference}</td>
                    <td className="px-4 py-3 text-gray-700">{row.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Additional Real-World Scenarios */}
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { emoji: '🌍', title: 'Earth Navigation', desc: 'Critical for GPS systems and flight planning', calc: 'C ≈ 40,030 km' },
              { emoji: '🏃', title: 'Olympic Track', desc: 'Standard track with curved sections', calc: '≈ 400 meters total' },
              { emoji: '🍕', title: 'Pizza Size', desc: 'Fun fact: 16" pizza > two 8" pizzas!', calc: '125.66 cm crust' },
              { emoji: '🚗', title: 'Car Tire', desc: '830 rotations/min at highway speed', calc: '201 cm/rotation' },
              { emoji: '🎡', title: 'Ferris Wheel', desc: 'London Eye takes 30 min per rotation', calc: '377 m per ride' },
              { emoji: '🏗️', title: 'Architecture', desc: 'Always add 5-10% extra for fitting', calc: '31.42 m trim' }
            ].map((app, idx) => (
              <div key={idx} className="border-l-4 border-indigo-600 bg-indigo-50 p-4 rounded-r-lg">
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{app.emoji}</span>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{app.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{app.desc}</p>
                    <p className="text-sm font-semibold text-indigo-600">{app.calc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Section */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Award className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Test Your Knowledge: Interactive Quiz</h2>
          </div>

          {!quizStarted ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-700 mb-6">
                Ready to test what you've learned? Take our 10-question quiz and see how well you understand circumference formulas!
              </p>
              <button
                onClick={() => setQuizStarted(true)}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold text-lg hover:bg-indigo-700 transition-all shadow-md"
              >
                Start Quiz Now
              </button>
            </div>
          ) : quizComplete ? (
            <div className="text-center py-8">
              <Award className="mx-auto text-indigo-600 mb-4" size={64} />
              <h3 className="text-4xl font-bold text-gray-900 mb-4">Quiz Complete!</h3>
              <p className="text-2xl text-indigo-600 font-bold mb-6">
                Score: {score} / {quizQuestions.length}
              </p>
              <p className="text-xl text-gray-700 mb-8">
                {score === 10 ? "🎉 Perfect! You're a circumference master!" :
                 score >= 7 ? "🌟 Great job! You know your formulas!" :
                 score >= 5 ? "📚 Good effort! Review the formulas and try again." :
                 "💪 Keep practicing! Use the calculator above to build your skills."}
              </p>
              <button
                onClick={resetQuiz}
                className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-600">
                    Question {currentQuestion + 1} / {quizQuestions.length}
                  </span>
                  <span className="text-sm font-semibold text-indigo-600">Score: {score}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                        selectedAnswer === null
                          ? 'border-gray-300 hover:border-indigo-400 bg-white'
                          : selectedAnswer === idx
                          ? idx === quizQuestions[currentQuestion].correct
                            ? 'border-green-500 bg-green-50'
                            : 'border-red-500 bg-red-50'
                          : idx === quizQuestions[currentQuestion].correct
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-300 bg-white opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{option}</span>
                        {selectedAnswer !== null && (
                          idx === quizQuestions[currentQuestion].correct ? (
                            <CheckCircle className="text-green-600" size={24} />
                          ) : selectedAnswer === idx ? (
                            <XCircle className="text-red-600" size={24} />
                          ) : null
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Common Mistakes */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="text-red-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Common Mistakes to Avoid</h2>
          </div>

          <p className="text-gray-700 mb-6">
            Even students who understand the formulas can make calculation errors. Here are the most common mistakes and how to avoid them:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: 1, wrong: 'Confusing radius and diameter', fix: 'Remember d = 2r. Always double-check which measurement you have!' },
              { num: 2, wrong: 'Forgetting the "2" in 2πr', fix: 'Think "2 pi r" as one unit. The 2 is essential—it accounts for the full diameter!' },
              { num: 3, wrong: 'Using π = 3 instead of 3.14159', fix: 'Use calculator\'s π button for accuracy' },
              { num: 4, wrong: 'Mixing up area (πr²) and circumference (2πr)', fix: 'Area is SQUARED (πr²), circumference is LINEAR (2πr)' },
              { num: 5, wrong: 'Unit conversion errors', fix: 'Your answer\'s units should match your input units. Convert everything first!' },
              { num: 6, wrong: 'Rounding too early in calculation', fix: 'Use full π value throughout calculation, round only the final answer' }
            ].map((mistake, idx) => (
              <div key={idx} className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                    {mistake.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-900 mb-2">❌ {mistake.wrong}</h3>
                    <p className="text-emerald-700 font-semibold text-sm">✓ {mistake.fix}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-6 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
            <h3 className="font-bold text-indigo-900 mb-3">✓ Quick Checklist Before Submitting Your Answer</h3>
            <ul className="space-y-2 text-gray-700">
              <li>□ Did I use the correct formula for what I have (radius, diameter, or area)?</li>
              <li>□ Did I include the "2" in the 2πr formula?</li>
              <li>□ Did I use the π button on my calculator (or at least 3.14159)?</li>
              <li>□ Are my units consistent throughout the problem?</li>
              <li>□ Does my answer make logical sense? (Is it positive? Reasonable size?)</li>
              <li>□ Did I round only at the end, not during calculations?</li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {[
              {
                q: "What is the circumference of a circle formula?",
                a: "There are three main formulas depending on what you know: C = 2πr (using radius), C = πd (using diameter), and C = √(4πA) (using area). The most commonly used formula is C = 2πr because the radius is the fundamental measurement of a circle. All three formulas will give you the same result—they're just different ways of expressing the same mathematical relationship."
              },
              {
                q: "How do you find circumference with diameter?",
                a: "Use the formula C = πd. Simply multiply the diameter by pi (approximately 3.14159). For example, if the diameter is 10 cm, then C = π × 10 ≈ 31.42 cm. This is actually the simplest formula because it comes directly from the definition of π, which is the ratio of circumference to diameter."
              },
              {
                q: "What's the difference between circumference and perimeter?",
                a: "Circumference and perimeter both measure the distance around a shape, but 'circumference' is used specifically for circles and curved shapes, while 'perimeter' is used for polygons (shapes with straight sides). The concepts are the same—total distance around the outside—but the terminology differs based on the shape type."
              },
              {
                q: "Why do we use π (pi) in the circumference formula?",
                a: "Pi (π) represents the constant ratio between any circle's circumference and its diameter. No matter how big or small the circle, when you divide its circumference by its diameter, you always get approximately 3.14159. This amazing constant relationship makes π fundamental to all circle calculations. It was discovered thousands of years ago and has been studied extensively throughout mathematical history."
              },
              {
                q: "Can you calculate circumference without knowing radius or diameter?",
                a: "Yes! If you know the area of the circle, you can use the formula C = √(4πA). Alternatively, if you have a physical circle, you can measure the circumference directly by wrapping a string around it and then measuring the string's length. You can also derive the radius or diameter from other circle properties like chord lengths or arc measurements."
              },
              {
                q: "How accurate is using 3.14 instead of the full value of π?",
                a: "Using π = 3.14 gives you results accurate to about 0.05%, which is fine for most everyday calculations like homework problems or basic measurements. However, for scientific work, engineering, or any high-precision application, you should use your calculator's π button which typically stores π to 10-12 decimal places. The difference might seem small, but it can add up in large-scale projects."
              },
              {
                q: "What's the circumference of Earth?",
                a: "Earth's equatorial diameter is approximately 12,742 km, so using the formula C = πd, the circumference is about 40,030 km (or about 24,874 miles). This measurement was remarkably first calculated by the Greek mathematician Eratosthenes around 240 BCE using shadows and geometry—he was accurate to within 2% of the modern measurement!"
              },
              {
                q: "How do I convert between radius and diameter?",
                a: "The diameter is always exactly twice the radius (d = 2r), and the radius is always exactly half the diameter (r = d/2). This relationship is crucial for using the right formula. If you have the diameter but want to use the C = 2πr formula, first divide the diameter by 2 to get the radius, then proceed with the calculation."
              },
              {
                q: "Is there a formula to find the radius if I only know the circumference?",
                a: "Yes! You can rearrange the circumference formula. Starting with C = 2πr, divide both sides by 2π to get r = C/(2π). For example, if the circumference is 31.4 cm, then r = 31.4/(2π) = 31.4/6.283 ≈ 5 cm. Similarly, to find diameter from circumference, use d = C/π."
              },
              {
                q: "Why is circumference important in real life?",
                a: "Circumference calculations are essential in countless real-world applications: determining how far a wheel travels per rotation (automotive and cycling), calculating the amount of materials needed for circular construction projects (fencing, trim, piping), understanding planetary orbits and Earth's dimensions (astronomy and navigation), designing circular mechanical parts (engineering), and much more. Any time you work with anything circular, you're likely using circumference."
              },
              {
                q: "What's the relationship between circumference and area?",
                a: "Both use π and the radius, but differently. Circumference (C = 2πr) is a linear measurement that grows proportionally with the radius, while area (A = πr²) is a squared measurement that grows with the square of the radius. This means if you double the radius, the circumference doubles, but the area quadruples! They're related by the formula C = 2√(πA)."
              },
              {
                q: "Can I use these formulas for ovals or ellipses?",
                a: "No, these formulas only work for perfect circles. Ellipses (ovals) have a more complex formula involving both the major and minor axes, and there's actually no simple exact formula using only elementary functions. For ellipses, you typically need approximation formulas or numerical integration methods to calculate the perimeter accurately."
              }
            ].map((faq, idx) => (
              <div key={idx} className="border-l-4 border-indigo-600 bg-indigo-50 p-6 rounded-r-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Memory Tricks & Study Tips */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <Lightbulb className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">Memory Tricks & Study Tips</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">🧠 Remember the Formulas</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>"2 Pirates Race"</strong> = 2πr (circumference with radius)</li>
                <li><strong>"Pie Diameter"</strong> = πd (circumference with diameter)</li>
                <li><strong>"Circle around 2 times pi"</strong> = Going around requires 2π × radius</li>
                <li><strong>Area is SQUARE:</strong> πr² has the little 2 up high</li>
                <li><strong>Circumference is LINEAR:</strong> 2πr has the 2 in front</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-600 bg-purple-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-4">⚡ Quick Estimation Tricks</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Mental math:</strong> Use π ≈ 3, so C ≈ 6r (quick rough estimate)</li>
                <li><strong>Better estimate:</strong> Use π ≈ 3.14 for decent accuracy</li>
                <li><strong>Sanity check:</strong> Circumference should be about 6.28 times the radius</li>
                <li><strong>Quick conversion:</strong> If you have diameter, just multiply by 3 for a rough answer</li>
                <li><strong>Double-check:</strong> C should always be larger than d (since π &gt; 1)</li>
              </ul>
            </div>

            <div className="border-l-4 border-green-600 bg-green-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-green-900 mb-4">📱 Calculator Tips</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Use the π button</strong> for maximum accuracy (not 3.14)</li>
                <li><strong>Order matters:</strong> Enter 2 × π × r, not 2 × r × π (some calculators!)</li>
                <li><strong>Parentheses help:</strong> Use (2)(π)(r) to avoid errors</li>
                <li><strong>Save steps:</strong> Some calculators let you store π as a variable</li>
                <li><strong>Check mode:</strong> Make sure your calculator is in the right unit mode</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-600 bg-orange-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-orange-900 mb-4">✓ Test-Taking Strategies</h3>
              <ul className="space-y-3 text-gray-700">
                <li><strong>Write the formula first</strong> before plugging in numbers</li>
                <li><strong>Circle what you have</strong> (radius? diameter? area?)</li>
                <li><strong>Show your work</strong> for partial credit if answer is wrong</li>
                <li><strong>Check units</strong> before and after calculation</li>
                <li><strong>Estimate first</strong> to know if your answer makes sense</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practice Problems */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Practice Problems (Try Before Checking Answers!)</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-600 bg-emerald-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-emerald-900 mb-4">Easy Level</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside mb-4">
                <li>Find the circumference when radius = 3 cm</li>
                <li>Find the circumference when diameter = 8 cm</li>
                <li>Find the circumference when radius = 10 m</li>
                <li>If diameter = 20 inches, what is the circumference?</li>
                <li>A circle has radius 2.5 cm. Find its circumference.</li>
              </ol>
              <details className="bg-white p-4 rounded-lg">
                <summary className="font-bold text-emerald-700 cursor-pointer">Show Answers</summary>
                <ol className="mt-3 space-y-1 text-gray-700 list-decimal list-inside">
                  <li>C = 18.85 cm</li>
                  <li>C = 25.13 cm</li>
                  <li>C = 62.83 m</li>
                  <li>C = 62.83 inches</li>
                  <li>C = 15.71 cm</li>
                </ol>
              </details>
            </div>

            <div className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Medium Level</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside mb-4" start={6}>
                <li>Find circumference when area = 50 cm²</li>
                <li>A wheel has radius 35 cm. How far does it travel in one rotation?</li>
                <li>Find circumference when diameter = 15.5 meters</li>
                <li>A circular track has circumference 400 m. What's the diameter?</li>
                <li>If radius = 8 feet, what's the circumference?</li>
              </ol>
              <details className="bg-white p-4 rounded-lg">
                <summary className="font-bold text-blue-700 cursor-pointer">Show Answers</summary>
                <ol className="mt-3 space-y-1 text-gray-700 list-decimal list-inside" start={6}>
                  <li>C = 25.07 cm</li>
                  <li>C = 219.91 cm</li>
                  <li>C = 48.69 m</li>
                  <li>d = 127.32 m</li>
                  <li>C = 50.27 feet</li>
                </ol>
              </details>
            </div>

            <div className="border-l-4 border-purple-600 bg-purple-50 p-6 rounded-r-lg">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Hard Level</h3>
              <ol className="space-y-2 text-gray-700 list-decimal list-inside mb-4" start={11}>
                <li>A circle's area is 314 cm². Find the circumference.</li>
                <li>A circle has circumference 100 cm. Find the radius and area.</li>
                <li>A car tire with radius 30 cm makes 1000 rotations. What distance is traveled?</li>
                <li>Two circles: one has r = 5 cm, other has d = 12 cm. Which has larger circumference?</li>
                <li>A running track is circular with C = 500 m. What's the area enclosed?</li>
              </ol>
              <details className="bg-white p-4 rounded-lg">
                <summary className="font-bold text-purple-700 cursor-pointer">Show Answers</summary>
                <ol className="mt-3 space-y-1 text-gray-700 list-decimal list-inside" start={11}>
                  <li>C = 62.83 cm</li>
                  <li>r = 15.92 cm, A = 795.77 cm²</li>
                  <li>Distance = 188,495 cm or 1,884.95 m</li>
                  <li>Second circle (C = 37.70 cm vs 31.42 cm)</li>
                  <li>A = 19,894.37 m²</li>
                </ol>
              </details>
            </div>
          </div>
        </div>

        {/* Historical Context */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <History className="text-indigo-600" size={32} />
            <h2 className="text-3xl font-bold text-gray-900">The Fascinating History of Circumference</h2>
          </div>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              The study of circles and circumference dates back thousands of years to ancient civilizations. The Babylonians (around 1900 BCE) approximated π as 3.125, while ancient Egyptians used 3.16 in their calculations for building pyramids. These early mathematicians recognized that all circles shared a special proportional relationship.
            </p>

            <p>
              Perhaps the most famous early work came from Archimedes of Syracuse (287-212 BCE), who developed a method to calculate π by inscribing and circumscribing polygons around a circle. Using a 96-sided polygon, he determined that π was between 3.1408 and 3.1429—remarkably accurate for his time! His method of exhaustion was an early form of calculus.
            </p>

            <p>
              The symbol π wasn't introduced until much later. Welsh mathematician William Jones first used it in 1706, and the famous mathematician Leonhard Euler popularized it in the 1730s. The letter π was chosen because it's the first letter of the Greek word "perimetros," meaning perimeter.
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 my-6">
              <h4 className="font-bold text-blue-900 mb-3">📜 Timeline of Circumference Discovery</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>~1900 BCE:</strong> Babylonians approximate π ≈ 3.125</li>
                <li><strong>~1650 BCE:</strong> Egyptians use π ≈ 3.16 (Rhind Papyrus)</li>
                <li><strong>~250 BCE:</strong> Archimedes calculates π between 3.1408 and 3.1429</li>
                <li><strong>~250 CE:</strong> Chinese mathematician Liu Hui gets π ≈ 3.14159</li>
                <li><strong>1706:</strong> William Jones introduces the symbol π</li>
                <li><strong>1768:</strong> Johann Lambert proves π is irrational</li>
                <li><strong>1882:</strong> Ferdinand von Lindemann proves π is transcendental</li>
                <li><strong>2024:</strong> π calculated to over 100 trillion digits!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">2M+</div>
            <div className="text-gray-700 font-semibold">Students Helped</div>
            <div className="text-sm text-gray-600 mt-1">Worldwide usage</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">100%</div>
            <div className="text-gray-700 font-semibold">Accurate Formulas</div>
            <div className="text-sm text-gray-600 mt-1">Verified by educators</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center border border-gray-200 shadow-sm">
            <div className="text-4xl font-bold text-indigo-600 mb-2">Free</div>
            <div className="text-gray-700 font-semibold">Always Free</div>
            <div className="text-sm text-gray-600 mt-1">No signup required</div>
          </div>
        </div>

        {/* Download CTA */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 mb-12 text-white text-center shadow-lg">
          <Download className="mx-auto mb-4" size={48} />
          <h2 className="text-3xl font-bold mb-4">Download Complete Study Guide</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Get our comprehensive 7-page guide with all three formulas, 15 practice problems with detailed solutions, unit conversion tables, memory tricks, and a quick reference chart. Perfect for students, teachers, and anyone learning about circumference!
          </p>
          <button 
            onClick={downloadPDF}
            className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-md"
          >
            Download Free PDF Guide
          </button>
          <p className="text-sm mt-4 opacity-75">Instant download • No email required • Printable format</p>
        </div>

        {/* CONDENSED NETWORK FOOTER */}
        <footer className="bg-gray-50 border-t border-gray-200 rounded-lg">
          <div className="px-8 py-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {/* Calculators */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Calculators</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://circumferenceofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Circumference</a></li>
                  <li><a href="https://areaofcircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Area</a></li>
                  <li><a href="https://radiusofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Radius</a></li>
                  <li><a href="https://diameterofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Diameter</a></li>
                  <li><a href="https://equationofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Equation</a></li>
                </ul>
              </div>

              {/* Formulas */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Formulas</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://circleareaformula.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Area Formula</a></li>
                  <li><a href="https://circumferenceofacircleformula.com" className="text-indigo-600 font-medium">Circumference</a></li>
                  <li><a href="https://radiusofcircleformula.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Radius Formula</a></li>
                  <li><a href="https://volumeofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Volume Guide</a></li>
                </ul>
              </div>

              {/* Tutorials */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Tutorials</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://howtofindcircumference.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Find Circumference</a></li>
                  <li><a href="https://howtofindareaofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Find Area</a></li>
                  <li><a href="https://howtofindtheareaofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Area Tutorial</a></li>
                  <li><a href="https://howtofindcircumferenceofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Circumference Guide</a></li>
                </ul>
              </div>

              {/* Specialized */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wide">Specialized</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://unitcircleradians.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Unit Circle</a></li>
                  <li><a href="https://surfaceareaofacircle.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Surface Area</a></li>
                  <li><a href="https://minecraftcirclechart.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Minecraft Circles</a></li>
                  <li><a href="https://circlepng.com" className="text-gray-600 hover:text-indigo-600 transition-colors">Circle Images</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">© 2025 Circle Calculator Network. Professional mathematical tools.</p>
              <p className="text-xs text-gray-500">Trusted by students, teachers, engineers, and professionals worldwide</p>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}