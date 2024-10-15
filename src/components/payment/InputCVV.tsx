import "../../styles/payment/inputCVV.css"


interface InputInterface {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const InputCVV: React.FC<InputInterface> = ({label, value, onChange}) => {
    return (
        <div className="info-cvv-input">
            <div className="info-cvv-input-content">
                <p className="info-cvv-input-label">{label}</p>
                <input
                    type="password"
                    value={value}
                    onChange={onChange}
                    className="input-cvv-default-text"
                    placeholder="***"
                />
            </div>
        </div>
    );
}