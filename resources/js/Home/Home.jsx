import React, { useState, useEffect } from "react";
import Registration from "../Forms/registration";
import Login from "../Forms/login";
import Crosswords from "../Crossword/Crosswords";
import Maker from "../Crossword/Display"

export default function Home() {
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [apiToken, setApiToken] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn") === "true"
    );

    const [fetchCrossword, setFetchCrossword] = useState([]);
    const [crosswordsLoaded, setCrosswordLoaded] = useState(false);
    const [showMaker, setShowMaker] = useState(false);
    const [showCrosswords,setShowCrosswords] = useState(false);

    useEffect(() => {
        function handleStorageChange() {
            setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
        }

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    //show crosswords

    //display register form

    const displayRegisterForm = () => {
        setShowRegister(!showRegister);
        setShowLogin(false);
    };

    //display login form

    const displayLoginForm = () => {
        setShowLogin(!showLogin);
        setShowRegister(false);
    };

    const displayCrosswordMaker = () => {
        setShowMaker(!showMaker);
        setShowRegister(false);

    };
    //display non confirmed crosswords
    const displayCrosswords = () => {
        setShowCrosswords(!showCrosswords);
        setShowMaker(false);
    }
    //logout logic

    const handleLogout = () => {
        fetch("api/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
                Authorization: `Bearer ${apiToken}`,
            },
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.ok) {
                    localStorage.removeItem("isLoggedIn");
                    setIsLoggedIn(false);
                    console.log("User logged out successfully.");
                } else {
                    throw new Error("Logout failed.");
                }
            })

            .catch((error) => {
                console.error("Logout failed.", error);
            });
    };

    return (
        <>
        {showMaker ? (<Maker apiToken={apiToken}/>) : (
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>
                    <div className="d-flex">
                        {isLoggedIn ? (
                            <div>
                                <button type="button"
                                    className="btn btn-outline-success"
                                    onClick={displayCrosswords}>crosswords</button>
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={displayCrosswordMaker}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="currentColor"
                                        className="bi bi-plus-lg"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                                        />
                                    </svg>
                                    Crossword
                                </button>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={handleLogout}
                                >
                                    Log Out
                                </button>
                            </div>
                        ) : (
                            <div>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={displayLoginForm}
                                >
                                    Login
                                </button>
                                <button
                                    className="btn btn-outline-success"
                                    onClick={displayRegisterForm}
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        )}

        {showRegister && !isLoggedIn && <Registration></Registration>}

        {showLogin && !isLoggedIn && (
            <Login setApiToken={setApiToken}></Login>
        )}

        {/*<Crossword setApiToken={setApiToken} ></Crossword>*/}
        <Crosswords
            fetchCrossword={fetchCrossword}
            setFetchCrossword={setFetchCrossword}
            crosswordsLoaded={crosswordsLoaded}
            setCrosswordLoaded={setCrosswordLoaded}
        ></Crosswords>
    </>
    )
}
