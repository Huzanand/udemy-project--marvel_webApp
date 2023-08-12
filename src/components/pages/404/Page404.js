import "./404.scss"

const PageNotFound = () => {

    return (
        <div className="Overlay"  z-index='1'>
            <div className="flex-container">
                <div className="left-div">
                <h1>404 PAGE NOT FOUND</h1>
                <h2>Not even the Eye of Uatu sees your request...</h2>
                <p>Check that you typed the address correctly, go back to your previous page or try using our site search to find something specific.</p>
                </div>
                <div className="right-div">
                    <div className="eye" ></div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound;