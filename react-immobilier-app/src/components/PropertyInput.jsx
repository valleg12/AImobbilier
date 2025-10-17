import React, { useState } from 'react';
import { MapPin, Euro, Home, Ruler, Calendar, Upload, X } from 'lucide-react';

const PropertyInput = ({ onPropertySubmit, onPhotosUpload }) => {
  const [propertyData, setPropertyData] = useState({
    id: '',
    address: '',
    city: '',
    postalCode: '',
    propertyType: 'appartement',
    surface: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    constructionYear: '',
    condition: 'bon'
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));
    setUploadedPhotos(prev => [...prev, ...newPhotos]);
    onPhotosUpload([...uploadedPhotos, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = uploadedPhotos.filter(photo => photo.id !== photoId);
    setUploadedPhotos(updatedPhotos);
    onPhotosUpload(updatedPhotos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPropertySubmit(propertyData);
  };

  return (
    <div className="card">
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-dark)' }}>
        Informations sur la propriété
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid-2">
          {/* Identifiants */}
          <div className="form-group">
            <label className="form-label">
              <Home size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              ID Propriété (ex: PROP_001)
            </label>
            <input
              type="text"
              name="id"
              value={propertyData.id}
              onChange={handleInputChange}
              className="form-input"
              placeholder="PROP_001"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <MapPin size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Adresse complète
            </label>
            <input
              type="text"
              name="address"
              value={propertyData.address}
              onChange={handleInputChange}
              className="form-input"
              placeholder="15 rue de la Paix"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Ville</label>
            <input
              type="text"
              name="city"
              value={propertyData.city}
              onChange={handleInputChange}
              className="form-input"
              placeholder="Paris"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Code postal</label>
            <input
              type="text"
              name="postalCode"
              value={propertyData.postalCode}
              onChange={handleInputChange}
              className="form-input"
              placeholder="75001"
              required
            />
          </div>

          {/* Caractéristiques */}
          <div className="form-group">
            <label className="form-label">Type de bien</label>
            <select
              name="propertyType"
              value={propertyData.propertyType}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="appartement">Appartement</option>
              <option value="maison">Maison</option>
              <option value="studio">Studio</option>
              <option value="loft">Loft</option>
              <option value="duplex">Duplex</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">
              <Ruler size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Surface (m²)
            </label>
            <input
              type="number"
              name="surface"
              value={propertyData.surface}
              onChange={handleInputChange}
              className="form-input"
              placeholder="75"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nombre de pièces</label>
            <input
              type="number"
              name="rooms"
              value={propertyData.rooms}
              onChange={handleInputChange}
              className="form-input"
              placeholder="3"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nombre de chambres</label>
            <input
              type="number"
              name="bedrooms"
              value={propertyData.bedrooms}
              onChange={handleInputChange}
              className="form-input"
              placeholder="2"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Nombre de salles de bain</label>
            <input
              type="number"
              name="bathrooms"
              value={propertyData.bathrooms}
              onChange={handleInputChange}
              className="form-input"
              placeholder="1"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Euro size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Prix (€)
            </label>
            <input
              type="number"
              name="price"
              value={propertyData.price}
              onChange={handleInputChange}
              className="form-input"
              placeholder="380000"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Calendar size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Année de construction
            </label>
            <input
              type="number"
              name="constructionYear"
              value={propertyData.constructionYear}
              onChange={handleInputChange}
              className="form-input"
              placeholder="1995"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">État général</label>
            <select
              name="condition"
              value={propertyData.condition}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="neuf">Neuf</option>
              <option value="excellent">Excellent</option>
              <option value="bon">Bon</option>
              <option value="moyen">Moyen</option>
              <option value="à_renover">À rénover</option>
            </select>
          </div>
        </div>

        {/* Upload de photos */}
        <div style={{ marginTop: '2rem' }}>
          <label className="form-label">
            <Upload size={16} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
            Photos de la propriété
          </label>
          
          <div className="photo-upload" onClick={() => document.getElementById('photo-upload').click()}>
            <Upload size={48} color="var(--text-light)" style={{ marginBottom: '1rem' }} />
            <p style={{ color: 'var(--text-medium)', marginBottom: '0.5rem' }}>
              Cliquez pour sélectionner des photos ou glissez-déposez
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>
              Formats acceptés: JPG, PNG, WEBP (max 10MB par photo)
            </p>
          </div>
          
          <input
            id="photo-upload"
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoUpload}
            style={{ display: 'none' }}
          />
          
          {uploadedPhotos.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--text-dark)' }}>
                Photos sélectionnées ({uploadedPhotos.length})
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
                {uploadedPhotos.map(photo => (
                  <div key={photo.id} style={{ position: 'relative' }}>
                    <img
                      src={photo.preview}
                      alt={photo.name}
                      style={{
                        width: '100%',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '1px solid var(--border-ecru)'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      style={{
                        position: 'absolute',
                        top: '0.5rem',
                        right: '0.5rem',
                        background: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} color="var(--text-dark)" />
                    </button>
                    <p style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-medium)', 
                      marginTop: '0.5rem',
                      textAlign: 'center',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {photo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>
          Analyser cette propriété
        </button>
      </form>
    </div>
  );
};

export default PropertyInput;
