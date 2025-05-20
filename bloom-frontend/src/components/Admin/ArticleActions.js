import React, { useState, useRef, useEffect } from 'react';

const ArticleActions = ({ article, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={dropdownRef}>
      <button onClick={() => setOpen(!open)} style={styles.kebabButton}>⋮</button>

      {open && (
        <div style={styles.dropdown}>
          <button
            style={styles.dropdownItem}
            onClick={() => {
              onUpdate(article);
              setOpen(false);
            }}
          >
            ✏️ Update
          </button>
          <button
            style={styles.dropdownItem}
            onClick={() => {
              onDelete(article);
              setOpen(false);
            }}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  kebabButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '4px 8px',
  },
  dropdown: {
    position: 'absolute',
    top: '24px',
    right: '0',
    background: '#fff',
    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
    borderRadius: '8px',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownItem: {
    padding: '8px 12px',
    background: 'none',
    border: 'none',
    textAlign: 'left',
    width: '100%',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'background 0.2s',
  },
};

export default ArticleActions;
