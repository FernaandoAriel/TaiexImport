import React from "react";
import '../pages/public/css/TerminosYCondiciones.css';

export default function TerminosYCondiciones() {
    return (
        <div className="terminos-page">
            <div className="terminos-container">
                <h1 className="terminos-title">TÉRMINOS & CONDICIONES</h1>

                <div className="terminos-content">
                    <h3 className="terminos-subtitle">Uso del Sitio Web</h3>
                    <p className="terminos-text">
                        El uso de este sitio web es bajo su propia responsabilidad. Taiex Import no garantiza que el sitio esté libre de errores o interrupciones que puedan afectar su experiencia o su dispositivo.
                    </p>
                    <p className="terminos-text">
                        Taiex Import tampoco asegura que la información presentada esté actualizada en el momento de su visita. La empresa no se hace responsable de pérdidas o daños derivados del uso de este sitio web.
                    </p>

                    <h3 className="terminos-subtitle">Productos y Precios</h3>
                    <p className="terminos-text">
                        Taiex Import trabaja continuamente para mejorar sus productos y servicios, por lo que la información publicada en este sitio está sujeta a cambios sin previo aviso.
                    </p>
                    <p className="terminos-text">
                        Las imágenes y descripciones de los productos son referenciales y pueden no coincidir exactamente con las especificaciones o características disponibles en el mercado nacional. La empresa se reserva el derecho de modificar cualquier detalle sin previo aviso.
                    </p>
                    <p className="terminos-text">
                        Si necesita información más detallada, le recomendamos contactar con un asesor oficial de Taiex Import.
                    </p>
                    <p className="terminos-text">
                        Los colores de los vehículos mostrados en el sitio pueden variar respecto a los colores reales debido a las diferencias en la visualización en pantalla.
                    </p>
                    <p className="terminos-text">
                        Los precios publicados están en dólares estadounidenses (USD) y tienen carácter referencial, por lo que no constituyen una oferta comercial definitiva. Además, algunas promociones pueden estar disponibles solo por tiempo limitado y bajo condiciones específicas, las cuales serán detalladas en cada caso.
                    </p>
                </div>
            </div>
        </div>
    );
}