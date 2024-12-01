//https://vidsrc.pro/embed/movie/{tmdb_id}

//https://multiembed.mov/?video_id=522931&tmdb=1

'use client'
import { useParams } from "next/navigation";
import Link from "next/link";
import React,{useState} from "react";

const buttonstyle={
    backgroundColor: "blue",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer"
}

const Player: React.FC = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState<any>('vidsrc');
    return (
        <div>
            <Link style={buttonstyle} href="/pages">
                Back
            </Link>
            <div className="d-flex justify-content-center mt-4" style={{ height: "80vh" }}
            >
                
                <iframe
                    src={player=='vidsrc'?`https://vidsrc.pro/embed/movie/${id}`:`https://multiembed.mov/?video_id=${id}&tmdb=1`}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="d-flex justify-content-center space-x-4 mt-4 w-100">
            <h3>Servers : </h3>
            <button style={buttonstyle} onClick={()=>setPlayer('vidsrc')}>Vidsrc</button>
            <button style={buttonstyle} onClick={()=>setPlayer('other')}>Other</button>
            </div>

        </div>
    )
}

export default Player