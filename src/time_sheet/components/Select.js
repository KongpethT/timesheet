export default function Select(props) {
    const {
        width, title, onChange,
        value, labelFontSize = '18px', inputHeight = '30px',
        backgroundColor = 'white', firstNameOption, data = [] } = props
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: width,
                margin: '0 auto',
            }}
        >
            <label
                style={{
                    fontSize: labelFontSize,
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    marginTop: '10px',
                }}
            >
                {title}
            </label>
            <select
                value={value}
                onChange={onChange}
                style={{
                    width: '100%',
                    height: inputHeight,
                    border: '0',
                    backgroundColor: backgroundColor,
                    outline: 'none',
                    borderRadius: '5px',
                    color: 'black',
                    fontSize: '18px',
                    fontWeight: 'lighter',
                    textAlign: 'right',
                }}
            >
                <option value=''>{firstNameOption}</option>
                {data.map((row, index) => {
                    return (
                        <option key={index} value={row.name}>{row.name}</option>
                    )
                }
                )}

            </select>
        </div>
    )
}
