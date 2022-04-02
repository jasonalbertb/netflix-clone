import React , {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {BsDot} from "react-icons/bs";
import {getShowInfoByTypeAndId} from "../services/firebase";
import {SiNetflix} from "react-icons/si";
import logo from "../logo.svg";
//context
import {useGlobalContext} from "../context/globalContext";
//constants
import {ROUTES} from "../constants/routes";
//components
import {Spinner} from "../components/loading/Spinner";
import {FixedBtmBar} from "../components/FixedBtmBar";
import {BrowseSideBar} from "../components/BrowseSideBar";
import {Footer} from "../components/Footer";
import {PlayerBtn} from "../components/PlayerBtn";
const ShowPage = () => {
    const navigate = useNavigate();
    const {setIsError, isSideBarOpen} = useGlobalContext();
    const {id, type} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [showData, setShowData] = useState(null);

    useEffect(()=>{
        (async()=>{
            try {
                const data = await getShowInfoByTypeAndId({type, showId: id});
                setShowData(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsError(error);
                navigate(ROUTES.ERR);
            }
        })()
    }, [navigate, id, type, setIsError]);

    if (isLoading) {
        return <Spinner />
    }
    let overflow = isSideBarOpen;
    return (
        <>
            <BrowseSideBar />
            <div className={`relative text-white bg-gray-dark w-screen pt-2 
                            xs:pt-0 xs:bg-transparent
                            ${overflow && "overflow-y-hidden"}`}>
                <div className='xs:bg-transparent xs:h-[300px] relative '>
                    <h2 className='absolute top-1 left-1 xs:static justify-center m-4 mt-2 xs:mt-0 xs:pt-2 xs:mb-6 lg:px-8'>
                        <Link to={ROUTES.BROWSE}> 
                            <SiNetflix className='text-netflix-red w-8 h-8 xs:hidden'/>
                            <img
                                className='hidden xs:inline h-6 mt-4 lg:h-8'
                                src={logo} alt="logo"
                            />
                        </Link> 
                    </h2>
                    <img 
                        className={`w-full h-1/3 object-cover
                                    xs:absolute xs:top-0 xs:left-0 xs:z-[-1] xs:h-full`}
                        src={`/images/${showData.type}/${showData.genre}/${showData.slug}/large.jpg`}
                        alt={showData.title}
                    />
                    <div className='px-4 xs:w-1/2 xs:px-6 '>
                            <h4 className={`text-xl font-semibold mb-2
                                            xs:text-2xl lg:px-12`}>
                                {showData.title}
                            </h4>
                            <p className={`text-xs text-gray-lighter mb-1
                                           xs:text-sm lg:px-12`}>
                                {showData.description}
                            </p>
                            <p className='capitalize text-gray-200 text-xs font-medium lg:px-12 lg:text-base'>
                                {showData.type} <BsDot className='inline'/> {showData.genre}
                            </p>
                            <p className='lg:px-12'>
                                <PlayerBtn 
                                    src="/videos/bunny.mp4" 
                                    className={`my-4 bg-white text-black font-semibold text-md px-4 py-0.5 rounded-sm
                                                    hover:bg-netflix-red hover:text-white transition duration-200 ease-in-out`}
                                >
                                    Play
                                </PlayerBtn>
                            </p>
                    </div>
                </div>
                <FixedBtmBar />
            </div>
            <div className='bg-gray-dark min-h-screen text-gray-light px-2 text-sm'>
                List/Movie here
            </div>
            <Footer />
        </>
        
    )
}

export default ShowPage