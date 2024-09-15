import React, { useState } from 'react';
import { usePatota } from '../../contexts/PatotaContext';
import FormatValue from '../format-value';

const SavedMoneyEditor = () => {
  const { savedMoney, updateSavedMoneyValue, loading } = usePatota();
  const [isEditing, setIsEditing] = useState(false);
  const [newSavedMoney, setNewSavedMoney] = useState(savedMoney);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (updateSavedMoneyValue) {
      updateSavedMoneyValue(savedMoney ?? 0); 
      setIsEditing(false);
    } else {
      console.error('updateSavedMoneyValue is undefined');
    }
  };

  return (
    <div className='card-row'>
      <span className='card-value'>
        {isEditing ? (
          <input
            type="number"
            value={newSavedMoney}
            onChange={(e) => setNewSavedMoney(Number(e.target.value))}
            disabled={loading}
          />
        ) : (
          <FormatValue value={savedMoney ?? 0} />
        )}
      </span>
      {isEditing ? (
        <button className="button-container" onClick={handleSaveClick} disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      ) : (
        <button className="button-container" onClick={handleEditClick}>Editar</button>
      )}
    </div>
  );
};

export default SavedMoneyEditor;
