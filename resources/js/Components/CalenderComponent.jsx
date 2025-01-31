import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function DateRangeCalendar() {
  // Mock task data
  const { jobs } = usePage().props;
  
  const tasks1 = {
    "2024-12-25": ["Christmas Celebration", "Prepare Dinner"],
    "2024-12-26": ["Team Meeting at 10 AM"],
    "2024-12-31": ["Year-End Review"],
    "2025-01-01": ["New Year Celebration"],
    "2025-01-05": ["Project Deadline"],
  };

  console.log(jobs)

  
  // Transform jobs array into tasks format
  const tasks = jobs.reduce((acc, job) => {
    const { endDate, reportNo, jobStatus } = job; // Adjust field names based on your jobs object structure
    if (!acc[endDate]) {
      acc[endDate] = [];
    }
    acc[endDate].push(reportNo); // Add the job title to the date's task list
    acc[endDate].push(jobStatus); // Add the job title to the date's task list
    return acc;
  }, {});

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [calendarDays, setCalendarDays] = useState([]);
  
  // Generate calendar days between two dates
  const generateDaysBetween = (start, end) => {
    const startObj = new Date(start);
    const endObj = new Date(end);
    const days = [];
    
    while (startObj <= endObj) {
      days.push(startObj.toISOString().split("T")[0]); // Format as YYYY-MM-DD
      startObj.setDate(startObj.getDate() + 1);
    }
    return days;
  };
  
  const handleGenerateCalendar = () => {
    if (startDate && endDate) {
      const days = generateDaysBetween(startDate, endDate);
      console.log(startDate)
      setCalendarDays(days);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Date Range Calendar</h2>

      {/* Date Range Inputs */}
      <div className="flex justify-center space-x-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          onClick={handleGenerateCalendar}
          className="self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Show Calendar
        </button>
      </div>

      {/* Calendar */}
      {calendarDays.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {calendarDays.map((day) => (
            <div
              key={day}
              className="border rounded-lg p-4 bg-white shadow hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-blue-600">{day}</h3>
              <ul className="mt-2 text-gray-700">
                {tasks[day] ? (
                  tasks[day].map((task, index) => (
                    <li key={index} className="mt-1 text-lg text-red-500">
                      - {task}
                    </li>
                  ))
                ) : (
                  <li className="text-sm text-green-500">No tasks</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Select a date range to display the calendar.</p>
      )}
    </div>
  );
}
