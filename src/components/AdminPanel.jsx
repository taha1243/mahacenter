import React, { useState, useEffect } from 'react';

export default function AdminPanel({ onLogout }) {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get API URL - with explicit logging
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  
  console.log('🏥 NEW AdminPanel component rendered at', new Date().toLocaleTimeString());
  console.log('🌐 Using API URL:', API_URL);
  console.log('🌐 Environment VITE_API_URL:', import.meta.env.VITE_API_URL);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('📡 Fetching reservations from:', `${API_URL}/api/reservations`);
      
      const response = await fetch(`${API_URL}/api/reservations`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Reservations loaded successfully:', data.length, 'items');
      setReservations(data);
      
    } catch (err) {
      console.error('❌ Error loading reservations:', err);
      setError(`Erreur de connexion: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id, newStatus) => {
    try {
      console.log('📡 Updating reservation', id, 'to status:', newStatus);
      
      const response = await fetch(`${API_URL}/api/reservations/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      console.log('✅ Reservation status updated successfully');
      loadReservations(); // Reload the list
      
    } catch (err) {
      console.error('❌ Error updating reservation:', err);
      alert(`Erreur lors de la mise à jour: ${err.message}`);
    }
  };

  const deleteReservation = async (id, reservationName) => {
    // Confirmation dialog
    const confirmDelete = window.confirm(
      `⚠️ Êtes-vous sûr de vouloir supprimer définitivement la réservation de "${reservationName}" ?\n\nCette action ne peut pas être annulée.`
    );
    
    if (!confirmDelete) {
      return;
    }

    try {
      console.log('🗑️ Deleting reservation', id);
      
      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      console.log('✅ Reservation deleted successfully');
      alert(`✅ Réservation de "${reservationName}" supprimée avec succès`);
      loadReservations(); // Reload the list
      
    } catch (err) {
      console.error('❌ Error deleting reservation:', err);
      alert(`❌ Erreur lors de la suppression: ${err.message}`);
    }
  };

  const handleLogout = () => {
    console.log('🚪 Logout button clicked');
    onLogout();
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          marginBottom: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ color: '#2563eb', margin: 0 }}>🦷 Admin Panel - Centre Dentaire Dr Maha</h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc2626',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            🚪 Déconnexion
          </button>
        </div>

        {/* API Connection Status */}
        <div style={{
          backgroundColor: 'white',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #e5e7eb'
        }}>
          <p style={{ margin: '0', fontSize: '14px' }}>
            <strong>API URL:</strong> <code>{API_URL}</code>
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <p>🔄 Chargement des réservations...</p>
          </div>
        ) : error ? (
          <div style={{
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '10px',
            textAlign: 'center'
          }}>
            <div style={{
              backgroundColor: '#fee2e2',
              color: '#dc2626',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <p style={{ margin: '0 0 10px 0' }}>❌ {error}</p>
              <button
                onClick={loadReservations}
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                🔄 Réessayer
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}>
              <h2 style={{ margin: 0 }}>📋 Réservations ({reservations.length})</h2>
              <button
                onClick={loadReservations}
                style={{
                  backgroundColor: '#059669',
                  color: 'white',
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                🔄 Actualiser
              </button>
            </div>

            {reservations.length === 0 ? (
              <p style={{ textAlign: 'center', color: '#64748b', padding: '40px' }}>
                Aucune réservation trouvée
              </p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>ID</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Nom</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Téléphone</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Date</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Statut</th>
                      <th style={{ padding: '12px', textAlign: 'left', border: '1px solid #e5e7eb' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          {reservation.id}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          {reservation.name}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          {reservation.phone}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          {reservation.email}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          {reservation.preferred_date || 'Non spécifiée'}
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          <span style={{
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500',
                            backgroundColor: reservation.status === 'confirmed' ? '#dcfce7' : 
                                           reservation.status === 'cancelled' ? '#fee2e2' : '#fef3c7',
                            color: reservation.status === 'confirmed' ? '#166534' :
                                   reservation.status === 'cancelled' ? '#dc2626' : '#92400e'
                          }}>
                            {reservation.status === 'pending' ? 'En attente' :
                             reservation.status === 'confirmed' ? 'Confirmé' :
                             reservation.status === 'cancelled' ? 'Annulé' : reservation.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', border: '1px solid #e5e7eb' }}>
                          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                            <select
                              value={reservation.status}
                              onChange={(e) => updateReservationStatus(reservation.id, e.target.value)}
                              style={{
                                padding: '4px 8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '12px',
                                minWidth: '100px'
                              }}
                            >
                              <option value="pending">En attente</option>
                              <option value="confirmed">Confirmé</option>
                              <option value="cancelled">Annulé</option>
                            </select>
                            <button
                              onClick={() => deleteReservation(reservation.id, reservation.name)}
                              style={{
                                backgroundColor: '#dc2626',
                                color: 'white',
                                padding: '4px 8px',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '11px',
                                fontWeight: '500'
                              }}
                              title={`Supprimer la réservation de ${reservation.name}`}
                            >
                              🗑️ Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}