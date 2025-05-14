import React from 'react';
import './css/Marcas.css';

export default function MarcasLayout({ title, children }) {
  return (
    <div className="page-container">
      <div className="content-wrap">
        <main className="marcas-container">
          <h1 className="marcas-title">{title}</h1>
          {children}
        </main>
      </div>

      <footer className="marcas-footer">
        <p>© {new Date().getFullYear()} Catálogo Nissan - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}