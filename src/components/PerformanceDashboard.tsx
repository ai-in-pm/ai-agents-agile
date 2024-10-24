import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { RefreshCw, BarChart2, TrendingUp, Users, Brain, Clock, Target } from 'lucide-react';

interface TeamPerformance {
  team: string;
  productivity: number;
  quality: number;
  collaboration: number;
  aiUtilization: number;
  velocity: number;
}

interface TrendData {
  week: string;
  productivity: number;
  quality: number;
  collaboration: number;
}

const PerformanceDashboard: React.FC = () => {
  const [performanceData, setPerformanceData] = useState<TeamPerformance[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'productivity' | 'quality' | 'collaboration'>('productivity');
  const [timeRange, setTimeRange] = useState<'1w' | '1m' | '3m' | '6m'>('1m');

  const generateRandomData = () => {
    const teams = ['Team Alpha', 'Team Beta', 'Team Gamma', 'Team Delta'];
    return teams.map(team => ({
      team,
      productivity: Math.floor(Math.random() * 30 + 70), // 70-100
      quality: Math.floor(Math.random() * 20 + 80), // 80-100
      collaboration: Math.floor(Math.random() * 25 + 75), // 75-100
      aiUtilization: Math.floor(Math.random() * 40 + 60), // 60-100
      velocity: Math.floor(Math.random() * 30 + 70), // 70-100
    }));
  };

  const generateTrendData = () => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    return weeks.map(week => ({
      week,
      productivity: Math.floor(Math.random() * 30 + 70),
      quality: Math.floor(Math.random() * 20 + 80),
      collaboration: Math.floor(Math.random() * 25 + 75),
    }));
  };

  useEffect(() => {
    setPerformanceData(generateRandomData());
    setTrendData(generateTrendData());
  }, []);

  const refreshData = () => {
    setPerformanceData(generateRandomData());
    setTrendData(generateTrendData());
  };

  const getMetricColor = (value: number) => {
    if (value >= 90) return 'text-green-500';
    if (value >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 flex items-center">
              <BarChart2 className="mr-2" size={32} />
              Performance Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Monitor team performance, AI utilization, and project metrics in real-time
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <select
              className="border rounded p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as '1w' | '1m' | '3m' | '6m')}
            >
              <option value="1w">Last Week</option>
              <option value="1m">Last Month</option>
              <option value="3m">Last 3 Months</option>
              <option value="6m">Last 6 Months</option>
            </select>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center transition-colors duration-200"
              onClick={refreshData}
            >
              <RefreshCw className="mr-2" size={16} />
              Refresh
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {performanceData.slice(0, 1).map((data, index) => (
            <React.Fragment key={index}>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Target className="text-blue-500 mr-2" size={20} />
                    <h3 className="font-semibold dark:text-white">Productivity</h3>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(data.productivity)}`}>
                    {data.productivity}%
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="text-green-500 mr-2" size={20} />
                    <h3 className="font-semibold dark:text-white">Quality</h3>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(data.quality)}`}>
                    {data.quality}%
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="text-purple-500 mr-2" size={20} />
                    <h3 className="font-semibold dark:text-white">Collaboration</h3>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(data.collaboration)}`}>
                    {data.collaboration}%
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Brain className="text-orange-500 mr-2" size={20} />
                    <h3 className="font-semibold dark:text-white">AI Utilization</h3>
                  </div>
                  <span className={`text-2xl font-bold ${getMetricColor(data.aiUtilization)}`}>
                    {data.aiUtilization}%
                  </span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Team Performance Comparison</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={performanceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="team" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productivity" fill="#3B82F6" name="Productivity" />
                <Bar dataKey="quality" fill="#10B981" name="Quality" />
                <Bar dataKey="collaboration" fill="#8B5CF6" name="Collaboration" />
                <Bar dataKey="aiUtilization" fill="#F97316" name="AI Utilization" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 dark:text-white">Performance Trends</h3>
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedMetric === 'productivity'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setSelectedMetric('productivity')}
            >
              Productivity
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedMetric === 'quality'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setSelectedMetric('quality')}
            >
              Quality
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedMetric === 'collaboration'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              onClick={() => setSelectedMetric('collaboration')}
            >
              Collaboration
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Key Insights</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <TrendingUp className="text-green-500 mr-2 mt-1" size={16} />
                <span className="text-gray-600 dark:text-gray-300">
                  Team Beta shows highest AI utilization rate at {performanceData[1]?.aiUtilization}%
                </span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="text-yellow-500 mr-2 mt-1" size={16} />
                <span className="text-gray-600 dark:text-gray-300">
                  Collaboration scores improved by 15% since last month
                </span>
              </li>
              <li className="flex items-start">
                <TrendingUp className="text-blue-500 mr-2 mt-1" size={16} />
                <span className="text-gray-600 dark:text-gray-300">
                  Quality metrics consistently above 85% across all teams
                </span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4 dark:text-white">Recommendations</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Brain className="text-purple-500 mr-2 mt-1" size={16} />
                <span className="text-gray-600 dark:text-gray-300">
                  Increase AI pair programming sessions for Team Delta
                </span>
              </li>
              <li className="flex items-start">
                <Users className="text-blue-500 mr-2 mt-1" size={16} />
                <span className="text-gray-600 dark:text-gray-300">
                  Schedule cross-team knowledge sharing sessions
                </span>
              </li>
              <li className="flex items-start">
                <Target className="text-green-500 mr-2 mt-1" size={16} />
                <span className="text-gray-600 dark:text-gray-300">
                  Optimize sprint planning with AI assistance
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;