import img from "./error.gif"

const ErrorMessage = () => {
    return(
        <img src={img} 
            alt="" 
            style={{displat: 'block', 
                    width: '250px', 
                    height:'250px', 
                    objectFit:'contain', 
                    margin: 'auto'}}
        />
    )
}

export default ErrorMessage;