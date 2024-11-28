import {useSelector } from "react-redux";
import User from '../components/user/containers/User'
import { Container } from 'semantic-ui-react'

export const Display =(props) =>{
  let current_user = useSelector(state => state.userReducer.user);

  return (
    <Container>
      <User 
            id={current_user .id}
            surname={current_user .surname}
            lastname={current_user .lastname}
            login={current_user .login}
            pwd={current_user .pwd}
            money={current_user .money}
            img={current_user .img}
            display_type='FULL'>      
      </User>
    </Container>
  );
}
