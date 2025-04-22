import React from 'react';

function TarifaDinamica({ precioBase, temporada }) {
  const ajusteTemporada =
    temporada === 'alta' ? precioBase * 0.2 :
    temporada === 'media' ? precioBase * 0.1 :
    0;

  return (
    <span>${precioBase + ajusteTemporada}</span>
  );
}

export default TarifaDinamica;
