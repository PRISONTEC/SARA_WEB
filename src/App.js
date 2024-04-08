import React, {useEffect, useState} from 'react';
import Page from './page'

function App() {

    
    const [isActive,setIsActive] = useState(true)
    const [isLogout,setLogout] = useState(false)

    return (
        <Page/>
    );
}

export default App;
