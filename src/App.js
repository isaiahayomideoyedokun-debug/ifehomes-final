import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

// Premium OAU Theme Stylesheet
const styles = {
  container: {
    fontFamily: "'Cabinet Grotesk', 'Inter', sans-serif",
    backgroundColor: '#030712',
    color: '#f3f4f6',
    minHeight: '100vh',
    padding: '24px',
  },
  header: {
    background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
    padding: '32px',
    borderRadius: '24px',
    border: '1px solid #1e40af',
    boxShadow: '0 20px 40px -15px rgba(30, 58, 138, 0.5)',
    marginBottom: '32px',
    textAlign: 'center',
  },
  title: {
    fontSize: '42px',
    fontWeight: '900',
    color: '#fbbf24',
    margin: '0 0 8px 0',
    letterSpacing: '-1px',
  },
  subtitle: {
    color: '#93c5fd',
    fontSize: '16px',
    margin: 0,
    fontWeight: '500',
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '32px',
    flexWrap: 'wrap',
  },
  tabBtn: {
    padding: '12px 24px',
    borderRadius: '14px',
    border: '1px solid #374151',
    background: '#111827',
    color: '#9ca3af',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
  activeTabBtn: {
    padding: '12px 24px',
    borderRadius: '14px',
    border: 'none',
    background: '#fbbf24',
    color: '#030712',
    cursor: 'pointer',
    fontWeight: '800',
    boxShadow: '0 4px 14px rgba(251, 191, 36, 0.4)',
  },
  actionBtn: {
    padding: '12px 24px',
    borderRadius: '14px',
    border: 'none',
    background: '#10b981',
    color: '#fff',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
  },
  searchBar: {
    width: '100%',
    maxWidth: '500px',
    padding: '14px 20px',
    borderRadius: '14px',
    border: '1px solid #374151',
    background: '#111827',
    color: '#fff',
    fontSize: '16px',
    display: 'block',
    margin: '0 auto 32px auto',
    outline: 'none',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
    gap: '28px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: '#111827',
    border: '1px solid #1f2937',
    borderRadius: '20px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s ease, border-color 0.2s ease',
  },
  mediaWrapper: {
    width: '100%',
    height: '200px',
    borderRadius: '14px',
    overflow: 'hidden',
    backgroundColor: '#1f2937',
    marginBottom: '16px',
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  badge: {
    padding: '4px 10px',
    background: '#1e3a8a',
    color: '#93c5fd',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    width: 'fit-content',
    marginBottom: '12px',
    textTransform: 'uppercase',
  },
  genderBadge: {
    padding: '4px 10px',
    background: '#581c87',
    color: '#f3e8ff',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    width: 'fit-content',
    marginBottom: '12px',
  },
  amenityBadge: {
    padding: '4px 8px',
    background: '#1f2937',
    color: '#d1d5db',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    marginRight: '6px',
    marginBottom: '6px',
    display: 'inline-block',
  },
  primaryBtn: {
    display: 'block',
    textAlign: 'center',
    padding: '12px',
    background: '#1e40af',
    color: '#fff',
    borderRadius: '10px',
    textDecoration: 'none',
    fontWeight: '700',
    marginTop: '16px',
    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.3)',
  },
  rentedBtn: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    padding: '10px',
    background: '#b91c1c',
    color: '#fff',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    fontSize: '13px',
    cursor: 'pointer',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(185, 28, 28, 0.2)',
    transition: 'background-color 0.2s',
  },
  formCard: {
    background: '#111827',
    border: '1px solid #1f2937',
    borderRadius: '24px',
    padding: '32px',
    maxWidth: '500px',
    margin: '0 auto',
    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#9ca3af',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px',
    background: '#030712',
    border: '1px solid #374151',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '15px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  checkboxWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },
};

// Global Fetch Interceptor for Supabase
const supabaseFetch = async (endpoint, options = {}) => {
  const url = `${SUPABASE_URL}/${endpoint}`;
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    ...options.headers,
  };
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    const txt = await response.text();
    throw new Error(txt || 'Database execution failure');
  }
  return (response.status === 204 || response.status === 201) ? null : response.json();
};

