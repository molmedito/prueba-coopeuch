import React, {useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faDotCircle, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle, faCircle } from '@fortawesome/free-regular-svg-icons';

import InputText from "../components/input/InputText";
import Select from "../components/select/Select";

const Stepper = ({step, stepClass, stepIcon, index}) => {
    return (
        <div key={index} className={'column ' + (step.status.length > 0 ? '': 'is-hidden-mobile')}>
            <div className={`step ${stepClass}`}>
                <span className="icon">
                    <FontAwesomeIcon icon={stepIcon} />
                </span>
                <span className="text">{`${index + 1}. ${step.text}`}</span>
            </div>
        </div>
    )
}

const Paso1 = () => {
    const [isClientAdress, setIsClientAdress] = useState(false);
    const [status, setStatus] = useState(true);
    const [stepper, setStepper] = useState([
        {
            text: 'Validación Identidad',
            status: 'passed',
        },
        {
            text: 'Datos Necesarios',
            status: 'active',
        },
        {
            text: 'Firma de Contratos',
            status: ''
        },
        {
            text: 'Pago',
            status: ''
        },
        {
            text: 'Comprobante',
            status: ''
        }
    ])
    const inputEl = useRef();
    
    const moveSteps = (movement, e) => {
        e.preventDefault();
        
        let newStepper = stepper;

        if(movement) {
            const activeStep = stepper.findIndex(step => step.status === 'active');
            const nextStep = stepper.findIndex(step => step.status.length === 0);
            
            newStepper[activeStep].status = 'passed';
            newStepper[nextStep].status = 'active';
        } else {
            const activeStep = stepper.findIndex(step => step.status === 'active');
            const nextStep = (activeStep - 1) > 0 ? activeStep - 1 : 0;
            
            newStepper[activeStep].status = '';
            newStepper[nextStep].status = 'active';
        }

        setStatus(!status)
        setStepper(newStepper)
    }

    useEffect(() => {
        console.log(stepper)
    }, [stepper])

    return (
        <>
            <section className="section">
                <div className="container">
                    <div className="columns">
                        {
                            stepper.map((step, index) => {
                                let stepClass = step.status;
                                let stepIcon;

                                switch (step.status) {
                                    case 'active':
                                        stepIcon = faDotCircle;
                                        break;

                                    case 'passed':
                                        stepIcon = faCheckCircle;
                                        break;
                                    
                                    default:
                                        stepIcon = faCircle;
                                        break;
                                }

                                return <Stepper step={step} stepClass={stepClass} stepIcon={stepIcon} index={index} />
                            })
                        }
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="box">
                        <div className="columns">
                            <div className="column">
                                <h3 className="is-size-5">Datos personales</h3>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <InputText
                                    ref={inputEl}
                                    label="Nombre"
                                    name="nombre"
                                />
                            </div>
                            <div className="column">
                                <InputText
                                    ref={inputEl}
                                    label="Apellido paterno"
                                    name="apellido"
                                />
                            </div>
                            <div className="column">
                                <InputText
                                    ref={inputEl}
                                    label="Apellido materno"
                                />
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <InputText
                                    ref={inputEl}
                                    label="RUT del beneficiario"
                                    helperText="Sin puntos ni guiones"
                                />
                            </div>
                            <div className="column">
                                <Select
                                    ref={inputEl}
                                    label="Parentezco con el beneficiario"
                                    name="direccion"
                                />
                            </div>
                            <div className="column"></div>
                        </div>
                        
                        <div className="columns mt-6">
                            <div className="column">
                                <h3 className="is-size-5">¿Dónde vive el beneficiario?</h3>
                            </div>
                            <div className="column column is-flex is-justify-content-flex-end">
                                <div className="field">
                                    <span className="mr-2">Usar domicilio del Asegurado</span>
                                    <input
                                        id="switchRoundedDefault"
                                        type="checkbox"
                                        name="switchRoundedDefault"
                                        className="switch is-rounded"
                                        checked={isClientAdress}
                                        onClick={() => setIsClientAdress(!isClientAdress)}
                                    />
                                    <label htmlFor="switchRoundedDefault"></label>
                                </div>
                            </div>
                        </div>

                        { !isClientAdress && 
                            <>
                                <div className="columns">
                                    <div className="column">
                                        <Select
                                            ref={inputEl}
                                            label="Nacionalidad"
                                        />
                                    </div>
                                    <div className="column">
                                        <Select
                                            ref={inputEl}
                                            label="País de residencia"
                                        />
                                    </div>
                                    <div className="column">
                                        <Select
                                            ref={inputEl}
                                            label="Ciudad"
                                        />
                                    </div>
                                </div>

                                <div className="columns">
                                    <div className="column">
                                        <Select
                                            ref={inputEl}
                                            label="RUT del beneficiario"
                                            helperText="Comuna"
                                        />
                                    </div>
                                    <div className="column is-two-thirds">
                                        <InputText
                                            ref={inputEl}
                                            label="Dirección Particular"
                                        />
                                    </div>
                                </div>
                            </>
                        }

                        <div className="columns is-mobile mt-2">
                            <div className="column is-4 is-offset-8 is-flex is-justify-content-flex-end">
                                <button className="button is-primary">
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon={faSave} />
                                    </span>
                                    <span>Guardar y continuar</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mt-6">
                    <div className="columns">
                        <div className="column">
                            <a href="/" className="link" onClick={e => moveSteps(false, e)}>
                                <FontAwesomeIcon className="mr-1" icon={faChevronLeft} />
                                <span>Volver</span>
                            </a>
                        </div>
                        <div className="column is-flex is-justify-content-flex-end">
                            <button className="button is-primary" onClick={e => moveSteps(true, e)}>
                                <span>Continuar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Paso1
