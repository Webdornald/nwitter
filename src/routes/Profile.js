import {authService} from "fbase";
import {useState} from "react";
import {useHistory} from "react-router-dom";

const Profile = ({userObj, refreshUser}) => {
    const history = useHistory()
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName)

    const onLogOutClick = () => {
        authService.signOut()
        history.push('/')
    }

    const onChange = (event) => {
        const {
            target: {value},
        } = event
        setNewDisplayName(value)
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({displayName: newDisplayName})
            refreshUser()
        }
    }

    return (
        <>
            <form action="" onSubmit={onSubmit}>
                <input
                    onChange={onChange}
                    type="text"
                    placeholder={"Dispaly name"}
                    value={newDisplayName}
                />
                <input type="submit" value={"Update Profile"}/>
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile