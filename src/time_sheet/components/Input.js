export default function Input(props) {
  const {
    onMouseDown, onMouseUp, onLoad, onChange, onClick, checked, defaultChecked,
    width, title, type, placeholder, id,name,
    value, labelFontSize = '18px', inputHeight = '30px',
    padding, margin, backgroundColor = 'white' } = props

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
      <input
        id={id}
        name={name}
        defaultChecked={defaultChecked}
        checked={checked}
        type={type}
        onChange={onChange}
        onClick={onClick}
        onLoad={onLoad}
        placeholder={placeholder}
        value={value}
        onMouseUp={onMouseUp}
        onMouseDown={onMouseDown}
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
          textAlign: 'center',
          padding: padding,
          margin: margin,
        }}
      />
    </div>
  )
}



