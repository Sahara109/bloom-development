import React, { useState, useRef, useEffect } from 'react';

const KebabMenu = ({ onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setOpen(!open);

  // Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="kebab-menu" ref={menuRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button onClick={toggleMenu} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
        &#8942; {/* Unicode vertical ellipsis (three dots) */}
      </button>
      {open && (
        <div
          className="kebab-dropdown"
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            background: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            borderRadius: '4px',
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            style={{ display: 'block', padding: '8px 16px', width: '100%', border: 'none', background: 'none', cursor: 'pointer' }}
          >
            ✏️ Update
          </button>
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            style={{ display: 'block', padding: '8px 16px', width: '100%', border: 'none', background: 'none', cursor: 'pointer', color: 'red' }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default KebabMenu;
