import React, { useState } from 'react';
import { X, Plus, AlertTriangle, Check } from 'lucide-react';
import { useCity } from '../context/CityContext';
import { DEPARTMENTS } from '../data/seedData';

export default function CreateIncidentModal() {
  const { isCreateModalOpen, setIsCreateModalOpen, createManualIncident } = useCity();

  const [formData, setFormData] = useState({
    category: 'POTHOLE',
    title: '',
    description: '',
    location: '',
    latitude: '12.9716',
    longitude: '77.5946',
    severity: 'HIGH',
    department: DEPARTMENTS.ROAD,
    status: 'Detected'
  });

  const [errors, setErrors] = useState({});

  if (!isCreateModalOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.trim()) newErrors.location = 'Location name is required';

    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);

    if (isNaN(lat) || lat < 8 || lat > 38) {
      newErrors.latitude = 'Latitude must be a valid number between 8 and 38';
    }
    if (isNaN(lng) || lng < 68 || lng > 98) {
      newErrors.longitude = 'Longitude must be a valid number between 68 and 98';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!validate()) return;

    createManualIncident(formData);
    setIsCreateModalOpen(false);
    // Reset form
    setFormData({
      category: 'POTHOLE',
      title: '',
      description: '',
      location: '',
      latitude: '12.9716',
      longitude: '77.5946',
      severity: 'HIGH',
      department: DEPARTMENTS.ROAD,
      status: 'Detected'
    });
  };

  const handleCategoryChange = e => {
    const cat = e.target.value;
    let dept = DEPARTMENTS.ROAD;
    if (cat === 'STREETLIGHT') dept = DEPARTMENTS.ELECTRICAL;
    if (cat === 'GARBAGE') dept = DEPARTMENTS.WASTE;

    setFormData(prev => ({
      ...prev,
      category: cat,
      department: dept
    }));
  };

  return (
    <div className="modal-overlay" onClick={() => setIsCreateModalOpen(false)}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="card-title">
            <Plus size={18} color="#0d9488" />
            <span>Create Manual Civic Report</span>
          </div>
          <button onClick={() => setIsCreateModalOpen(false)} className="btn-icon" style={{ border: 'none' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Category */}
            <div className="form-group">
              <label className="form-label">Issue Category *</label>
              <select
                className="form-control"
                value={formData.category}
                onChange={handleCategoryChange}
              >
                <option value="POTHOLE">Pothole & Damaged Road Hazard</option>
                <option value="STREETLIGHT">Faulty / Non-Functional Streetlight</option>
                <option value="GARBAGE">Garbage Overflow & Waste Accumulation</option>
              </select>
            </div>

            {/* Title */}
            <div className="form-group">
              <label className="form-label">Incident Title *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. Deep pothole on 80ft Road near junction"
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
              {errors.title && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.title}</div>}
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Detailed Description *</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Describe the severity, damage characteristics, and danger to public safety..."
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.description}</div>}
            </div>

            {/* Location Name */}
            <div className="form-group">
              <label className="form-label">Urban Location / Landmark *</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g. 100 Feet Road, Near Sony Signal, Koramangala"
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
              />
              {errors.location && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.location}</div>}
            </div>

            {/* GPS Coordinates Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Latitude (°N) *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.latitude}
                  onChange={e => setFormData({ ...formData, latitude: e.target.value })}
                  placeholder="12.9716"
                />
                {errors.latitude && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.latitude}</div>}
              </div>

              <div className="form-group">
                <label className="form-label">Longitude (°E) *</label>
                <input
                  type="text"
                  className="form-control"
                  value={formData.longitude}
                  onChange={e => setFormData({ ...formData, longitude: e.target.value })}
                  placeholder="77.5946"
                />
                {errors.longitude && <div style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '3px' }}>{errors.longitude}</div>}
              </div>
            </div>

            {/* Severity & Department Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div className="form-group">
                <label className="form-label">Initial Severity *</label>
                <select
                  className="form-control"
                  value={formData.severity}
                  onChange={e => setFormData({ ...formData, severity: e.target.value })}
                >
                  <option value="CRITICAL">Critical (Immediate Danger)</option>
                  <option value="HIGH">High (Substantial Hazard)</option>
                  <option value="MEDIUM">Medium (Moderate Disturbance)</option>
                  <option value="LOW">Low (Minor Surface Defect)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Department Allocation</label>
                <select
                  className="form-control"
                  value={formData.department}
                  onChange={e => setFormData({ ...formData, department: e.target.value })}
                >
                  {Object.values(DEPARTMENTS).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="btn btn-secondary btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
            >
              <Check size={14} />
              Register Incident
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