export default function App() {
  const [view, setView] = useState('houses');
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState([]);
  const [roommates, setRoommates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
const [myListings, setMyListings] = useState([]);
const [isViewingMyListings, setIsViewingMyListings] = useState(false);

  // Forms State
  const [houseForm, setHouseForm] = useState({
    title: '',
    location: '',
    price: '',
    phone: '',
    rules: '',
    imageUrl: '',
    light: false,
    meter: false,
    water: false,
  });
  const [roommateForm, setRoommateForm] = useState({
    name: '',
    dept: '',
    gender: 'Male',
    budget: '',
    lifestyle: '',
    phone: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchData();
  }, [view]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (view === 'houses') {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .order('id', { ascending: false });
  
        if (error) throw error;
        setListings((data || []).filter((item) => item.status !== 'Rented'));
      } else if (view === 'roommates') {
        const { data, error } = await supabase
          .from('roommates')
          .select('*')
          .order('id', { ascending: false });
  
        if (error) throw error;
        setRoommates((data || []).filter((item) => item.status !== 'Rented'));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkHouseRented = async (id, originalPhone) => {
    const inputPhone = window.prompt(
      '🔒 Security Verification:\nPlease enter the phone number used to create this listing to mark it as rented:'
    );

    // If they hit cancel or leave it blank, stop here
    if (inputPhone === null) return;

    // Verify the phone number matches the database
    if (inputPhone.trim() !== originalPhone?.trim()) {
      alert(
        '❌ Error: The phone number you entered does not match the owner of this listing.'
      );
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase
        .from('listings')
        .update({ 
          status: 'Rented',
          rented_at: new Date().toISOString() 
        })
        .eq('id', id);
  
      if (error) throw error;
      
      alert('🔒 House listing successfully removed from market!');
      fetchData();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Update failed: " + err.message);
    } finally {
      setLoading(false);
    }

  const handleMarkRoommateRented = async (id, storedPhone) => {
    const inputPhone = window.prompt("Security Check: Enter the phone number used to create this card:");
    
    if (inputPhone === null) return;
  
    // 1. Helper function to normalize numbers
    const normalize = (phone) => {
      let p = phone.toString().trim();
      // If it starts with 0, replace 0 with 234
      if (p.startsWith('0')) {
        return '234' + p.substring(1);
      }
      return p;
    };
  
    // 2. Compare the normalized versions of both numbers
    if (normalize(inputPhone) === normalize(storedPhone)) {
      try {
        setLoading(true);
        const { error } = await supabase
          .from('roommates')
          .update({ 
            status: 'Rented',
            rented_at: new Date().toISOString() 
          })
          .eq('id', id);
    
        if (error) throw error;
    
        alert('🔒 Roommate listing successfully removed from market!');
        fetchData();
      } catch (err) {
        console.error("Error updating status:", err);
        alert("Update failed: " + err.message);
      }
    } else {
      alert("Incorrect phone number! Access denied.");
    }
  };
  const fetchMyListings = async () => {
    const normalizedPhone = phoneInput.trim().startsWith('0') ? '234' + phoneInput.trim().substring(1) : phoneInput.trim();
    const { data, error } = await supabase.from('roommates').select('*').eq('phone', normalizedPhone);
    if (error) {
      alert("Error fetching: " + error.message);
    } else if (data.length === 0) {
      alert("No listings found for this number.");
    } else {
      setMyListings(data);
      setIsViewingMyListings(true);
    }
  };

  const handleMediaUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploading(true);
      const ext = file.name.split('.').pop();
      const path = `${Math.random()}.${ext}`;

      const fd = new FormData();
      fd.append('cacheControl', '3600');
      fd.append('', file);

      await supabaseFetch(`storage/v1/object/house-media/${path}`, {
        method: 'POST',
        body: fd,
      });

      const url = `${SUPABASE_URL}/storage/v1/object/public/house-media/${path}`;
      if (type === 'house') setHouseForm((p) => ({ ...p, imageUrl: url }));
      else setRoommateForm((p) => ({ ...p, imageUrl: url }));
      alert('Media attached successfully!');
    } catch (err) {
      alert('Upload error: check storage configurations');
    } finally {
      setUploading(false);
    }
  };

  const handleHouseSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabaseFetch('rest/v1/listings', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify({
          title: houseForm.title,
          location: houseForm.location,
          price: parseFloat(houseForm.price),
          phone: houseForm.phone,
          rules: houseForm.rules,
          image_url: houseForm.imageUrl,
          status: 'Available',
          amenities: [
            houseForm.light && '💡 24/7 Power',
            houseForm.meter && '⚡ Private Meter',
            houseForm.water && '🚰 Water Supply',
          ].filter(Boolean),
        }),
      });
      alert('Accommodation published!');
      setHouseForm({
        title: '',
        location: '',
        price: '',
        phone: '',
        rules: '',
        imageUrl: '',
        light: false,
        meter: false,
        water: false,
      });
      setView('houses');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleRoommateSubmit = async (e) => {
    e.preventDefault();
    try {
      await supabaseFetch('rest/v1/roommates', {
        method: 'POST',
        body: JSON.stringify({
          name: roommateForm.name,
          dept: roommateForm.dept,
          gender: roommateForm.gender,
          budget: roommateForm.budget,
          lifestyle: roommateForm.lifestyle,
          phone: roommateForm.phone,
          status: 'Available',
          image_url: roommateForm.imageUrl,
        }),
      });
      alert('Roommate profile published!');
      setRoommateForm({
        name: '',
        dept: '',
        gender: 'Male',
        budget: '',
        lifestyle: '',
        phone: '',
        imageUrl: '',
      });
      setView('roommates');
    } catch (err) {
      alert(err.message);
    }
  };

  const isVideo = (url) =>
    url && url.match(/\.(mp4|webm|ogg|mov|MOV|MP4)/) !== null;

  const filteredHouses = listings.filter(
    (h) =>
      (h.title && h.title.toLowerCase().includes(search.toLowerCase())) ||
      (h.location && h.location.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredRoommates = roommates.filter(
    (r) =>
      (r.name && r.name.toLowerCase().includes(search.toLowerCase())) ||
      (r.dept && r.dept.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🏛️ IfeHomes</h1>
        <p style={styles.subtitle}>
          The Premium OAU Off-Campus Housing & Roommate Finder Network
        </p>
      </header>
      <div style={{ margin: '20px', padding: '20px', background: '#f4f4f4' }}>
  <h3>View My Listings</h3>
  <input 
    type="text" 
    placeholder="Enter your phone number" 
    value={phoneInput}
    onChange={(e) => setPhoneInput(e.target.value)} 
  />
  <button onClick={fetchMyListings}>Search</button>
  {isViewingMyListings && (
    <button onClick={() => setIsViewingMyListings(false)}>Back to All</button>
  )}
</div>

      <div style={styles.tabsContainer}>
        <button
          style={view === 'houses' ? styles.activeTabBtn : styles.tabBtn}
          onClick={() => setView('houses')}
        >
          Find Houses
        </button>
        <button
          style={view === 'roommates' ? styles.activeTabBtn : styles.tabBtn}
          onClick={() => setView('roommates')}
        >
          Find Roommates
        </button>
        <button
          style={styles.actionBtn}
          onClick={() =>
            setView(
              view === 'houses' || view === 'add-house'
                ? 'add-house'
                : 'add-roommate'
            )
          }
        >
          {view === 'houses' || view === 'add-house'
            ? '+ Post Property'
            : '+ Join Directory'}
        </button>
      </div>

      {(view === 'houses' || view === 'roommates') && (
        <input
          style={styles.searchBar}
          type="text"
          placeholder={`Search by location, title or dept...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}

      {loading && (
        <div
          style={{
            textAlign: 'center',
            color: '#fbbf24',
            padding: '40px',
            fontWeight: '700',
          }}
        >
          Fetching live records...
        </div>
      )}

      {!loading && view === 'houses' && (
        <div style={styles.grid}>
          {filteredHouses.map((item) => (
            <div key={item.id} style={styles.card}>
              <div>
                <div style={styles.mediaWrapper}>
                  {item.image_url ? (
                    isVideo(item.image_url) ? (
                      <video
                        src={item.image_url}
                        controls
                        style={styles.media}
                        muted
                      />
                    ) : (
                      <img
                        src={item.image_url}
                        alt="Space"
                        style={styles.media}
                      />
                    )
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#4b5563',
                      }}
                    >
                      🏠 No Media Walkthrough
                    </div>
                  )}
                </div>
                <div style={styles.badge}>
                  📍 {item.location || 'OAU Campus'}
                </div>
                <h3 style={{ margin: '4px 0 8px 0', fontSize: '18px' }}>
                  {item.title || 'Accommodation'}
                </h3>
                <p
                  style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    color: '#fbbf24',
                    margin: '0 0 12px 0',
                  }}
                >
                  ₦{(item.price || 0).toLocaleString()}
                  <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                    /yr
                  </span>
                </p>
                <div>
                  {item.amenities &&
                    item.amenities.map((a, i) => (
                      <span key={i} style={styles.amenityBadge}>
                        {a}
                      </span>
                    ))}
                </div>
                {item.rules && (
                  <p
                    style={{
                      fontSize: '12px',
                      background: '#1f2937',
                      padding: '8px',
                      borderRadius: '6px',
                      color: '#ef4444',
                    }}
                  >
                    ⚠️ {item.rules}
                  </p>
                )}
              </div>
              <div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
  <a href={`tel:${item.phone}`} style={styles.primaryBtn}>
    📞 Call
  </a>

  <a 
    href={`https://wa.me/${item.phone.startsWith('0') ? '234' + item.phone.slice(1) : item.phone}`} 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ ...styles.primaryBtn, backgroundColor: '#25D366' }}
  >
    WhatsApp
  </a>
</div>
                <button
                  onClick={() => handleMarkHouseRented(item.id, item.phone)}
                  style={styles.rentedBtn}
                >
                  🚫 Mark as Rented
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && view === 'roommates' && (
        <div style={styles.grid}>
          {(isViewingMyListings ? myListings : filteredRoommates).map((item) => (
            <div key={item.id} style={styles.card}>
              <div>
                <div
                  style={{
                    ...styles.mediaWrapper,
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    margin: '0 auto 16px auto',
                  }}
                >
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt="Profile"
                      style={styles.media}
                    />
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '40px',
                        background: '#1f2937',
                      }}
                    >
                      👤
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={styles.genderBadge}>
                    🧬 {item.gender || 'Not Specified'}
                  </div>
                </div>
                <h3
                  style={{
                    textCenter: 'center',
                    margin: '4px 0 12px 0',
                    textAlign: 'center',
                  }}
                >
                  {item.name || 'Anonymous Student'}
                </h3>
                <div
                  style={{
                    background: '#030712',
                    padding: '12px',
                    borderRadius: '10px',
                    fontSize: '14px',
                  }}
                >
                  <p style={{ margin: '0 0 6px 0' }}>
                    <strong>Dept:</strong> {item.dept || 'N/A'}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Budget:</strong> ₦{item.budget || 'N/A'}
                  </p>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#9ca3af',
                    fontStyle: 'italic',
                    textAlign: 'center',
                    margin: '12px 0',
                  }}
                >
                  "{item.lifestyle || 'No preference stated'}"
                </p>
              </div>
              <div>
                <a
                  href={`https://wa.me/${item.phone}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    ...styles.primaryBtn,
                    background: '#10b981',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  💬 WhatsApp
                </a>
                <button
                  onClick={() => handleMarkRoommateRented(item.id, item.phone)}
                  style={styles.rentedBtn}
                >
                  🚫 Mark Filled
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {view === 'add-house' && (
        <div style={styles.formCard}>
          <h2 style={{ margin: '0 0 20px 0', color: '#fbbf24' }}>
            List an Accommodation
          </h2>
          <form onSubmit={handleHouseSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Headline Title</label>
              <input
                style={styles.input}
                type="text"
                value={houseForm.title}
                onChange={(e) =>
                  setHouseForm({ ...houseForm, title: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Location Area</label>
              <input
                style={styles.input}
                type="text"
                value={houseForm.location}
                onChange={(e) =>
                  setHouseForm({ ...houseForm, location: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Price (₦)</label>
              <input
                style={styles.input}
                type="number"
                value={houseForm.price}
                onChange={(e) =>
                  setHouseForm({ ...houseForm, price: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Contact Phone</label>
              <input
                style={styles.input}
                type="tel"
                value={houseForm.phone}
                onChange={(e) =>
                  setHouseForm({ ...houseForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div
              style={{
                ...styles.formGroup,
                background: '#030712',
                padding: '12px',
                borderRadius: '10px',
              }}
            >
              <span style={styles.label}>Infrastructure Badges</span>
              <div style={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={houseForm.light}
                  onChange={(e) =>
                    setHouseForm({ ...houseForm, light: e.target.checked })
                  }
                />
                <span style={{ fontSize: '14px' }}>
                  💡 Constant Light / Solar
                </span>
              </div>
              <div style={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={houseForm.meter}
                  onChange={(e) =>
                    setHouseForm({ ...houseForm, meter: e.target.checked })
                  }
                />
                <span style={{ fontSize: '14px' }}>⚡ Prepaid Meter</span>
              </div>
              <div style={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  checked={houseForm.water}
                  onChange={(e) =>
                    setHouseForm({ ...houseForm, water: e.target.checked })
                  }
                />
                <span style={{ fontSize: '14px' }}>🚰 Borehole Water</span>
              </div>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Rules Notice (Optional)</label>
              <input
                style={styles.input}
                type="text"
                value={houseForm.rules}
                onChange={(e) =>
                  setHouseForm({ ...houseForm, rules: e.target.value })
                }
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Room Walkthrough</label>
              <input
                style={styles.input}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => handleMediaUpload(e, 'house')}
              />
              {uploading && (
                <p style={{ color: '#fbbf24', fontSize: '12px' }}>
                  Uploading file binary packages...
                </p>
              )}
            </div>
            <button
              style={{
                ...styles.tabBtn,
                background: '#fbbf24',
                color: '#000',
                width: '100%',
                fontWeight: '800',
                border: 'none',
              }}
              type="submit"
              disabled={uploading}
            >
              Publish Accommodation
            </button>
          </form>
        </div>
      )}

      {view === 'add-roommate' && (
        <div style={styles.formCard}>
          <h2 style={{ margin: '0 0 20px 0', color: '#fbbf24' }}>
            Roommate Directory
          </h2>
          <form onSubmit={handleRoommateSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Your Full Name</label>
              <input
                style={styles.input}
                type="text"
                value={roommateForm.name}
                onChange={(e) =>
                  setRoommateForm({ ...roommateForm, name: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Department</label>
              <input
                style={styles.input}
                type="text"
                value={roommateForm.dept}
                onChange={(e) =>
                  setRoommateForm({ ...roommateForm, dept: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Gender Identity</label>
              <select
                style={styles.input}
                value={roommateForm.gender}
                onChange={(e) =>
                  setRoommateForm({ ...roommateForm, gender: e.target.value })
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Target Budget Range</label>
              <input
                style={styles.input}
                type="text"
                placeholder="e.g. 150k"
                value={roommateForm.budget}
                onChange={(e) =>
                  setRoommateForm({ ...roommateForm, budget: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Habits / Lifestyle</label>
              <input
                style={styles.input}
                type="text"
                value={roommateForm.lifestyle}
                onChange={(e) =>
                  setRoommateForm({
                    ...roommateForm,
                    lifestyle: e.target.value,
                  })
                }
                required
              />
            </div>
            <div style={{ ...styles.formGroup, marginBottom: '20px' }}>
              <label style={styles.label}>
                WhatsApp Number (e.g. 23480...)
              </label>
              <input
                style={styles.input}
                type="tel"
                value={roommateForm.phone}
                onChange={(e) =>
                  setRoommateForm({ ...roommateForm, phone: e.target.value })
                }
                required
              />
            </div>
            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Profile Photo</label>
              <input
                style={styles.input}
                type="file"
                accept="image/*"
                onChange={(e) => handleMediaUpload(e, 'roommate')}
              />
              {uploading && (
                <p style={{ color: '#fbbf24', fontSize: '12px' }}>
                  Uploading identity matrix...
                </p>
              )}
            </div>
            <button
              style={{
                ...styles.tabBtn,
                background: '#fbbf24',
                color: '#000',
                width: '100%',
                fontWeight: '800',
                border: 'none',
              }}
              type="submit"
              disabled={uploading}
            >
              Join Directory
            </button>
          </form>
        </div>
      
      )}
    
  

