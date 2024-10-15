import "../../styles/payment/inputPan.css"


interface InputPanInterface {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const InputPan: React.FC<InputPanInterface> = ({label, value, onChange}) => {
    return (
        <div className="info-pan-input">
            <div className="info-pan-input-content">
                <p className="info-pan-input-label">{label}</p>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="input-pan-default-text"
                    placeholder="0000 0000"
                />
            </div>
        </div>
    );
}