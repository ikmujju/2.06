import './contact.css'


function Contactus()
{
    return(
        <>
        
            <br />
                <div className='cbox'>
                <form >
                <div className="contact">
                <h1>Get in Touch</h1>
                Name: <input type="text" name="name"/>
                Email: <input type="email" name="email"/>
                Phone: <input type="tel" name="phone"/>
                Message: <textarea name="message"/><br />
                <input type="submit" value="Submit"/>
                </div>
                
            </form>

        </div>
        <h1>Get in Touch</h1>
            <div className='info' data-aos-duration="1000" >
            <div className='email'>
            <h2>E-mail</h2>
            <p>For inquiries, support, or feedback, please email us at:
            khalifa mujahid ilyas</p>
            </div>
            <div className='phone'>
            <h2>Phone:</h2>
            <p>Speak directly with our team by calling:
            9662168660</p>  
            </div>  
            <div className='address'>
            <h2>Address:</h2>
                <p>Visit us at our office:
                666, new york ,usa</p>
            </div>  
            </div>
        </>
    );
}
export default Contactus