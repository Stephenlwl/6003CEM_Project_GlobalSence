import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Signup.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setSuccess('Signup successful!');
        setTimeout(() => {
            navigate('/weather');  // navigate to weather page
        }, 1000); // delay 1 second
    };

    return (
        <>
            <div className="row w-100">
                {/* Left column - Hero Text */}
                <div className="col-md-6 d-flex flex-column justify-content-center p-5 bg-light rounded-start">
                    <h1 className="mb-4">Discover the World’s Weather & Currency</h1>
                    <p className="lead mb-4">
                        Our platform helps you explore the latest weather conditions and currency exchange rates 
                        around the globe. Stay informed wherever you go—whether you’re traveling, planning, or 
                        simply curious.
                    </p>
                    <p>
                        Search for any location and instantly know the weather and currency exchange rate.
                        Empower your journeys with real-time updates at your fingertips.
                    </p>
                </div>

                {/* Right column - Signup Form */}
                <div className="col-md-6 d-flex flex-column justify-content-center p-5 border rounded-end">
                    <h2 className="text-center mb-4">Sign Up</h2>

                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="alert alert-success" role="alert">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='text-start'>
                        <div className="mb-4">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm password"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
