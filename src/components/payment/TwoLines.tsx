import "../../styles/payment/twoLines.css"


interface TwoLinesInterface {
    firstLine: string,
    secondLines: Array<string>,
}

export const TwoLines: React.FC<TwoLinesInterface> = ({firstLine, secondLines}) => {
    return (
        <div className="two-lines">
            <p className="first-line">{firstLine}</p>
            {secondLines.map((e, index) => <p key={index}>{e}<br/></p>)}
        </div>
    );
}