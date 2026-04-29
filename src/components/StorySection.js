import React from "react";
import './StorySection.css';

const StorySection = () => {


    return (
        <div className="story-section">
            <p className="font-edu-1"><strong>¡¡Mi bautizo!!</strong></p>
            <p className="font-edu-1"><strong>Leonardo HJ</strong></p>
            <p className="font-edu">Como una pequeña gota de agua que se une al océano de tu amor, hoy comienzo mi vida en Cristo Señor, toma mi mano y enséñame a caminar siempre hacia ti, rodeado del cariño de quienes hoy celebran mi encuentro contigo.</p>
            <p className="font-edu">Acompáñanos en este día tan especial ,en que recibo mi sacramento con la bendición de Dios.</p>
            <div className="venue-info">
                <p> <strong>25 de Julio de 2026</strong> </p>
                <div className="icon-columns">
                    <div className="icon-column">
                        <img src="/images/iglesia.png" alt="Ceremony Icon" className="icon" />
                        <p>Ceremonia</p>
                        <p>3:00 pm</p>
                        <br></br>
                        <p> Capilla</p>
                        <p>San Fco de Asis</p>
                        <a
                            href="https://maps.app.goo.gl/bDpWUETqydnpX3Fu9"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-button"
                        >
                            Ubicación
                        </a>
                    </div>
                    <div className="icon-column">
                        <img src="/images/recepcion2.png" alt="Reception Icon" className="icon" />
                        <p>Recepción</p>
                        <p>4:00 pm</p>
                        <br></br>
                        <p> _</p>
                        <p> Salon Azteca</p>
                        <a
                            href="https://maps.app.goo.gl/HuB4G8WatSDqEAME7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="location-button"
                        >
                            Ubicación
                        </a>
                    </div>
                </div>
               
            </div>
        </div >
    );
};

export default StorySection;
