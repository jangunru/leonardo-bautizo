import React, { useState } from 'react';
import './RSVPForm.css';

const RSVP = () => {
    const [attendees, setAttendees] = useState(1);
    const [names, setNames] = useState(['']);
    const [confirmation, setConfirmation] = useState('yes');
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState(null);
    const [sendStatus, setSendStatus] = useState({ show: false, success: null });
    const [isLoading, setIsLoading] = useState(false);

    // 👉 Replace with your WhatsApp number (country code + number, no + or spaces)
    const whatsappNumber = '5563684612';

    const handleAttendeesChange = (e) => {
        const count = parseInt(e.target.value);
        setAttendees(count);

        const updatedNames = [...names];
        while (updatedNames.length < count) updatedNames.push('');
        while (updatedNames.length > count) updatedNames.pop();

        setNames(updatedNames);
    };

    const handleNameChange = (index, value) => {
        const updatedNames = [...names];
        updatedNames[index] = value;
        setNames(updatedNames);
    };

    const handleConfirmationChange = (e) => {
        const value = e.target.value;
        setConfirmation(value);
        setAttendees(1);
        setNames(['']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            confirmation: confirmation === 'yes' ? 'Sí' : 'No',
            attendees: confirmation === 'yes' ? attendees : 'No aplica',
            names: names.join(', ')
        };

        setFormData(data);
        setShowModal(true);
    };

    const sendWhatsApp = () => {
        setIsLoading(true);

        try {
            const message = `
🎉 *Nueva Confirmación RSVP* 🎉

✅ Asistencia: ${formData.confirmation}
👥 Número de asistentes: ${formData.attendees}
📝 Nombres: ${formData.names}
            `;

            const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

            window.open(url, '_blank');

            setSendStatus({ show: true, success: true });
        } catch (error) {
            console.error(error);
            setSendStatus({ show: true, success: false });
        }

        setShowModal(false);
        setIsLoading(false);
    };

    return (
        <div className="rsvp-container-1">
            <div className="rsvp-container">
                <p className="font-edu-1">
                    <strong>Confirmación de Asistencia</strong>
                </p>

                <form className="form-style" onSubmit={handleSubmit}>
                    <label htmlFor="confirmation">¿Asistirá?</label>

                    <div className="confirmation-options">
                        <label>
                            <input
                                type="radio"
                                name="confirmation"
                                value="yes"
                                checked={confirmation === 'yes'}
                                onChange={handleConfirmationChange}
                            />
                            Sí
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="confirmation"
                                value="no"
                                checked={confirmation === 'no'}
                                onChange={handleConfirmationChange}
                            />
                            No
                        </label>
                    </div>

                    {confirmation === 'yes' && (
                        <>
                            <label htmlFor="attendees">
                                Número de asistentes:
                            </label>

                            <select
                                id="attendees"
                                value={attendees}
                                onChange={handleAttendeesChange}
                            >
                                {[...Array(5).keys()].map((i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>

                            {names.map((name, index) => (
                                <div key={index} className="attendee-name">
                                    <label htmlFor={`name-${index}`}>
                                        Nombre del asistente {index + 1}:
                                    </label>

                                    <input
                                        type="text"
                                        id={`name-${index}`}
                                        value={name}
                                        onChange={(e) =>
                                            handleNameChange(
                                                index,
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>
                            ))}
                        </>
                    )}

                    {confirmation === 'no' && (
                        <div className="attendee-name">
                            <label htmlFor="name-0">Nombre:</label>

                            <input
                                type="text"
                                id="name-0"
                                value={names[0]}
                                onChange={(e) =>
                                    handleNameChange(0, e.target.value)
                                }
                                required
                            />
                        </div>
                    )}

                    <button type="submit">
                        Enviar Confirmación
                    </button>
                </form>
            </div>

            {/* Modal Confirmación */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Confirmación de Asistencia</h3>

                        <p>
                            <strong>Asistencia:</strong>{' '}
                            {formData.confirmation}
                        </p>

                        <p>
                            <strong>Número de asistentes:</strong>{' '}
                            {formData.attendees}
                        </p>

                        <p><strong>Nombres:</strong></p>

                        <ul className="centered-list">
                            {names.map((name, index) => (
                                <li key={index}>{name}</li>
                            ))}
                        </ul>

                        <div className="modal-buttons">
                            <button
                                className="confirm-button"
                                onClick={sendWhatsApp}
                                disabled={isLoading}
                            >
                                {isLoading
                                    ? 'Enviando...'
                                    : 'Confirmar por WhatsApp'}
                            </button>

                            <button
                                className="cancel-button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Status Modal */}
            {sendStatus.show && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        {sendStatus.success ? (
                            <p>
                                ¡Gracias! Se abrió WhatsApp con tu confirmación.
                            </p>
                        ) : (
                            <p>
                                Hubo un problema al abrir WhatsApp.
                            </p>
                        )}

                        <button
                            className="confirm-button"
                            onClick={() =>
                                setSendStatus({
                                    show: false,
                                    success: null
                                })
                            }
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RSVP;