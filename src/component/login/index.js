import React,{useContext} from 'react'
import { Row,Col,Button ,Typography} from 'antd'
import { signInWithPopup, FacebookAuthProvider}  from 'firebase/auth'
import { auth } from '../../Filebase/config'
import { addDocument,generateKeywords } from '../../Filebase/Services';
import { AppContext } from '../../context/AppProvider';
const {Title } = Typography
const fbProvider = new FacebookAuthProvider()
 
  function Login() {

      const handleLogin = async () => {
        const {_tokenResponse,user}=  await signInWithPopup(auth,fbProvider)
            
                if(_tokenResponse?.isNewUser){
                    try {
                         addDocument('users' ,{

                            displayName: user.displayName,
                            email: user.email,
                            photoURL: user.photoURL,
                            uid: user.uid,
                            providerID: user.providerId,
                            keywords: generateKeywords(user.displayName?.toLowerCase()),
                            
                        })  
                      } catch (e) {
                        console.error("Error adding document: ", e);
                      }
                }
        }
        const {setOnSignUp,setOnLogin} = useContext(AppContext)
        const handleSignUp = () => {
            setOnSignUp(true);
        }
        const handleLoginModal = () => {
            setOnLogin(true);
        }
    return (
        <div>
         <Row justify="center" style={{height:800}}>
            <Col sm={14} md={12} lg={10} xl={10} xs={12}>
                <Title style={{textAlign: 'center'}}>Login</Title>
                <Button style={{width :'100%',marginBottom:5}}
                    onClick={handleLogin}
                >Đăng nhập bằng Facebook</Button>
                <Button style={{width :'100%'}}>Đăng nhập bằng Google</Button>
                <Button style={{width :'100%'}}
                    onClick={handleSignUp}
                >Đăng kí</Button>
                     <Button style={{width :'100%'}}
                    onClick={handleLoginModal}
                >Đăng nhập</Button>
            </Col>
        </Row>
        </div>
     
    )
}

export default Login
