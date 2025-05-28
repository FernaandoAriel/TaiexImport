const CardMarcas =({car})=>{
    return(   <div key={car.id} className="marca-card">
        <div className="car-image-placeholder">
          <div className="image-replacement">{car.name.charAt(0)}</div>
        </div>
        <h3>{car.name}</h3>
        <p>{car.description}</p>
        <span className="car-category">{car.category}</span>
      </div>)
}

export default CardMarcas