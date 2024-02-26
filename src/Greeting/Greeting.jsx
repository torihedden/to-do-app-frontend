const Greeting = () => {

    const greeting = () => {
        let time = new Date().getHours();

        if (time < 12) {
            return "Good morning!";
        } else if (time >= 12 && time < 17) {
            return "Good afternoon!";
        } else return "Good evening!";
    }

    return (
        <div style={{ fontSize: '40px', textAlign: 'center' }}> {greeting()}</ div>
    )
}

export default Greeting