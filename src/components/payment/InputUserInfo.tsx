import "../../styles/payment/input.css"


interface InputUserInfoInterface {
    label: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
}

export const InputUserInfo: React.FC<InputUserInfoInterface> = ({label, value, onChange}) => {
    return (
        <div className="info-input">
            <div className="info-input-content">
                <p className="info-input-label">{label}</p>
                <input
                    type="text"
                    value={value}
                    placeholder={label}
                    onChange={onChange}
                    className="input-default-text"
                />
            </div>
        </div>
    );
}