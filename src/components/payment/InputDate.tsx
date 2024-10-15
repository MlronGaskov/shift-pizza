import "../../styles/payment/inputDate.css"


interface InputInterface {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const InputDate: React.FC<InputInterface> = ({label, value, onChange}) => {
    return (
        <div className="info-date-input">
            <div className="info-date-input-content">
                <p className="info-date-input-label">{label}</p>
                <input
                    type="text"
                    value={value}
                    onChange={onChange}
                    className="input-cvv-default-text"
                    placeholder="00/00"
                />
            </div>
        </div>
    );
}