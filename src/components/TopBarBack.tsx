import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

type TopBarBackProps = {
    text: string;
    backUrl?: string;
};

const TopBarBack: React.FC<TopBarBackProps> = ({ text, backUrl }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const from = searchParams.get("from");

    return (
        <div className='sticky top-0 z-10 flex items-center justify-between bg-white h-14 border-b border-zinc-100'>
            <Link to={backUrl ? backUrl : from ? from : "/"} className="p-2 rounded-full hover:bg-zinc-100 transition">
                <ArrowLeft size={22} />
            </Link>
            <span className="text-base font-semibold tracking-tight text-zinc-900">
                {text}
            </span>
            <div className='w-[38px] mr-4'></div>
        </div>
    );
}

export default TopBarBack