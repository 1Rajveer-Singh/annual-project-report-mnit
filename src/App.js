import React, { useState } from 'react';
import {
  FileText,
  Database,
  Filter,
  Users,
  CheckCircle,
  BarChart,
  Edit3,
  Download,
  Upload,
  Lock
} from 'lucide-react';

// Mock data for demonstration
const initialData = {
  admissions: { submitted: false, data: null },
  finance: { submitted: false, data: null },
  academic: { submitted: false, data: null },
  research: { submitted: false, data: null }
};

const AnnualReportSystem = () => {
  const [currentStep, setCurrentStep] = useState('collect');
  const [departmentData, setDepartmentData] = useState(initialData);
  const [userRole, setUserRole] = useState('admin'); // admin, department, faculty
  const [selectedFilters, setSelectedFilters] = useState([]);
  
  // Steps in the process
  const steps = [
    { id: 'collect', label: 'Data Collection', icon: Upload },
    { id: 'integrate', label: 'Data Integration', icon: Database },
    { id: 'process', label: 'Data Processing', icon: BarChart },
    { id: 'filter', label: 'Filter Data', icon: Filter },
    { id: 'access', label: 'Access Control', icon: Lock },
    { id: 'analyze', label: 'Data Analysis', icon: BarChart },
    { id: 'report', label: 'Generate Report', icon: FileText },
    { id: 'collaborate', label: 'Collaborative Editing', icon: Edit3 },
    { id: 'compliance', label: 'Compliance Check', icon: CheckCircle },
    { id: 'distribute', label: 'Distribution', icon: Download }
  ];

  // Handle department data submission
  const handleDataSubmit = (department, data) => {
    setDepartmentData(prev => ({
      ...prev,
      [department]: { submitted: true, data }
    }));
  };

  // Handle filter selection
  const handleFilterSelect = (filter) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Annual Report Generation System
            </h1>
            <div className="flex items-center space-x-4">
              <select
                className="rounded-md border-gray-300 shadow-sm"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="department">Department Head</option>
                <option value="faculty">Faculty</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  currentStep === step.id
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep === step.id
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                }`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs mt-2">{step.label}</span>
              </div>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow p-6">
          {currentStep === 'collect' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Data Collection</h2>
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(departmentData).map(([dept, status]) => (
                  <div key={dept} className="border rounded-lg p-4">
                    <h3 className="font-medium capitalize">{dept}</h3>
                    <div className="mt-4">
                      {!status.submitted ? (
                        <button
                          onClick={() => handleDataSubmit(dept, { /* sample data */ })}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                          Submit Data
                        </button>
                      ) : (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Data Submitted
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'filter' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Filter Data</h2>
              <div className="grid grid-cols-2 gap-4">
                {['Graduation Rates', 'Budget Allocation', 'Research Output', 'Faculty Achievements'].map(filter => (
                  <label key={filter} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(filter)}
                      onChange={() => handleFilterSelect(filter)}
                      className="rounded text-blue-600"
                    />
                    <span>{filter}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1].id);
                }
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              disabled={currentStep === steps[0].id}
            >
              Previous
            </button>
            <button
              onClick={() => {
                const currentIndex = steps.findIndex(s => s.id === currentStep);
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1].id);
                }
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={currentStep === steps[steps.length - 1].id}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnualReportSystem;
