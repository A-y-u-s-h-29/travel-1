"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  Calendar, 
  Clock, 
  MapPin, 
  Utensils, 
  Activity,
  ChevronDown,
  ChevronUp,
  Edit3,
  Save,
  X,
  CheckCircle,
  Coffee,
  Sun,
  Moon
} from "lucide-react";

export default function ItineraryForm({
  formData,
  setFormData,
}) {
  const [expandedDays, setExpandedDays] = useState({});

  const toggleDay = (index) => {
    setExpandedDays((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addDay = () => {
    setFormData((prev) => ({
      ...prev,
      itinerary: [
        ...prev.itinerary,
        {
          day: prev.itinerary.length + 1,
          title: "",
          description: "",
          activities: [""],
          overnight: "",
          meals: {
            breakfast: false,
            lunch: false,
            dinner: false,
          },
        },
      ],
    }));
    // Auto-expand the new day
    setExpandedDays((prev) => ({
      ...prev,
      [formData.itinerary.length]: true,
    }));
  };

  const removeDay = (index) => {
    const updated = [...formData.itinerary];
    updated.splice(index, 1);
    const reordered = updated.map((item, i) => ({
      ...item,
      day: i + 1,
    }));
    setFormData((prev) => ({
      ...prev,
      itinerary: reordered,
    }));
    // Remove from expanded state
    const newExpanded = { ...expandedDays };
    delete newExpanded[index];
    setExpandedDays(newExpanded);
  };

  const handleChange = (index, field, value) => {
    const updated = [...formData.itinerary];
    updated[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      itinerary: updated,
    }));
  };

  const handleMeal = (index, meal) => {
    const updated = [...formData.itinerary];
    updated[index].meals[meal] = !updated[index].meals[meal];
    setFormData((prev) => ({
      ...prev,
      itinerary: updated,
    }));
  };

  const addActivity = (index) => {
    const updated = [...formData.itinerary];
    updated[index].activities.push("");
    setFormData((prev) => ({
      ...prev,
      itinerary: updated,
    }));
  };

  const removeActivity = (dayIndex, activityIndex) => {
    const updated = [...formData.itinerary];
    updated[dayIndex].activities.splice(activityIndex, 1);
    setFormData((prev) => ({
      ...prev,
      itinerary: updated,
    }));
  };

  const changeActivity = (dayIndex, activityIndex, value) => {
    const updated = [...formData.itinerary];
    updated[dayIndex].activities[activityIndex] = value;
    setFormData((prev) => ({
      ...prev,
      itinerary: updated,
    }));
  };

  const getMealIcon = (meal) => {
    switch(meal) {
      case 'breakfast': return <Coffee className="w-4 h-4" />;
      case 'lunch': return <Sun className="w-4 h-4" />;
      case 'dinner': return <Moon className="w-4 h-4" />;
      default: return <Utensils className="w-4 h-4" />;
    }
  };

  const getMealLabel = (meal) => {
    return meal.charAt(0).toUpperCase() + meal.slice(1);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="border-b border-gray-100 px-6 py-4 bg-gray-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Itinerary</h2>
              <p className="text-sm text-gray-500">Plan your daily activities</p>
            </div>
          </div>
          <button
            type="button"
            onClick={addDay}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/20"
          >
            <Plus className="w-4 h-4" />
            Add Day
          </button>
        </div>
      </div>

      <div className="p-6">
        {formData.itinerary.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-all duration-200">
            <div className="flex flex-col items-center gap-3">
              <div className="p-4 bg-gray-50 rounded-full">
                <Calendar className="w-10 h-10 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">No itinerary added</p>
                <p className="text-xs text-gray-400 mt-0.5">Add your first day to start planning</p>
              </div>
              <button
                type="button"
                onClick={addDay}
                className="mt-2 flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add First Day
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.itinerary.map((day, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:border-blue-200 transition-all duration-200"
              >
                {/* Day Header */}
                <div 
                  className="flex items-center justify-between px-5 py-3 bg-gray-50/80 cursor-pointer hover:bg-gray-100/80 transition-colors"
                  onClick={() => toggleDay(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
                      <span className="text-xs font-bold text-blue-600">{day.day}</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {day.title || `Day ${day.day}`}
                      </h3>
                      {day.description && (
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {day.description.substring(0, 60)}
                          {day.description.length > 60 && '...'}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">
                      {day.activities.filter(a => a.trim()).length} activities
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDay(index);
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="p-1 text-gray-400">
                      {expandedDays[index] ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Day Content */}
                {expandedDays[index] !== false && (
                  <div className="p-5 space-y-4">
                    <input
                      type="text"
                      placeholder="Day Title (e.g., Arrival and Orientation)"
                      value={day.title}
                      onChange={(e) => handleChange(index, "title", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />

                    <textarea
                      rows={3}
                      placeholder="Detailed description of the day's activities..."
                      value={day.description}
                      onChange={(e) => handleChange(index, "description", e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            Overnight Stay
                          </div>
                        </label>
                        <input
                          type="text"
                          placeholder="Hotel name or location"
                          value={day.overnight}
                          onChange={(e) => handleChange(index, "overnight", e.target.value)}
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          <div className="flex items-center gap-1.5">
                            <Utensils className="w-4 h-4 text-gray-400" />
                            Meals Included
                          </div>
                        </label>
                        <div className="flex flex-wrap gap-3 pt-1">
                          {["breakfast", "lunch", "dinner"].map((meal) => (
                            <label
                              key={meal}
                              className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                day.meals[meal]
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={day.meals[meal]}
                                onChange={() => handleMeal(index, meal)}
                                className="hidden"
                              />
                              {getMealIcon(meal)}
                              <span className="text-sm font-medium">
                                {getMealLabel(meal)}
                              </span>
                              {day.meals[meal] && (
                                <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                              )}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-medium text-gray-700">
                          <div className="flex items-center gap-1.5">
                            <Activity className="w-4 h-4 text-gray-400" />
                            Activities
                          </div>
                        </label>
                        <button
                          type="button"
                          onClick={() => addActivity(index)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Activity
                        </button>
                      </div>

                      <div className="space-y-2">
                        {day.activities.map((activity, activityIndex) => (
                          <div key={activityIndex} className="flex gap-2 items-center group">
                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-[10px] font-bold text-gray-500">
                                {activityIndex + 1}
                              </span>
                            </div>
                            <input
                              type="text"
                              value={activity}
                              onChange={(e) => changeActivity(index, activityIndex, e.target.value)}
                              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
                              placeholder={`Activity ${activityIndex + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeActivity(index, activityIndex)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}