import React, { useState, useEffect } from 'react';
import { Beaker, Play, RotateCcw } from 'lucide-react';

interface ExperimentVariable {
  name: string;
  value: number;
  min: number;
  max: number;
}

interface ExperimentResult {
  id: number;
  variables: ExperimentVariable[];
  performance: number;
  collaboration: number;
}

const ExperimentLab: React.FC = () => {
  const [variables, setVariables] = useState<ExperimentVariable[]>(() => {
    const savedVariables = localStorage.getItem('experimentVariables');
    return savedVariables ? JSON.parse(savedVariables) : [
      { name: 'AI Involvement', value: 50, min: 0, max: 100 },
      { name: 'Team Size', value: 5, min: 2, max: 10 },
      { name: 'Project Complexity', value: 3, min: 1, max: 5 },
    ];
  });

  const [results, setResults] = useState<ExperimentResult[]>(() => {
    const savedResults = localStorage.getItem('experimentResults');
    return savedResults ? JSON.parse(savedResults) : [];
  });

  useEffect(() => {
    localStorage.setItem('experimentVariables', JSON.stringify(variables));
  }, [variables]);

  useEffect(() => {
    localStorage.setItem('experimentResults', JSON.stringify(results));
  }, [results]);

  const handleVariableChange = (index: number, newValue: number) => {
    const updatedVariables = [...variables];
    updatedVariables[index].value = newValue;
    setVariables(updatedVariables);
  };

  const runSimulation = () => {
    const newResult: ExperimentResult = {
      id: Date.now(),
      variables: [...variables],
      performance: Math.random() * 100,
      collaboration: Math.random() * 100,
    };
    setResults([newResult, ...results]);
  };

  const resetVariables = () => {
    setVariables(variables.map(v => ({ ...v, value: (v.min + v.max) / 2 })));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 flex items-center">
        <Beaker className="mr-2" size={32} />
        Experiment Lab
      </h2>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Experiment Variables</h3>
        {variables.map((variable, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {variable.name}: {variable.value}
            </label>
            <input
              type="range"
              min={variable.min}
              max={variable.max}
              value={variable.value}
              onChange={(e) => handleVariableChange(index, parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        ))}
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center"
            onClick={runSimulation}
          >
            <Play className="mr-2" size={16} />
            Run Simulation
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors duration-200 flex items-center"
            onClick={resetVariables}
          >
            <RotateCcw className="mr-2" size={16} />
            Reset Variables
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">Experiment Results</h3>
        {results.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">No experiments run yet. Use the controls above to start a simulation.</p>
        ) : (
          <ul className="space-y-4">
            {results.map((result) => (
              <li key={result.id} className="bg-gray-100 dark:bg-gray-700 p-4 rounded">
                <h4 className="font-semibold text-lg dark:text-white mb-2">Experiment #{result.id}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Variables:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                      {result.variables.map((v, index) => (
                        <li key={index}>{v.name}: {v.value}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Results:</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Performance: {result.performance.toFixed(2)}%</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Collaboration: {result.collaboration.toFixed(2)}%</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExperimentLab;