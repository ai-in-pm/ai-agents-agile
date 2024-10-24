import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface LearningData {
  iteration: number;
  performance: number;
  adaptability: number;
}

const AdaptiveLearningSystem: React.FC = () => {
  const [learningData, setLearningData] = useState<LearningData[]>([]);
  const [currentIteration, setCurrentIteration] = useState(0);

  const generateLearningData = (iteration: number) => {
    const performance = Math.min(95, 50 + iteration * 2 + Math.random() * 10);
    const adaptability = Math.min(95, 40 + iteration * 3 + Math.random() * 10);
    return { iteration, performance, adaptability };
  };

  useEffect(() => {
    const initialData = Array.from({ length: 10 }, (_, i) => generateLearningData(i));
    setLearningData(initialData);
    setCurrentIteration(10);
  }, []);

  const runNextIteration = () => {
    const newIteration = currentIteration + 1;
    const newData = generateLearningData(newIteration);
    setLearningData([...learningData, newData]);
    setCurrentIteration(newIteration);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <RefreshCw className="mr-2" size={32} />
        Adaptive Learning System
      </h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold dark:text-white">Learning Progress</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
            onClick={runNextIteration}
          >
            <RefreshCw className="mr-2" size={16} />
            Run Next Iteration
          </button>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={learningData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iteration" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="performance" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="adaptability" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Current Performance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {learningData[learningData.length - 1]?.performance.toFixed(2)}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Overall team performance</p>
            </div>
            <TrendingUp size={48} className="text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Adaptability Score</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-green-600">
                {learningData[learningData.length - 1]?.adaptability.toFixed(2)}%
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Team's ability to adapt</p>
            </div>
            <TrendingUp size={48} className="text-green-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveLearningSystem;