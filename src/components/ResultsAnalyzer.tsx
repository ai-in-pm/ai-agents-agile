import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Clipboard, Download } from 'lucide-react';

interface TeamResult {
  id: number;
  name: string;
  productivity: number;
  quality: number;
  collaboration: number;
  overallScore: number;
}

const ResultsAnalyzer: React.FC = () => {
  const [teamResults, setTeamResults] = useState<TeamResult[]>([
    { id: 1, name: 'Team A', productivity: 85, quality: 90, collaboration: 78, overallScore: 84.3 },
    { id: 2, name: 'Team B', productivity: 92, quality: 88, collaboration: 95, overallScore: 91.7 },
    { id: 3, name: 'Team C', productivity: 78, quality: 82, collaboration: 88, overallScore: 82.7 },
  ]);

  const generateReport = () => {
    const report = teamResults.map(team => `
Team: ${team.name}
Productivity: ${team.productivity}%
Quality: ${team.quality}%
Collaboration: ${team.collaboration}%
Overall Score: ${team.overallScore.toFixed(1)}%

`).join('\n');

    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'team_performance_report.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Results Analyzer</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Team Performance Comparison</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={teamResults}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="productivity" fill="#8884d8" />
              <Bar dataKey="quality" fill="#82ca9d" />
              <Bar dataKey="collaboration" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Key Insights</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Team B has the highest overall performance score.</li>
            <li>Team A excels in quality but needs improvement in collaboration.</li>
            <li>Team C shows balanced performance across all metrics.</li>
            <li>Collaboration scores vary the most among teams.</li>
          </ul>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Implement Team B's collaboration strategies across all teams.</li>
            <li>Provide additional resources to improve Team A's collaboration.</li>
            <li>Investigate factors contributing to Team C's consistent performance.</li>
            <li>Conduct workshops to share best practices among teams.</li>
          </ul>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Team Rankings</h3>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">Team</th>
              <th className="p-2 text-left">Overall Score</th>
            </tr>
          </thead>
          <tbody>
            {teamResults
              .sort((a, b) => b.overallScore - a.overallScore)
              .map((team, index) => (
                <tr key={team.id} className="border-b">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{team.name}</td>
                  <td className="p-2">{team.overallScore.toFixed(1)}%</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex justify-end space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          onClick={generateReport}
        >
          <Download className="mr-2" size={16} />
          Generate Report
        </button>
      </div>
    </div>
  );
};

export default ResultsAnalyzer;