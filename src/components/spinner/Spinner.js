const Spinner = () =>{
    return(
        <svg xmlns="http://www.w3.org/2000/svg" style={{margin: 'auto', background: 'none', display: 'block', shapeRendering: 'auto'}} width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx="50" cy="50" r="32" strokeWidth="8" stroke="#9f0013" strokeDasharray="50.26548245743669 50.26548245743669" fill="none" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" dur="1.2195121951219512s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;360 50 50"/>
                    </circle>
                    <circle cx="50" cy="50" r="23" strokeWidth="8" stroke="#5c5c5c" strokeDasharray="36.12831551628262 36.12831551628262" strokeDashoffset="36.12831551628262" fill="none" strokeLinecap="round">
                    <animateTransform attributeName="transform" type="rotate" dur="1.2195121951219512s" repeatCount="indefinite" keyTimes="0;1" values="0 50 50;-360 50 50"/>
                </circle>
        </svg>
    )
}

export default Spinner;